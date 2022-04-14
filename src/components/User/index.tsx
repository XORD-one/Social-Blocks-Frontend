import React from "react";
import { styled, alpha } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";

const MainDiv = styled("div")(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  margin: "25px 0px",
  backgroundColor: theme.palette.background.paper,
  border: "solid 4px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "9px",
  //   boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  cursor: "pointer",

  [theme.breakpoints.down("sm")]: {},
}));

const PostHeader = styled("div")(({ theme }) => ({
  width: "max-content",
  height: "fit-content",
  display: "flex",
  padding: "9px 15px",
  alignItems: "center",
  justifyContent: "flex-start",
}));

const PostPicture = styled("img")(({ theme }) => ({
  width: "70px",
  height: "70px",
  objectFit: "cover",
  borderRadius: "40px",
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  cursor: "pointer",
}));

const PostDisplayname = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "left",
  marginLeft: "15px",
  cursor: "pointer",
}));

const PostUsername = styled("div")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "left",
  marginLeft: "15px",
  cursor: "pointer",
}));

type Props = {
  image;
  displayName;
  userName;
  address;
};

const User: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <MainDiv onClick={() => navigate(`/profile/${props.address}`)}>
      <PostHeader>
        <PostPicture src={props.image} />
        <div>
          <PostDisplayname>{props.displayName}</PostDisplayname>
          <PostUsername>@{props.userName}</PostUsername>
        </div>
      </PostHeader>
    </MainDiv>
  );
};

export default User;
