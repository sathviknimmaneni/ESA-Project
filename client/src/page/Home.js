import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import Masonry from "react-masonry-css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [userSavedBooks, setUserSavedBooks] = useState([]);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/books/all_books");
      const savedBooks = await axios.post(
        "http://localhost:5000/books/all_saved_books",
        {
          email: userData.mail,
        }
      );
      setBooks(result.data.reverse());
      setUserSavedBooks(savedBooks.data);
      console.log(savedBooks.data);
    };
    fetchData();
  }, [userData.mail]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: 16 }}>
        Whee, Happy reading..
      </Typography>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {books.map((book) => (
          <div key={book._id}>
            <BookCard book={book} savedBooks={userSavedBooks} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Home;
