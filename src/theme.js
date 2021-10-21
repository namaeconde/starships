import { createTheme } from '@mui/material/styles';

/**
 * Color names from https://www.htmlcsscolor.com/
 */
export const color = {
  white: "#FFFFFF",
  black_pearl: "#000408",
  midnigt_moss: "#232524",
  wild_watermelon: "#FF6871",
  racing_green: "#212423"
}

const theme = createTheme({
  palette: {
    mode: "dark"
  },
  typography: {
    "fontFamily": `"Helvetica"`,
    button: {
      textTransform: 'none'
    }
  }
});
  
export default theme;