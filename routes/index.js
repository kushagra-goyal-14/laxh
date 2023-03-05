const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var compression = require("compression");
const User = require("../models/user");
const app = express();
app.use(compression());
app.use(express.static("public"));

router.get("/Build/UnityLoader.js", (req, res) => {
  // Modify the path to point to the correct location of the UnityLoader.js file
  res.sendFile(__dirname + "/public/Build/UnityLoader.js");
});

router.get("/Build/Build.loader.js", (req, res) => {
  // Modify the path to point to the correct location of the UnityLoader.js file
  res.sendFile(__dirname + "/public/Build/Build.loader.js");
});

router.get("/Build/Build.framework.js", (req, res) => {
  // Modify the path to point to the correct location of the UnityLoader.js file
  res.sendFile(__dirname + "/public/Build/Build.framework.js");
});

router.get("/Build/Build.data", (req, res) => {
  // Modify the path to point to the correct location of the UnityLoader.js file
  res.sendFile(__dirname + "/public/Build/Build.data");
});

router.get("/Build/Build.wasm", (req, res) => {
  // Modify the path to point to the correct location of the UnityLoader.js file
  res.sendFile(__dirname + "/public/Build/Build.wasm");
});

router.get("/game", (req, res, next) => {
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    if (!data) {
      res.redirect("/");
    } else {
      res.sendFile(__dirname + "/public/unity.html");
    }
  });
});

router.get("/", (req, res, next) => {
  return res.render("index.ejs");
});

router.get("/register", (req, res, next) => {
  return res.render("register.ejs");
});

router.post("/register", (req, res, next) => {
  let personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.send();
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      User.findOne({ email: personInfo.email }, (err, data) => {
        if (!data) {
          let c;
          User.findOne({}, (err, data) => {
            if (data) {
              c = data.unique_id + 1;
            } else {
              c = 1;
            }

            bcrypt
              .hash(personInfo.password, saltRounds)
              .then((hash) => {
                console.log("Hash ", hash);
                let newPerson = new User({
                  unique_id: c,
                  email: personInfo.email,
                  username: personInfo.username,
                  password: hash,
                  passwordConf: hash,
                  longshotbesttime: 0,
                  gridshotbesttime: 0,
                });
                newPerson.save((err, Person) => {
                  if (err) console.log(err);
                  else console.log("Success");
                });
              })
              .catch((err) => console.error(err.message));
          })
            .sort({ _id: -1 })
            .limit(1);
          res.send({ Success: "You are regestered,You can login now." });
        } else {
          res.send({ Success: "Email is already used." });
        }
      });
    } else {
      res.send({ Success: "password is not matched" });
    }
  }
});

router.get("/login", (req, res, next) => {
  return res.render("login.ejs");
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      let flag = validateUser(data.password, req.body.password);
      console.log(flag);
      function validateUser(hash, pass) {
        bcrypt
          .compare(pass, hash)
          .then((resp) => {
            console.log(resp); // return true
            req.session.userId = data.unique_id;
            res.send({ Success: "Success!" });
          })
          .catch((err) => res.send({ Success: "Wrondddg password!" }));
      }
    } else {
      res.send({ Success: "This Email Is not regestered!" });
    }
  });
});

router.get("/profile", (req, res, next) => {
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    if (!data) {
      res.redirect("/");
    } else {
      return res.render("data.ejs", { name: data.username, email: data.email });
    }
  });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

router.get("/forgetpass", (req, res, next) => {
  res.render("forget.ejs");
});

router.post("/forgetpass", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save((err, Person) => {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Password does not matched! Both Password should be same.",
        });
      }
    }
  });
});

router.post("/longshot", (req, res, next) => {
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    if (!data) {
      res.redirect("/");
    } else {
      console.log(req.body);
      data.longshotbesttime = req.body.time;
      data.save((err, Person) => {
        if (err) console.log(err);
        else console.log("Success");
        res.send({ Success: "Best time updated!" });
      });
    }
  });
});

module.exports = router;
