import React, { useEffect } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  OutlinedInput
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  formControl: {
    margin: 8,
    width: "100%",
  },
});
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const AdvSearch = ({ list, title }) => {
  const classes = useStyles();
  const [listValue, setListValue] = React.useState([]);
  const dispatch = useDispatch();

  const getWidth = (title) => {
    return (title.length)*9;
  }

  const handleChange = (event) => {
    setListValue(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: "ADD_CHECKBOX",
      payload: {
        data: { [title]: listValue },
      },
    });
  }, [dispatch, listValue, title]);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl} >
        <InputLabel id="demo-mutiple-checkbox-label">{title}</InputLabel>
        <Select
          name={title}
          multiple
          value={listValue}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={getWidth(title)} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {list.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={listValue.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AdvSearch;
