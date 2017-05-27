var app_id = '58da2bc0d644e40011da467c'
var turbo = Turbo({
	site_id: app_id
})

var visitor = {
	name: '',
	email: ''
}

var events = []

var updateVisitor = function(event){
	visitor[event.target.name] = event.target.value
}

var requestSyllabus = function(event){
	event.preventDefault()
	if (visitor.name.length == 0){
		alert('Please Enter Your Name')
		return
	}

	if (visitor.email.length == 0){
		alert('Please Enter Your Email')
		return
	}

	console.log('requestSyllabus: '+JSON.stringify(visitor))
}

var register = function(event){
	event.preventDefault()
	console.log('register: '+JSON.stringify(visitor))
}

var renderEvents = function(){
	// console.log('RenderEvents: '+JSON.stringify(events))
	if (events.length == 0){
		$('#rows').html('<tr><td><div class="meetup" style="padding:24px;text-align:center"><h2>No Scheduled Events</h2></div></td></tr>')
		return
	}

	var rows = ''
	events.forEach(function(meetup, i){
		rows += '<tr><td>'
		rows += '<div class="meetup" style="padding:24px"><h2>'+meetup.name+'</h2>'+meetup.description+'<br /><a class="button button-lg button-red" target="_blank" href="'+meetup.link+'">RSVP</a>'+'</div>'
		rows += '</td></tr>'
	})

	$('#rows').html(rows)
}

var fetchRecentPosts = function(){
	// console.log('fetchRecentPosts: ')
	turbo.fetch('post', null, function(err, response){
		if (err){
			console.log('ERROR: '+err.message)
			return
		}

		// console.log('RECENT POSTS: '+JSON.stringify(response.results))
		var posts = ''
		var blog = ''
		response.results.forEach(function(post, i){
			posts += '<div class="spost clearfix">'
			posts += '<div class="entry-c">'
			posts += '<div class="entry-title">'
			posts += '<h4><a href="/post/'+post.slug+'">'+post.title+'</a></h4>'
			posts += '</div>'
			posts += '<ul class="entry-meta"><li>'+post.dateString+'</li></ul>'
			posts += '</div></div>'

			// blog page:
			var index = i+1
			blog += (index%3==0) ? '<div class="col_one_third col_last">' : '<div class="col_one_third">'
			blog += '<div style="height:380px" class="feature-box fbox-center fbox-bg fbox-light fbox-effect">'
			blog += '<div class="fbox-icon"><a href="/post/'+post.slug+'"><img src="'+post.image+'=s160-c" /></a></div>'
			blog += '<a href="/post/'+post.slug+'"><h3 style="font-weight:600">'+post.title+'</h3></a>'
			blog += '<p class="lead" style="color:#333;font-size:16px">'+post.preview+'</p>'
			blog += '</div></div>'
		})

		$('#post-list-footer').html(posts)
		$('#posts').html(blog)
	})
}

var truncateText = function(str, limit){
	if (str.length < limit)
		return str

	return str.substring(0, limit)+'...'
}

var fetchTutorials = function(){

    $.ajax({
        url: '/api/tutorial',
        type: 'GET',
        data: null,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(response, status) {
        	// console.log('TUTORIALS: '+JSON.stringify(response.results))

        	var tutorials = ''
			response.results.forEach(function(tutorial, i){
				var index = i+1
				var price = (tutorial.price==0) ? 'Free' : '$'+tutorial.price
				tutorials += (index % 3==0) ? '<div class="col_one_third col_last">' : '<div class="col_one_third">'
				tutorials += '<div class="pricing-box" style="background:#fff"><div class="pricing-features" style="border-bottom:none">'
				tutorials += '<a href="/tutorial/'+tutorial.slug+'"><img style="border-radius:48px;margin-top:24px;margin-bottom:12px" src="https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=96" /></a>'
				tutorials += '<a href="/tutorial/'+tutorial.slug+'"><h3 class="nobottommargin notopmargin" style="color:#333;text-shadow:none;font-weight:400">'+truncateText(tutorial.title, 24)+'</h3></a>'
				tutorials += '<span class="tutorial-tag">'+tutorial.category+'</span>'
				tutorials += '<span class="tutorial-tag">'+price+'</span>'
				tutorials += '<p class="nobottommargin tutorial-card">'+truncateText(tutorial.description, 160)+'</p>'
				tutorials += '<a href="/tutorial/'+tutorial.slug+'" class="button button-border button-circle t500 noleftmargin notopmargin bottommargin-sm">View</a>'
				tutorials += '</div></div></div>'
			})        	

			$('#tutorials').html(tutorials)
			return
        },
	    error: function(xhr, status, error) { 
	    	alert('Error: '+error.message)
			return
	    }
    })
}

var fetchEvents = function(){
	// Returns list up upcoming events:
	// https://api.meetup.com/velocity360/events?key=fd12585580517f2f616110c7161c
	// https://api.meetup.com/NY-JavaScript/events?key=fd12585580517f2f616110c7161c

	var params = {
		key: 'fd12585580517f2f616110c7161c'
	}

    $.ajax({
        url: 'https://api.meetup.com/velocity360/events',
        type: 'GET',
        data: JSON.stringify(params),
        contentType: 'application/json; charset=utf-8',
        dataType: 'jsonp',
        async: true,
        success: function(response, status) {
        	// console.log('RESPONSE: '+JSON.stringify(response.data))
        	if (response.data == null){
        		fetchRecentPosts()
        		return
        	}

        	events = response.data
        	renderEvents()
        	fetchRecentPosts()
			return
        },
	    error: function(xhr, status, error) { 
	    	alert('Error: '+error.message)
			return
	    }
    })
}