import {createTheme, ThemeProvider} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"


export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#FBDDC7'
    },
    secondary: {
      main: '#6c757d'
    },
    danger: {
      main: '#dc3545'
    },
    warning: {
      main: '#ffc107'
    },
    dark: {
      main: '#221f23'
    },
    light: {
      main: '#f8f9fa'
    }
  }
});

export default function DarkTheme({children}) {
  return <ThemeProvider theme={darkTheme}><CssBaseline/>{children}</ThemeProvider>
}