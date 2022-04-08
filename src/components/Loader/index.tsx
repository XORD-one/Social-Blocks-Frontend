import { styled } from "@mui/material/styles";

const Loader = styled("div")(({ theme }) => ({
  display: "inline-block",
  // width: 150,
  // height: 150,

  ":after": {
    content: "' '",
    display: "block",
    width: 120,
    height: 120,
    margin: 8,
    borderRadius: "50%",
    border: `9px solid ${theme.palette.primary.main}`,
    borderColor: `${theme.palette.primary.main} transparent ${theme.palette.primary.main} transparent`,
    animation: "lds-dual-ring 1.2s linear infinite",
  },

  "@keyframes lds-dual-ring": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

export default Loader;
