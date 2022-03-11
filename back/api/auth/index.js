const router = require('express').Router(),
  auth = require('./auth.controller')

router.get('/login', auth.getLogin)
router.get('/register', auth.getRegister)
router.post('/login', auth.login)
router.post('/register', auth.register)

module.exports = router
