const mysql = require("mysql"),
  router = require("express").Router(),
  auth = require("./auth/index"),
  content = require("./content/index")

router.get("/", (req, res) => {
  res.render("index")
})

router.use("/auth", auth)
router.use("/content", content)

module.exports = router
