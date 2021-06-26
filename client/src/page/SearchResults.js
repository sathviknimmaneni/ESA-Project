import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid } from "@material-ui/core";
import BookCard from "../components/BookCard";

const SearchResults = () => {
  const { searchOption, searchText } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/books/search_book_by_name", {
        title: searchText,
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error(err);
      });
  }, [searchText]);
  console.log(searchText);

  return (
    <div>
      <p>Search tag: {searchText}</p>
      <Grid container spacing={3}>
        {data.map((book) => (
          <Grid item md={3} sm={2} key={book._id}>
            <BookCard book={book} savedBooks={[]} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchResults;
