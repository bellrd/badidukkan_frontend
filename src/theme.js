import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main:"#461f4f",
            dark: "#381040"
        },
        secondary: {
            main: "#87335E"
        },
    },
    typography: {
        fontFamily: [
            '"Alegreya Sans"',
            '"Helvetica Neue"',
            '"Arial"',
            '"sans-serif"',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
    }
});

export default theme