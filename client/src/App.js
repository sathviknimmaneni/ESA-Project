import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import AddBook from "./page/AddBook";
import SingleBook from "./page/SingleBook";
import UpdateBook from "./page/UpdateBook";
import Layout from "./components/Layout";
import SearchResults from "./page/SearchResults";
import AdvSearchResults from "./page/AdvSearchResults";
import AdvancedSearch from "./page/AdvancedSearch";
import MyBooks from "./page/MyBooks";
import Calender from "./page/Calender";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    background: { default: "#F8F8F8" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/books/new/create" component={AddBook} />
            <Route path="/books/:bookId/update" component={UpdateBook} />
            <Route
              exact
              path="/books/search/:searchText"
              component={SearchResults}
            />
            <Route exact path="/books/advsearch" component={AdvSearchResults} />
            <Route
              exact
              path="/books/searchfilters"
              component={AdvancedSearch}
            />
            <Route exact path="/books/getbook/:bookId" component={SingleBook} />
            <Route path="/books/mybooks" component={MyBooks} />
            <Route path="/calender" component={Calender} />
          </div>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
