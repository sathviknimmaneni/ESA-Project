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
const BookCard = ({ book, canDelete }) => {
  const classes = useStyles();
  const history = useHistory();
  const bookMarked = false;
  const userData = useSelector((state) => state.user);

  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

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
        checkoutHistory: { id, saved: true },
      })
      .then((response) => console.log(response))
      .catch((err) => {
        console.error(err);
      });
    console.log(id);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={() => handleBookmark(book._id)}
          >
            {bookMarked ? <TurnedInIcon /> : <TurnedInNotIcon />}
          </IconButton>
        }
        title={book.title}
        subheader={book.author[0]}
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
