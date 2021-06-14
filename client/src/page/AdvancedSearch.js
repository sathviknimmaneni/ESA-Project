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
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/books/get_genres");
      setGenreTags(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h5" className={classes.field} color="textSecondary">
        Advanced Search
      </Typography>
      <AdvSearch
        list={["CSE", "EEE", "CIVIL", "MECH"]}
        title="recommendedBranches"
        className={classes.field}
      />
      <AdvSearch list={genreTags} title="genres" className={classes.field} />
      <AdvSearch
        list={["Course 1", "Course 2", "Course 3", "Course 4"]}
        title="coursesUsedIn"
        className={classes.field}
      />
      <AdvSearch
        list={["Name 1", "2 Name", "3 Name", "4 Name"]}
        title="usedByProfessors"
        className={classes.field}
      />

      <div className={classes.field}>
        <Typography>Set Popularity</Typography>
        <Slider
          onChange={handleSliderChange}
          defaultValue={0}
          // getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={10}
          marks={marks}
          valueLabelDisplay="auto"
        />
      </div>

      <div className={classes.field}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            aria-label="Status"
            name="Status"
            onChange={handleStatusChange}
          >
            <FormControlLabel
              value="instock"
              control={<Radio />}
              label="Instock"
            />
            <FormControlLabel
              value="checked out"
              control={<Radio />}
              label="Checked Out"
            />
          </RadioGroup>
        </FormControl>
      </div>

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
