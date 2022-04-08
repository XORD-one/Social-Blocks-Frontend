import React from "react";
import { styled, alpha } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@emotion/react";

const PostHeader = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  padding: "13px",
  alignItems: "center",
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "9px",
}));

const Index: React.FC = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <br />
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={40}
        style={{
          //@ts-ignore
          border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
          borderRadius: "8px",
          marginBottom: "8px",
        }}
      />
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={200}
        style={{
          //@ts-ignore
          border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
          borderRadius: "8px",
          marginBottom: "8px",
          marginTop: "10px",
        }}
      />
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={40}
        style={{
          //@ts-ignore
          border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
          borderRadius: "8px",
          marginTop: "7px",
        }}
      />
      <br />
      <PostHeader>
        <Skeleton
          variant="circular"
          width={70}
          height={70}
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
          }}
        />
        &nbsp;&nbsp;&nbsp;
        <div style={{ flex: 1 }}>
          <Skeleton
            variant="rectangular"
            width={"50%"}
            height={30}
            style={{
              //@ts-ignore
              border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          />
          <Skeleton
            variant="rectangular"
            width={"75%"}
            height={30}
            style={{
              //@ts-ignore
              border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
              borderRadius: "8px",
            }}
          />
        </div>
      </PostHeader>{" "}
      <br />
      <PostHeader>
        <Skeleton
          variant="circular"
          width={70}
          height={70}
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
          }}
        />
        &nbsp;&nbsp;&nbsp;
        <div style={{ flex: 1 }}>
          <Skeleton
            variant="rectangular"
            width={"50%"}
            height={30}
            style={{
              //@ts-ignore
              border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          />
          <Skeleton
            variant="rectangular"
            width={"75%"}
            height={30}
            style={{
              //@ts-ignore
              border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
              borderRadius: "8px",
            }}
          />
        </div>
      </PostHeader>
    </div>
  );
};

export default Index;
