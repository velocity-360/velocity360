var visitor = {
	email: '',
	password: ''
}

var updateVisitor = function(field, event){
	visitor[field] = event.target.value
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
        	if (response.confirmation == 'success'){
        		window.location.href = '/account'
        		return
        	}

			alert(response.message)
        }
    })
}