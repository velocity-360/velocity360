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
		response.results.forEach(function(post, i){
			posts += '<div class="spost clearfix">'
			posts += '<div class="entry-c">'
			posts += '<div class="entry-title">'
			posts += '<h4><a href="#">'+post.title+'</a></h4>'
			posts += '</div>'
			posts += '<ul class="entry-meta"><li>'+post.dateString+'</li></ul>'
			posts += '</div></div>'
		})

		$('#post-list-footer').html(posts)
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