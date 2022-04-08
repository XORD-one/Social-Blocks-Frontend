import styled from "@emotion/styled";
import { alpha } from "@mui/material";
import { FC } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header/index";
import Profile from "../../components/Profile/index";

const Body = styled("div")(({ theme }) => ({
  width: "100vw",
  maxHeight: "100vh",
  overflowY: "auto",

  "::-webkit-scrollbar": {
    width: "13px",
    //@ts-ignore
    background: alpha(theme.palette.primary.main, 0.1),
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "3px",
    //@ts-ignore
    background: theme.palette.primary.main,
    height: "150px",
  },

  //@ts-ignore
  [theme.breakpoints.down("sm")]: {
    "::-webkit-scrollbar": {
      width: "13px",
      //@ts-ignore
      background: alpha(theme.palette.primary.main, 0.1),
      display: "none",
    },
  },
}));

const MainContainer = styled("div")(({ theme }) => ({
  width: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "100px 0px",

  //@ts-ignore
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "90px 10px",
  },
}));

const MainDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  marginLeft: "auto",
  marginRight: "auto",
  margin: "15px 0px",
  borderRadius: "9px",
  //@ts-ignore
  [theme.breakpoints.down("sm")]: {},
}));

const PostContent = styled("img")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  //@ts-ignore
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "8px",
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "500",
  //@ts-ignore
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "15px",
}));

const InfoContainer = styled("div")(({ theme }) => ({
  width: "100%",
  //@ts-ignore
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "8px",
  margin: "20px 0px",
  padding: "8px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-around",
}));

const InfoTab = styled("div")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "800",
  width: "100px",
  margin: "10px 0px",
}));

const Input = styled("input")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "400",
  //@ts-ignore
  color: theme.palette.text.primary,
  margin: "5px 0px",
  marginTop: "0px",
  padding: "9px 18px",
  width: "100%",
  //@ts-ignore
  backgroundColor: theme.palette.background.default,
  //@ts-ignore
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "5px",
}));

const PostDetail: FC = () => {
  return (
    <Body>
      <Header />
      <MainContainer>
        <MainDiv>
          <Heading style={{ fontWeight: "800" }}>PostId#103</Heading>
          <PostContent
            src={
              "https://ipfs.infura.io/ipfs/QmdMZKc5DdWjprh5FgQL8wHha3Rea1UHGCUf8n6EiiPtq5"
            }
          />
          <Heading style={{ marginTop: "10px" }}>"Title of the post."</Heading>
          <Heading style={{ fontSize: "15px" }}>
            "Description of the post. Passionate about capturing all of life's
            important occasions."
          </Heading>
          <InfoContainer>
            <InfoTab>
              <div>{"100K"}</div>
              <div style={{ fontSize: "15px", fontWeight: "500" }}>Likes</div>
            </InfoTab>
            <InfoTab>
              <div>{"500"}</div>
              <div style={{ fontSize: "15px", fontWeight: "500" }}>
                Comments
              </div>
            </InfoTab>
            <InfoTab>
              <div>{"100$"}</div>
              <div style={{ fontSize: "15px", fontWeight: "500" }}>Value</div>
            </InfoTab>
          </InfoContainer>
          <Heading style={{ marginTop: "10px", textAlign: "left" }}>
            Creator :
          </Heading>
          <Profile
            userName={"ijlalishaq"}
            displayName={"Ijlal Ishaq"}
            image={
              "https://ipfs.infura.io/ipfs/QmdMZKc5DdWjprh5FgQL8wHha3Rea1UHGCUf8n6EiiPtq5"
            }
            address={"0x23e05938b4619035870836D22C4Ef9988623c384"}
          />
          <Heading style={{ marginTop: "10px", textAlign: "left" }}>
            Owner :
          </Heading>
          <Profile
            userName={"ijlalishaq"}
            displayName={"Ijlal Ishaq"}
            image={
              "https://ipfs.infura.io/ipfs/QmdMZKc5DdWjprh5FgQL8wHha3Rea1UHGCUf8n6EiiPtq5"
            }
            address={"0x23e05938b4619035870836D22C4Ef9988623c384"}
          />
          <Heading
            style={{
              marginTop: "10px",
              textAlign: "left",
              marginBottom: "0px",
            }}
          >
            Status :
          </Heading>
          <Heading
            style={{
              textAlign: "left",
              fontSize: "40px",
              marginTop: "0px",
              fontWeight: "400",
            }}
          >
            &#8226; Biddable
          </Heading>
          <Heading
            style={{
              marginTop: "10px",
              textAlign: "left",
              marginBottom: "0px",
            }}
          >
            Bidding Ends :
          </Heading>
          <Heading
            style={{
              textAlign: "left",
              fontSize: "40px",
              marginTop: "0px",
              fontWeight: "400",
            }}
          >
            &#8226; 12th April 2022
          </Heading>
          <Heading
            style={{
              marginTop: "10px",
              textAlign: "left",
              marginBottom: "0px",
            }}
          >
            Last Bid :
          </Heading>
          <Heading
            style={{
              textAlign: "left",
              fontSize: "40px",
              marginTop: "0px",
              fontWeight: "400",
            }}
          >
            &#8226; 100 $
          </Heading>
          <Heading
            style={{
              marginTop: "10px",
              textAlign: "left",
              marginBottom: "0px",
            }}
          >
            Your Bid:
          </Heading>
          <Input
            placeholder="Enter amount"
            type={"number"}
            style={{ marginTop: "10px" }}
          />
          <Button style={{ marginTop: "25px" }}>Bid</Button>
        </MainDiv>
      </MainContainer>
    </Body>
  );
};

export default PostDetail;
