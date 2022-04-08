import styled from "@emotion/styled";
import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const CreatePostBtn = styled("div")(({ theme }) => ({
  position: "fixed",
  zIndex: 1000,
  bottom: "20px",
  right: "20px",
  borderRadius: "5px",
  fontSize: "35px",
  fontWeight: "500",
  width: "50px",
  height: "50px",
  // @ts-ignore
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const Index: FC = () => {
  return (
    <Link to="/create">
      <CreatePostBtn>
        <AiOutlinePlus color="white" />
      </CreatePostBtn>
    </Link>
  );
};

export default Index;
