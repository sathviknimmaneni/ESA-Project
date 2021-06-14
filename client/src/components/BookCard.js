import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  Button,
  IconButton,
  Collapse,
  makeStyles,
  Chip,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/books/deleteBook", { data: { id } })
      .then(() => console.log("Book deleted"))
      .catch((err) => {
        console.error(err);
      });
    history.go(0);
  };

  return (
    <Card className={classes.card}>
      <CardHeader title={book.title} subheader={book.author[0]} />
      <CardContent>
        <div className={classes.chipRoot}>
          {book.genres.map((genre, index) => (
            <Chip key={index} label={genre} color="primary" />
          ))}
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        {canDelete && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(book._id)}
          >
            Delete
          </Button>
        )}
        <IconButton
          aria-label="open collapsed stuff"
          onClick={handleClick}
          className={expanded ? classes.expandOpen : classes.expand}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography varaint="h5">Description</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            paragraph
          >
            {book.description}
          </Typography>
          <Divider varaint="middle" className={classes.divider} />
          <Typography varaint="h5">Used in:</Typography>
          <div className={classes.chipRoot}>
            {book.courses.map((course, index) => (
              <Chip
                key={index}
                label={course}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
          <Divider varaint="middle" className={classes.divider} />
          <Typography varaint="h5">Used by:</Typography>
          <div className={classes.chipRoot}>
            {book.profs.map((prof, index) => (
              <Chip
                key={index}
                label={prof}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BookCard;
