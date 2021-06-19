import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import Masonry from "react-masonry-css";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/books/all_books");
      setBooks(result.data);
      // console.log(result);
    };
    fetchData();
  }, []);

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
            <BookCard book={book} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Home;
