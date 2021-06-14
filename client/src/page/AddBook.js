import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Chip,
  IconButton,
  InputAdornment,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  container: { marginTop: 16 },
  field: {
    marginTop: 16,
    marginBottom: 10,
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  chipRoot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 4,
    margin: 0,
  },
  chip: {
    margin: 4,
  },
});
const AddBook = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [chipData, setChipData] = useState([]);
  const [chipValue, setChipValue] = useState("");
  const history = useHistory();
  const userData = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/books/post_book", {
        ...formData,
        genres: chipData,
        name: userData.name,
        email: userData.mail,
      })
      .then((response) => console.log(response))
      .catch((err) => {
        console.error(err);
      });
    history.push("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChip = (value) => {
    setChipData([...chipData, value]);
    setChipValue("");
  };

  const deleteChip = (name) => {
    setChipData((chips) => chips.filter((chip) => chip !== name));
  };
  return (
    <div className={classes.container}>
      <Typography variant="h5" color="textSecondary">
        Add a new Book
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          id="title"
          label="Title"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.field}
          id="author"
          label="Author"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.field}
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          className={classes.field}
          label="Add Genres"
          value={chipValue}
          variant="outlined"
          onChange={(e) => setChipValue(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={() => handleChip(chipValue)}
                  disabled={true ? chipValue.length === 0 : false}
                >
                  <AddCircleOutlineRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <ul className={classes.chipRoot}>
          {chipData.map((chip, index) => (
            <li key={index}>
              <Chip
                label={chip}
                onDelete={() => deleteChip(chip)}
                className={classes.chip}
              />
            </li>
          ))}
        </ul>

        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddBook;
