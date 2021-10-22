import { ThemeProvider } from "@mui/material/styles";
import theme, { color } from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          bgcolor={ color.black_pearl }
        >
            <Switch>
              <Route exact path="/" render={() => (<HomePage />)} />
              <Route exact path="/favorites" component={FavoritesPage} />
              <Redirect to="/" />
            </Switch>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
