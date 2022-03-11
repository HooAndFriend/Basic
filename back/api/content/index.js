const router = require('express').Router(),
  content = require('./content.controller'),
  middlewares = require('../middlewares')

router.get('/new', middlewares.check, content.getNew)
router.post('/new', content.new)
router.post('/', content.result)

module.exports = router
