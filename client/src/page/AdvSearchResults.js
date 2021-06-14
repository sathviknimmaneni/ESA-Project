import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Grid } from "@material-ui/core";
import BookCard from "../components/BookCard";

const AdvSearchResults = () => {
  const searchData = useSelector((state) => state.search);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/books/search_book", {
        ...searchData,
      })
      .then((response) => setData(response.data.message))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <p>Search results:</p>
      <Grid container spacing={3}>
        {data.map((book) => (
          <Grid item md={3} sm={2} key={book._id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdvSearchResults;
