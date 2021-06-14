import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
  const { bookId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:5000/books/getbook/${bookId}`
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <p>Updating Book :{bookId} </p>
      <p>{data.title}</p>
    </div>
  );
};

export default UpdateBook;
