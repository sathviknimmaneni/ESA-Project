import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdvSearch from "../components/AdvSearch";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 16,
  },
});

const AdvancedSearch = () => {
  const classes = useStyles();
  const fData = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const history = useHistory();
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 20,
      label: "20",
    },
    {
      label: "100",
      value: 100,
    },
  ];

  const handleClick = () => {
    history.push("/books/advsearch");
  };
  const handleSliderChange = (e, newValue) => {
    dispatch({
      type: "ADD_CHECKBOX",
      payload: {
        data: { popularity: newValue },
      },
    });
  };
  const handleStatusChange = (e) => {
    dispatch({
      type: "ADD_CHECKBOX",
      payload: {
        data: { status: e.target.value },
      },
    });
  };
  const [genreTags, setGenreTags] = useState([]);
  const [authorTags, setAuthorTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const gresult = await axios.get("http://localhost:5000/books/get_genres");
      const aresult = await axios.get(
        "http://localhost:5000/books/get_authors"
      );
      setGenreTags(gresult.data);
      setAuthorTags(aresult.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h5" className={classes.field} color="textSecondary">
        Advanced Search
      </Typography>
      <AdvSearch list={genreTags} title="genres" className={classes.field} />
      <AdvSearch list={authorTags} title="authors" className={classes.field} />
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.field}
        onClick={handleClick}
      >
        Search
      </Button>
    </div>
  );
};

export default AdvancedSearch;
