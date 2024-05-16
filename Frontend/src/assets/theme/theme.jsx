import {
  Autocomplete,
  Checkbox,
  createTheme,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
} from "@mui/material";
import "../theme/constants.scss";


const primaryFontSize = 14;

export const PrimaryTheme = createTheme({
  palette: {
    text: {
      primary: "#313131",
      disabled: "#6b6b6b",
    },
    primary: {
      main: "#4a033d",
    },
    secondary: {
      main: "#ff8884",
    },
    success: {
      main: "#00C853",
    },
    error: {
      main: "#FF0001",
    },
    warning: {
      main: "#FFB800",
    },
    background: {
      default: "#ff8884",
      paper: "#ff8884",
    },
  },
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
    fontSize: primaryFontSize,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    body1: {
      fontSize: primaryFontSize,
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.05)",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: "-2px",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "16px",
          paddingTop: "0",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: "0px",
        },
      },
    },
  },
});

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "width",
})(({ theme, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    backgroundColor: "#a45a70",
    color: theme.palette.common.white,
    padding: "15px",
    borderLeft: "1px solid",
    borderColor: "#a45a70",
    width: width || "auto",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "15px",
    color: theme.palette.common.white,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderBottom: "0.01px solid #E75480 !important",
    width: width || "auto",
  },
  "&:last-child": {
    position: "sticky",
    right: 0,
    zIndex: 10,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
  "&.MuiCheckbox-colorPrimary": {
    color: theme.palette.common.white,
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
   // backgroundColor: "#5CAD77",
    color: "#4a033d",
    //borderColor: "#5CAD77",
  },
  "& .MuiInputLabel-root": {
    color: "#4a033d",
    pointerEvents: "none",
  },
  "& .MuiInputLabel-root.Mui-required::after": {
    color: "red",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
    opacity: 1,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",//
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "#E75480",
    },
    "&.Mui-focused fieldset": {
      color: "white",
      borderColor: "#E75480",
      borderWidth: "2px",
    },
    "& input::placeholder": {
      color: "white",
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "white",
  },
  "& .MuiSvgIcon-root": {
    color: "#274D36",
  },
  "&.Mui-disabled .MuiOutlinedInput-root": {
    borderColor: "red",
  },
}));

export const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "#ff8884",
    "&:hover": {
      backgroundColor: "#ff8884",
    },
    "&.Mui-focused": {
      backgroundColor: "#ff8884",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ff8884",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& input::placeholder": {
      color: "white",
    },
  },
  "& .MuiAutocomplete-paper": {
    backgroundColor: "#ff8884",
  },
  "& .MuiAutocomplete-popper": {
    "& .MuiPopper-root": {
      backgroundColor: "#ff8884 ",
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "white",
  },
}));
