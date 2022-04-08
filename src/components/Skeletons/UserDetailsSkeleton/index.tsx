import React from "react";
import { styled, alpha } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@emotion/react";

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
        variant="circular"
        width={170}
        height={170}
        style={{
          //@ts-ignore
          border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
        }}
      />
      <br />

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
      <br />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={"30%"}
          height={70}
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="rectangular"
          width={"30%"}
          height={70}
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="rectangular"
          width={"30%"}
          height={70}
          style={{
            //@ts-ignore
            border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
};

export default Index;
