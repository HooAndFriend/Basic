const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  api = require("./api/index"),
  cookieParser = require("cookie-parser"),
  cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.use("/", api)

const port = 8080
app.listen(port, () => {
  console.log(`SERVER ON! PORT : ${port}`)
})
