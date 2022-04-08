import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const CreatePostBtn = styled("div")(({ theme }) => ({
  position: "fixed",
  zIndex: 1000,
  bottom: "80px",
  right: "20px",
  borderRadius: "5px",
  fontSize: "35px",
  fontWeight: "500",
  width: "50px",
  height: "50px",
  // @ts-ignore
  backgroundColor: theme.palette.primary.main,
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  [theme.breakpoints.down("smd")]: {
    display: "flex",
  },
}));

const Index: FC = () => {
  return (
    <Link to="/search">
      <CreatePostBtn>
        <SearchIcon style={{ fill: "#fff", height: "35px", width: "35px" }} />
      </CreatePostBtn>
    </Link>
  );
};

export default Index;
