import { FC, useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FieldFileInput from "../../components/FieldFileInput";
import Button from "../../components/Button";
import { create } from "ipfs-http-client";
import { createAccount } from "../../utils/contractMethods";
import CustomModal from "../../components/CustomModal";
import Loader from "../../components/Loader";
import { useAppSelector } from "../../hooks";

const MainDiv = styled("div")(({ theme }) => ({
  width: "500px",
  height: "fit-content",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "100px",
  marginBottom: "100px",
  backgroundColor: theme.palette.background.paper,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "9px",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  padding: "50px",

  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "30px",
    marginTop: "50px",
  },
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "30px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  marginBottom: "30px",
}));

const Label = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "left",
  width: "100%",
  marginTop: "15px",
}));

const Input = styled("input")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "400",
  color: theme.palette.text.primary,
  margin: "5px 0px",
  marginTop: "0px",
  padding: "9px 18px",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "5px",
}));

const TextArea = styled("textarea")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "400",
  color: theme.palette.text.primary,
  margin: "5px 0px",
  marginTop: "0px",
  padding: "9px 18px",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "5px",
  overflowY: "auto",
  resize: "vertical",
  minHeight: "100px",

  "::-webkit-scrollbar": {
    width: "5px",
    background: alpha(theme.palette.primary.main, 0.1),
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "5px",
    background: theme.palette.primary.main,
  },
}));

const Index: FC = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [displayName, setDisplayName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const walletAddress = useAppSelector(
    (state) => state.userReducer.walletAddress
  );

  const uploadToIPFS = async () => {
    const options = {
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      repo: "ipfs",
      pin: true,
      start: true,
      EXPERIMENTAL: {
        pubsub: true,
      },
    };
    const client = create(options); //create("https://ipfs.infura.io:5001/api/v0");
    const added = await client.add(selectedFile);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log("url", url);
    return url;
  };

  async function createUser() {
    setLoading(true);
    try {
      const image = await uploadToIPFS();
      console.log(userName, displayName, bio, image);
      await createAccount(
        [userName, displayName, bio, image],
        walletAddress!,
        () => {
          setLoading(false);
          navigate("/home");
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainDiv>
      <Heading>Register</Heading>
      <Label>Username:</Label>
      <Input
        placeholder="Enter username"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <Label>Display Name:</Label>
      <Input
        placeholder="Enter display name"
        onChange={(e) => {
          setDisplayName(e.target.value);
        }}
      />
      <Label>Bio:</Label>
      <TextArea
        placeholder="Enter bio"
        onChange={(e) => {
          setBio(e.target.value);
        }}
      />

      <Label>Profile Picture:</Label>
      <div style={{ height: "fit-content" }}>
        <FieldFileInput onFileSelect={setSelectedFile} />
      </div>
      <br />
      <Button onClick={createUser}>Register</Button>
      <CustomModal open={loading} handleClose={() => {}}>
        <Loader />
      </CustomModal>
    </MainDiv>
  );
};

export default Index;
