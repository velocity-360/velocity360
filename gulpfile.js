// including plugins
var gulp = require('gulp')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var less = require('gulp-less')
var to5 = require('gulp-6to5')
var path = require('path')


gulp.task('less', function () {
  return gulp.src('./public/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('css', ['less'], function(){
    return gulp.src(
            [
                './public/css/bootstrap.css',
                './public/css/style.css',
                './public/css/onepage.css',
                './public/css/swiper.css',
                './public/css/dark.css',
                './public/css/font-icons.css',
                './public/css/et-line.css',
                './public/css/animate.css',
                './public/css/magnific-popup.css',
                './public/css/components/bs-datatable.css',
                './public/css/one-page-fonts.css',
                './public/css/responsive.css',
                './public/css/font-awesome.css',
                './public/css/bootstrap-social.css',
                './public/css/social-share-kit/social-share-kit.css',
                './public/css/sweetalert.css',
                './public/css/custom.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./public/css/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/css/fonts/'))
})

gulp.task('copy-sharekit', function(){
    return gulp.src(
            ['./public/css/social-share-kit/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})

gulp.task('copy-images', function(){
    return gulp.src(
            ['./public/images/**.png', './public/images/**.svg', './public/images/**.gif']
        )
        .pipe(gulp.dest('./public/dist/css/images/'))
})

gulp.task('style', ['css', 'copy-fonts', 'copy-sharekit', 'copy-images'], function(){})

gulp.task('app', function(){
    return gulp.src(
            ['./public/js/app.js']
        )
        .pipe(gp_rename('app.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});


gulp.task('js', ['app'], function(){
    return gulp.src(
            [
                './public/js/jquery.js',
                './public/js/plugins.js',
                './public/js/components/bs-datatable.js',
                './public/js/functions.js',
                './public/js/social-share-kit.min.js',
                './public/js/sweetalert.min.js',
                './public/js/custom.js'
            ]
        )
        .pipe(gp_concat('gulp-concat.js'))
        .pipe(gulp.dest('./public/min/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});

gulp.task('es6-es5', ['js'], function(){
    return gulp.src([
                './src/*/**.js',
                './src/*/*/**.js'
            ]
        )
        .pipe(to5())
        .pipe(gulp.dest('./public/dist/es5/'))
});

// gulp.task('watch', function() {
//     gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js', './public/js/**.js'], ['css', 'js'])
// })

gulp.task('prod', ['style', 'es6-es5'], function(){})
gulp.task('default', ['style', 'es6-es5', 'watch'], function(){})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

gulp.task('watch', function() {
    gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js', './public/js/**.js'], ['es6-es5'])
})

gulp.task('build', ['es6-es5', 'watch'], function(){})


