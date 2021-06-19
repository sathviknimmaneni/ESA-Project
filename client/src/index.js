import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import searchReducer from "./store/rootReducer";
import userReducer from "./store/userReducer";

import { Providers } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";

Providers.globalProvider = new Msal2Provider({
  clientId: "client-id",
  scopes: [
    "calendars.read",
    "user.read",
    "Calendars.ReadWrite",
    // "User.Read.All",
  ],
});

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
