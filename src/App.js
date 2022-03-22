import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./routes";
import AppProvider from "./context/AppProvider";

import "./App.css";
import "./App.scss";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <div className="Loader" id="loader">
          <div>
            <i className="fa fa-spinner main-color fa-spin fa-5x" />
          </div>
        </div>
        <div className="backdrop-container" id="backdrop-container"></div>
        <Routes />
      </div>
    </AppProvider>
  );
}

export default App;
