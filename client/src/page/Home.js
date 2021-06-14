import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/books/all");
      setBooks(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: 16 }}>
        Whee, Happy reading..
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item md={3} sm={2} key={book._id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
