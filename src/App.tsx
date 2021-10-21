import { ThemeProvider } from "@mui/material/styles";
import theme, { color } from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        minHeight="100vh"
        bgcolor={ color.black_pearl }
      >
        <HomePage />
      </Box>
    </ThemeProvider>
  );
}

export default App;
