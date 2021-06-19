//////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require("mongoose");
const { json } = require("express");
const express = require("express");
const Books = require("../models/Books");
const debug = require("debug")("shree-express:server");
const router = express.Router();
const Users = require("../models/Users");
//////////////////////////////////////////////////////////////////////////////////////////////
//hello world
router.post("/post_book", async (req, res, next) => {
  var bookId = "";
  var userEmail = "";
  var status = "";

  if (req.body.email) {
    userEmail = req.body.email;
    status = "book issued";
  } else {
    status = "issuable";
  }

  if (req.body.author && req.body.title) {
    Books.create(
      {
        author: req.body.author.split(" "),
        title: req.body.title,
        description: req.body.description,
        genres: req.body.genres,
        status: status,
      },
      async function (err, book) {
        if (err) {
          return handleError(err);
        }
        if (req.body.name) {
          if (req.body.email) {
            bookId = book["_id"];

            const user = await Users.find({ email: req.body.email });

            if (user.length == 0) {
              console.log("no such user, creating one");
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

              Users.create({
                name: req.body.name.split(" "),
                email: userEmail,
                rollNo: rollNo,
                branch: branch,
                checkoutHistory: {
                  bookId: bookId,
                  saved: req.body.saved,
                },
              });
              //console.log(bookId)
              res.json({ message: "user added, and book to ckeckout history" });
            } else {
              console.log("user already present");
              var newDetails = user[0];
              newDetails["checkoutHistory"].push({
                bookId: bookId,
                saved: req.body.saved,
              });
              console.log(newDetails);
              userId = user[0]["_id"];
              Users.findByIdAndUpdate(
                userId,
                newDetails,
                { new: false, useFindAndModify: false },
                function (err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json({ message: "book added to user" });
                  }
                }
              );
            }
          }
        }
      }
    );
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/all_books", async (req, res) => {
  const books = await Books.find({});
  res.send(books);
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/search_book", async (req, res, next) => {
  var dict = {};
  if (req.body.author == undefined) {
    dict["author"] = { $ne: true };
  } else {
    dict["author"] = { $in: req.body.author };
  }
  if (req.body.title == undefined) {
    dict["title"] = { $ne: true };
  } else {
    dict["title"] = req.body.title;
  }
  if (req.body.popularity == undefined) {
    dict["popularity"] = { $ne: true };
  } else {
    dict["popularity"] = req.body.popularity;
  }
  if (req.body.status == undefined) {
    dict["status"] = { $ne: true };
  } else {
    dict["status"] = req.body.status;
  }
  if (req.body.genres == undefined) {
    dict["genres"] = { $ne: true };
  } else {
    dict["genres"] = { $in: req.body.genres };
  }

  Books.find(dict, (err, doc) => {
    if (err) res.status(500).json({ message: ` ${err}` });
    if (!doc) {
      res.status(401).json({ message: "not found" });
    } else {
      res.status(201).json({ message: doc });
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/search_books_by_id", async (req, res, next) => {
  var idArray = [];
  for (let index = 0; index < req.body.id.length; index++) {
    idArray.push(mongoose.Types.ObjectId(req.body.id[index]));
  }
  Books.find(
    {
      _id: { $in: idArray },
    },
    function (err, docs) {
      res.json(docs);
    }
  );
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.patch("/patch_book", async (req, res, next) => {
  if (req.body.id) {
    Books.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
      .then((Books) => {
        if (!Books) {
          return res.status(404).send();
        }
        res.send(Books);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.delete("/delete_book", async (req, res, next) => {
  try {
    const removedBook = await Books.remove({ _id: req.body.id });
    res.json(removedBook);
  } catch (err) {
    res.json({ message: `${err}` });
  }
});
//////////////////////////////////////PRE REQUISITES//////////////////////////////////////////
router.get("/get_authors", async (req, res, next) => {
  try {
    const authors = await Books.find().distinct("author");
    res.json(authors);
  } catch (err) {
    res.json({ message: `${err}` });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/get_genres", async (req, res, next) => {
  try {
    const genres = await Books.find().distinct("genres");
    res.json(genres);
  } catch (err) {
    res.json({ message: `${err}` });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/search_book_by_name", async (req, res) => {
  Books.find(
    {
      title: { $regex: req.body.title },
    },
    function (err, docs) {
      res.json(docs);
    }
  );
});
//////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
//////////////////////////////////////////////////////////////////////////////////////////////
