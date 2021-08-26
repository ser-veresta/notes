import { Home } from "./components/screens/Home";
import { Create } from "./components/screens/Create";
import { Notes } from "./components/screens/Notes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { Layout } from "./components/utils/Layout";
import { useEffect, useReducer } from "react";
import noteState from "./context";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[800],
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return { ...state, data: action.payload, err: "", loading: false };

    case "failure":
      return { ...state, data: [], err: action.payload, loading: false };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { data: [], err: "", loading: true, fetchData: fetchData });

  async function fetchData() {
    try {
      const { data } = await axios.get("https://609e2b4933eed80017957ebb.mockapi.io/note");
      dispatch({ type: "success", payload: data });
    } catch (err) {
      dispatch({ type: "failure", payload: err });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <noteState.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <div>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/create" component={Create} />
                <Route path="/update/:id" component={Create} />
                <Route path="/notes" component={Notes} />
              </Switch>
            </Layout>
          </Router>
        </div>
      </ThemeProvider>
    </noteState.Provider>
  );
}

export default App;
