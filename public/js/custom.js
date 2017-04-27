var visitor = {
	email: '',
	password: ''
}

var updateVisitor = function(field, event){
	visitor[field] = event.target.value
}

var getParameterByName = function (name, url) {
    if (!url) url = window.location.href

    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}

var login = function(event){
	event.preventDefault()
	if (visitor.email.length == 0){
		alert('Please enter your email.')
		return
	}

	if (visitor.password.length == 0){
		alert('Please enter your password.')
		return
	}

    $.ajax({
        url: '/auth/login',
        type: 'POST',
        data: JSON.stringify(visitor),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
        	if (response.confirmation != 'success'){
				alert(response.message)
				return
        	}

    		var redirect = getParameterByName('redirect')
    		if (redirect == null){
        		window.location.href = '/account'
    			return
    		}

    		if (redirect == 'turbo')
        		window.location.href = 'http://turbo.velocity360.io/'

        }
    })
}