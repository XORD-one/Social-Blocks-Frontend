import React from "react";
import { styled, alpha } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@emotion/react";

const MainDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: theme.palette.background.paper,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "9px",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),

  [theme.breakpoints.down("sm")]: {},
}));

const PostHeader = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  padding: "13px",
  alignItems: "center",
}));

const PostBottom = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  padding: "11px 15px",
  paddingTop: "3px",
  alignItems: "center",
}));

type Props = any;

const Index: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <MainDiv>
      <PostHeader>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
          }}
        />
        &nbsp;&nbsp;&nbsp;
        <Skeleton
          variant="rectangular"
          width={200}
          height={30}
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
            borderRadius: "30px",
          }}
        />
      </PostHeader>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="250px"
        style={{
          //@ts-ignore
          borderTop: "solid 2px " + alpha(theme.palette.text.primary, 0.5),
          //@ts-ignore
          borderBottom: "solid 2px " + alpha(theme.palette.text.primary, 0.5),
        }}
      />
      <PostBottom style={{ paddingTop: "15px" }}>
        <Skeleton
          variant="rectangular"
          width="40px"
          height="40px"
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
            borderRadius: "8px",
          }}
        />
        &nbsp;&nbsp;&nbsp;
        <Skeleton
          variant="rectangular"
          width="100px"
          height="30px"
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
            borderRadius: "30px",
          }}
        />
        <Skeleton
          variant="rectangular"
          width="70px"
          height="40px"
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
            borderRadius: "8px",
            marginLeft: "auto",
          }}
        />
      </PostBottom>
    </MainDiv>
  );
};

export default Index;
