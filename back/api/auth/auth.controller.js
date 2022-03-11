const pool = require("../../config/database"),
  bcrypt = require("bcrypt"),
  saltRound = 10,
  secret = "abdbadfb",
  jwt = require("jsonwebtoken")

exports.getLogin = (req, res) => {
  res.render("auth/login")
}

exports.getRegister = (req, res) => {
  res.render("auth/register")
}

exports.login = (req, res) => {
  const b = req.body
  param = [b.id, b.pw]
  console.log(param)
  pool((conn) => {
    conn.query("select * from user_list where id=?", param[0], (err, row) => {
      if (err) console.log(err)
      if (row.length > 0) {
        bcrypt.compare(param[1], row[0].pw, (req, result) => {
          const checkToken = []
          if (result) {
            jwt.sign(
              { id: param[0] },
              secret,
              { expiresIn: "180d" },
              (err, token) => {
                if (err) console.log(err)
                checkToken[0] = token
              }
            )
            jwt.sign(
              { id: param[0] },
              secret,
              { expiresIn: "1d" },
              (err, token) => {
                if (err) console.log(err)
                checkToken[1] = token
                res
                  .cookie("refreshToken", checkToken[0])
                  .cookie("accessToken", checkToken[1])
                  .cookie("id", param[0])
                  .send({ result: true })
              }
            )
          } else {
            res.send({ result: false })
          }
        })
      } else {
        res.send({ result: false })
      }
    })
  })
}

exports.register = (req, res) => {
  const b = req.body,
    param = [b.id, b.pw, b.name]
  bcrypt.hash(param[1], saltRound, (err, hash) => {
    param[1] = hash
    pool((conn) => {
      conn.query("insert into user_list value(?,?,?)", param, (err, doc) => {
        if (err) console.log(err)
        res.send({result : true})
      })
      conn.release()
    })
  })
}
