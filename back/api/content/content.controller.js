const pool = require("../../config/database")

exports.getNew = (req, res) => {
  res.render("content/new")
}

exports.new = (req, res) => {
  const b = req.body
  const param = [req.cookies.id, b.title, b.content]
  console.log(param)
  pool((conn) => {
    conn.query("insert into board value(?,?,?)", param, (err, doc) => {
      if (err) console.log(err)
      res.send({ result: true })
    })
    conn.release()
  })
}

exports.getResult = (req, res) => {
  res.render("content/result")
}

exports.result = (req, res) => {
  const keyword = req.body.keyword
  pool((conn) => {
    conn.query(
      "select * from board where title = ?",
      keyword,
      (err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.send({ result: result })
      }
    )
  })
}
