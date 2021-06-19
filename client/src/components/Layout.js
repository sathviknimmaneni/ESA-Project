import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Paper,
  IconButton,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router-dom";
import { Login } from "@microsoft/mgt-react";
import { Providers, ProviderState } from "@microsoft/mgt-element";

import SimpleMessage from "./SimpleMessage";

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  SearchBar: {
    flexGrow: 1,
  },
  appTitle: {
    marginRight: 16,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  searchPaper: {
    padding: "2px 2px",
    display: "flex",
    alignItems: "center",
    width: 300,
    height: 32,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  activeLink: {
    backgroundColor: "#e0f2f1",
  },
  listHead: {
    marginLeft: theme.spacing(2),
  },
}));

const navItems = [
  {
    id: 1,
    path: "/",
    title: "Home",
  },
  {
    id: 7,
    path: "/books/mybooks",
    title: "My Books",
  },
  {
    id: 2,
    path: "/books/new/create",
    title: "Add new book",
  },
  {
    id: 3,
    path: "/books/searchfilters",
    title: "Advanced search",
  },
  {
    id: 4,
    path: "/calender",
    title: "Schedule",
  },
];

function useIsSignedIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
}

const getUser = async function (graphClient) {
  return await graphClient.api("me").get();
};

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isSignedIn] = useIsSignedIn();

  const [search, setSearch] = useState("");
  const handleSearch = () => {
    history.push(`/books/search/${search}`);
    setSearch("");
  };

  const updateUser = (result) => {
    dispatch({
      type: "ADD_USER",
      payload: {
        data: { name: result.displayName, mail: result.mail },
      },
    });
  };

  const updateUserSignedIn = (isSignedIn) => {
    dispatch({
      type: "ADD_SIGNEDIN",
      payload: {
        data: { isSignedIn: isSignedIn },
      },
    });
  };

  useEffect(() => {
    updateUserSignedIn(isSignedIn);
    if (isSignedIn) {
      let provider = Providers.globalProvider;
      let graphClient = provider.graph.client;
      getUser(graphClient).then((result) => updateUser(result));
    }
  }, [isSignedIn]);

  // console.log(userData);
  return (
    <div className={classes.root}>
      <AppBar elevation={2} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" className={classes.appTitle}>
            Project Name
          </Typography>
          <div className={classes.SearchBar}>
            <Paper className={classes.searchPaper}>
              <InputBase
                className={classes.searchInput}
                id="searchbar"
                placeholder="Search...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton
                //   type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={() => handleSearch()}
                disabled={
                  !userData.isSignedIn || (search === "" ? true : false)
                }
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <Login />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Typography variant="h6" className={classes.listHead}>
          Books
        </Typography>
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.id}
              button
              disabled={!isSignedIn}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.activeLink : null
              }
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container>
        <div className={classes.toolbar}></div>
        {!isSignedIn && <SimpleMessage />}
        <div>{children}</div>
      </Container>
    </div>
  );
};

export default Layout;
