import { createTheme } from '@mui/material/styles';

/**
 * Color names from https://www.htmlcsscolor.com/
 */
export const color = {
  white: "#FFFFFF",
  black_pearl: "#000408",
  midnigt_moss: "#232524",
  wild_watermelon: "#FF6871"
}

const theme = createTheme({
  palette: {
    mode: "dark"
  },
  typography: {
    "fontFamily": `"Helvetica"`
  }
});
  
export default theme;