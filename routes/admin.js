var express = require('express')
var router = express.Router()


router.get('/:page', function(req, res, next) {
	var page = req.params.page
	res.render('admin/'+page, null)
})


router.get('/:page/:id', function(req, res, next) {
	var page = req.params.page
	res.render('admin/'+page, null)
})


module.exports = router
