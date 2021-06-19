//////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require("mongoose");
const { json } = require("express");
const express = require("express");
const Users = require("../models/Users");
const Books = require("../models/Books");
const debug = require("debug")("shree-express:server");
const router = express.Router();
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/post_user", (req, res, next) => {
  if (req.body.name && req.body.email) {
    const rollNo = req.body.email.match(/\d+/g)[0];
    const branchDigit = ~~((parseInt(rollNo) - 170000) / 100);
    var branch = "";

    if (branchDigit == 5) {
      branch = "CSE";
    } else if (branchDigit == 2) {
      branch = "EEE";
    } else if (branchDigit == 1) {
      branch = "CE";
    } else {
      branch = "MECH";
    }

    const user = new Users({
      name: req.body.name.split(" "),
      email: req.body.email,
      rollNo: rollNo,
      branch: branch,
      checkoutHistory: req.body.checkoutHistory,
    });

    user
      .save()
      .then((doc) => {
        debug(`Created a new user log: ${JSON.stringify(doc, null, 2)}`);
        res.status(201).json({ message: "User successfully registered" });
      })
      .catch((err) => {
        debug(`Failed to create a new user log: ${err}`);
        res
          .status(500)
          .json({ message: `Couldn't register new user : ${err}` });
      });
  } else {
    res.status(401).json({ message: "Invalid form requires required details" });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/search_user", async (req, res, next) => {
  var dict = {};
  if (req.body.name == undefined) {
    dict["name"] = { $ne: true };
  } else {
    dict["name"] = { $in: req.body.name.split(" ") };
  }
  if (req.body.rollNo == undefined) {
    dict["rollNo"] = { $ne: true };
  } else {
    dict["rollNo"] = req.body.rollNo;
  }
  if (req.body.branch == undefined) {
    dict["branch"] = { $ne: true };
  } else {
    dict["branch"] = req.body.branch;
  }

  //console.log(dict);

  Users.find(dict, (err, doc) => {
    if (err) res.status(500).json({ message: ` ${err}` });
    if (!doc) {
      res.status(401).json({ message: "not found" });
    } else {
      res.status(201).json({ message: doc });
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/get_user_by_email", async (req, res, next) => {
  //get user by mail
  try {
    const user = await Users.find({ email: req.body.email }); //.findById(req.body.id)
    res.json(user);
    console.log(user[0]["checkoutHistory"]);
  } catch (err) {
    res.json({ message: `${err}` });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/get_user_books", async (req, res, next) => {
  // get list of mails.
  try {
    const user = await Users.find({ email: req.body.email });
    const checkoutHistory = user[0]["checkoutHistory"];

    var idArray = [];
    for (let index = 0; index < checkoutHistory.length; index++) {
      idArray.push(mongoose.Types.ObjectId(checkoutHistory[index]["bookId"]));
    }

    Books.find(
      {
        _id: { $in: idArray },
      },
      function (err, docs) {
        res.json(docs);
      }
    );
  } catch (err) {
    res.json([]);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.patch("/update_user", async (req, res, next) => {
  // update user using mail

  const user = await Users.find({ email: req.body.email });
  const id = user[0]["_id"];
  if (id) {
    Users.findByIdAndUpdate(id, req.body, {
      new: false,
      useFindAndModify: false,
    })
      .then(async (Users) => {
        if (!Users) {
          return res.status(404).send();
        }
        res.send(Users);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.delete("/delete_user", async (req, res, next) => {
  // delete using mail
  try {
    const user = await Users.find({ email: req.body.email });
    const id = user[0]["_id"];
    const removedUser = await Users.remove({ _id: id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: `${err}` });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
//////////////////////////////////////////////////////////////////////////////////////////////
