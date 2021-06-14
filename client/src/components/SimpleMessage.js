import React from "react";
import { Paper, Typography } from "@material-ui/core";

const SimpleMessage = () => {
  return (
    <Paper
      variant="outlined"
      style={{ padding: 8, marginTop: 16, textAlign: "center" }}
    >
      <Typography>You are not signed in! Sign in now.</Typography>
    </Paper>
  );
};

export default SimpleMessage;
