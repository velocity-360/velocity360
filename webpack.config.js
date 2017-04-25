var webpack = require("webpack")
var path = require('path')
var CommonsChunkPlugin = new require('webpack/lib/optimize/CommonsChunkPlugin')
var chunks = ['home', 'post', 'tutorial', 'project', 'account', 'profile', 'courses', 'course']

module.exports = {

	entry: {
		home: './src/apps/client/Home.js',
		post: './src/apps/client/Post.js',
		tutorial: './src/apps/client/Tutorial.js',
		courses: './src/apps/client/Courses.js',
		project: './src/apps/client/Project.js',
		account: './src/apps/client/Account.js',
		profile: './src/apps/client/Profile.js'
	},
	output: {
		filename: 'public/dist/app/[name].js',
        sourceMapFilename: 'public/dist/app/[name].map'
	},
	devtool: '#source-map',	
	plugins: process.env.NODE_ENV === 'production' ? [
		new CommonsChunkPlugin({
			name: 'commons',
			chunks: chunks
		}),
	    new webpack.DefinePlugin({
	        'process.env': {
	        	'NODE_ENV': JSON.stringify('production')
	        }
	    }),
    	new webpack.optimize.UglifyJsPlugin({
    		minimize: true,
		    compress: {
		        warnings: true,
		        drop_console: true
		    }
    	})
	] : [
		new CommonsChunkPlugin({
			name: 'commons',
			chunks: chunks
		})
	],	
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query:{
					presets:['react', 'es2015']
				}
			}
		]
	}
}

