import { styled, alpha } from "@mui/system";
import { FC, useState } from "react";
import { create } from "ipfs-http-client";
import { useNavigate } from "react-router-dom";

import FieldFileInput from "../../../../components/FieldFileInput";
import Button from "../../../../components/Button";
import { updateAccount } from "../../../../utils/contractMethods";
import CustomModal from "../../../../components/CustomModal";
import Loader from "../../../../components/Loader";
import { useAppSelector } from "../../../../hooks";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "25px",
  overflowY: "auto",

  "::-webkit-scrollbar": {
    width: "7px",
    background: alpha(theme.palette.primary.main, 0.1),
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "3px",
    background: theme.palette.primary.main,
    height: "100px",
  },

  [theme.breakpoints.down("sm")]: {
    "::-webkit-scrollbar": {
      width: "7px",
      background: alpha(theme.palette.primary.main, 0.1),
      display: "none",
    },
  },
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "15px",
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
  fontWeight: "500",
  color: theme.palette.text.primary,
  margin: "5px 0px",
  marginTop: "0px",
  padding: "9px 18px",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  border: "solid 3px " + alpha("#000", 0.3),
  borderRadius: "5px",
}));

const TextArea = styled("textarea")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
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

type Prop = {
  image: string;
  displayName: string;
  bio: string;
  username: string;
  handleClose: () => void;
};

const Index: FC<Prop> = (props) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [image] = useState(props.image);
  const [displayName, setDisplayName] = useState(props.displayName);
  const [bio, setBio] = useState(props.bio);

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
    return url;
  };

  async function updateUser() {
    setLoading(true);
    try {
      const img = selectedFile ? await uploadToIPFS() : image;

      console.log("img", img, props.username, displayName, bio);

      await updateAccount(
        [props.username, displayName, bio, img],
        walletAddress!,
        () => {
          setLoading(false);
          navigate(`/profile/${walletAddress!.toLowerCase()}`);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Heading>Edit Profile</Heading>
      <div
        style={{
          width: "150px",
          height: "150px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <FieldFileInput
          onFileSelect={setSelectedFile}
          previewImage={image}
          circleShape={true}
        />
      </div>
      <br />
      <Label>Display Name</Label>
      <Input
        placeholder="Enter display name"
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);
        }}
      />
      <Label>Bio</Label>
      <TextArea
        placeholder="Enter bio"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
      />
      <div style={{ width: "100%", height: "10px" }} />
      <Button onClick={updateUser}>Submit</Button>
      <CustomModal open={loading} handleClose={() => {}}>
        <Loader />
        <br /> <br />
        <Heading>Editing Profile...</Heading>
      </CustomModal>
    </Container>
  );
};

export default Index;
