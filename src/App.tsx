import { FC } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/index";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MuiTheme from "./theme";
import ThemeSwitch from "./components/ThemeSwitch";

const App: FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <MuiTheme>
          <BrowserRouter>
            <Router />
            <ThemeSwitch />
          </BrowserRouter>
        </MuiTheme>
      </Provider>
    </div>
  );
};

export default App;
