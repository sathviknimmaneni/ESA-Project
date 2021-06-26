import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import BookCard from "../components/BookCard";

const MyBooks = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [userSavedBooks, setUserSavedBooks] = useState([]);

  const userData = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .post("http://localhost:5000/users/get_user_books", {
        email: userData.mail,
      })
      .then((response) => setUserBooks(response.data))
      .catch((err) => {
        console.error(err);
      });

    axios
      .post("http://localhost:5000/books/all_saved_books", {
        email: userData.mail,
      })
      .then((response) => setUserSavedBooks(response.data))
      .catch((err) => {
        console.error(err);
      });
  }, [userData.mail]);
  return (
    <div>
      <h1>My books</h1>
      <h2>Added by me: </h2>
      <Grid container spacing={3}>
        {userBooks.map((book) => (
          <Grid item md={3} sm={2} key={book._id}>
            <BookCard book={book} savedBooks={[]} />
          </Grid>
        ))}
      </Grid>

      <h2>Saved books: </h2>
      <Grid container spacing={3}>
        {userSavedBooks.map((book) => (
          <Grid item md={3} sm={2} key={book._id}>
            <BookCard book={book} savedBooks={[]} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyBooks;
