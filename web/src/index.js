import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./pages/Landing";
import JoinPage from "./pages/JoinPage";
import AboutPage from "./pages/AboutPage";

import { MsalProvider } from "@hsluoyz/msal-react";
import {pca} from "./utils/Setting";

ReactDOM.render(
  <MsalProvider instance={pca}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/join" component={JoinPage}/>
        <Route exact path="/about" component={AboutPage}/>
        <Route component={App}/>
      </Switch>
    </BrowserRouter>
  </MsalProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
