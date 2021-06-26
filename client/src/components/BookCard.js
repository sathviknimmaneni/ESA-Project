import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  makeStyles,
  Chip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedInNot";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 24,
    padding: 8,
  },
  test: {
    fontSize: 20,
  },
  actions: {
    justifyContent: "space-between",
  },
  expand: {
    transform: "rotate(0deg)",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  chipRoot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  divider: {
    margin: theme.spacing(2),
  },
}));
const BookCard = ({ book, savedBooks }) => {
  const classes = useStyles();
  const history = useHistory();
  const userData = useSelector((state) => state.user);

  const isSaved = (id) => {
    return savedBooks.some(function (book) {
      return book._id === id;
    });
  };
  const [bookmark, setBookmark] = useState(isSaved(book._id));

  // console.log(book._id, bookmark);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/books/deleteBook", { data: { id } })
      .then((response) => console.log(response))
      .catch((err) => {
        console.error(err);
      });
    history.go(0);
  };

  const handleBookmark = (id) => {
    axios
      .patch("http://localhost:5000/users/update_user", {
        email: userData.mail,
        checkoutHistory: { bookId: id, saved: !bookmark },
      })
      .then((res) => setBookmark(!bookmark))
      .catch((err) => {
        console.error(err);
      });
    console.log(id, bookmark);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={() => handleBookmark(book._id)}
          >
            {isSaved(book._id) ? <BookmarkIcon /> : <TurnedInNotIcon />}
          </IconButton>
        }
        title={book.title}
        subheader={book.author.join(" ")}
      />
      <CardContent>
        <div className={classes.chipRoot}>
          {book.genres.map((genre, index) => (
            <Chip key={index} label={genre} color="primary" />
          ))}
        </div>

        <Typography varaint="h5">Description</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          paragraph
        >
          {book.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
