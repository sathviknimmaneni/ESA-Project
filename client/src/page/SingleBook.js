import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBook = () => {
  const [data, setData] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:5000/books/getbook/${bookId}`
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <div>
      <p>Book ID: {bookId}</p>
      <p>{data.title}</p>
      <p>{data.author}</p>
    </div>
  );
};

export default SingleBook;
