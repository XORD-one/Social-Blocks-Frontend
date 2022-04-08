import { FC, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { create } from "ipfs-http-client";

import FieldFileInput, { CustomFile } from "../../components/FieldFileInput";
import Button from "../../components/Button";
import { createPost } from "../../utils/contractMethods";
import CustomModal from "../../components/CustomModal";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useTheme } from "@emotion/react";

const Body = styled("div")(({ theme }) => ({
  width: "100vw",
  maxHeight: "100vh",
  overflowY: "auto",

  "::-webkit-scrollbar": {
    width: "13px",
    background: alpha(theme.palette.primary.main, 0.1),
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "3px",
    background: theme.palette.primary.main,
    height: "150px",
  },

  [theme.breakpoints.down("sm")]: {
    "::-webkit-scrollbar": {
      width: "13px",
      background: alpha(theme.palette.primary.main, 0.1),
      display: "none",
    },
  },
}));

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

  "::-webkit-scrollbar": {
    width: "13px",
    background: alpha(theme.palette.primary.main, 0.1),
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "3px",
    background: theme.palette.primary.main,
    height: "150px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "30px",
    marginTop: "50px",

    "::-webkit-scrollbar": {
      width: "13px",
      background: alpha(theme.palette.primary.main, 0.1),
      display: "none",
    },
  },
}));

const Label = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "left",
  width: "100%",
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
  marginBottom: "20px",

  ":focus": {
    outline: "none",
  },
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

const Heading = styled("div")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "15px",
}));

const RadioIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  border: "solid 3px " + theme.palette.text.primary,
  margin: "4px",
}));

const RadioCheckIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  backgroundColor: theme.palette.primary.main,
  border: "solid 3px " + theme.palette.text.primary,
  margin: "4px",
}));

interface PreviewImageParams {
  src: string;
  height: number;
  width: number;
}

const Index: FC = () => {
  const [previewImage] = useState<PreviewImageParams | null>(null);
  const [titleValue, setTitleValue] = useState<string>("");
  const [descValue, setDescValue] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState("2");
  const [price, setPrice] = useState("");
  const theme = useTheme();

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

  const walletAddress = useAppSelector(
    (state) => state.userReducer.walletAddress
  );

  const navigate = useNavigate();

  const uploadFileAndCreatePost = async () => {
    setLoading(true);
    try {
      if (selectedFile) {
        const arrayBuffer = await selectedFile.arrayBuffer();

        const ipfs = create({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
        });

        const result = await ipfs.add({
          path: "socialblocks",
          content: arrayBuffer,
        });

        let URI_Obj = {
          name: titleValue,
          description: descValue,
          image: "https://ipfs.infura.io/ipfs/" + result.cid.toString(),
        };
        let URI = await ipfs.add(JSON.stringify(URI_Obj));

        await createPost(
          status,
          price,
          "https://ipfs.infura.io/ipfs/" + URI.cid.toString(),
          walletAddress!,
          () => {
            setLoading(false);
            navigate("/home");
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Body>
      <MainDiv>
        <Heading>Create Post</Heading>
        <div style={{ height: "fit-content" }}>
          <FieldFileInput onFileSelect={setSelectedFile} />
        </div>
        <br />
        <Label>Title :</Label>
        <Input
          placeholder="Enter title."
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <br />
        <Label>Description :</Label>
        <TextArea
          placeholder="Enter description."
          value={descValue}
          onChange={(e) => setDescValue(e.target.value)}
        />
        <div style={{ width: "100%", height: "10px" }} />
        <Label>Status :</Label>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={status}
          onChange={handleStatusChange}
        >
          <FormControlLabel
            value="2"
            control={
              <Radio
                icon={<RadioIcon />}
                checkedIcon={<RadioCheckIcon />}
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                  //@ts-ignore
                  color: theme.palette.text.primary,
                  "&.Mui-checked": {
                    //@ts-ignore
                    color: theme.palette.primary.main,
                  },
                }}
                disableRipple
              />
            }
            label="Not For Sell"
          />
          <FormControlLabel
            value="1"
            control={
              <Radio
                icon={<RadioIcon />}
                checkedIcon={<RadioCheckIcon />}
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                  //@ts-ignore
                  color: theme.palette.text.primary,
                  "&.Mui-checked": {
                    //@ts-ignore
                    color: theme.palette.primary.main,
                  },
                }}
                disableRipple
              />
            }
            label="Biddable"
          />
          <FormControlLabel
            value="0"
            control={
              <Radio
                icon={<RadioIcon />}
                checkedIcon={<RadioCheckIcon />}
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                  //@ts-ignore
                  color: theme.palette.text.primary,
                  "&.Mui-checked": {
                    //@ts-ignore
                    color: theme.palette.primary.main,
                  },
                }}
                disableRipple
              />
            }
            label="Buyable"
          />
        </RadioGroup>
        <br />
        {status === "0" && (
          <>
            <Label>Price :</Label>
            <Input
              placeholder="Enter price."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
            <br />
          </>
        )}
        {status === "1" && (
          <>
            <Label>Base Price :</Label>
            <Input
              placeholder="Enter base price."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
            <br />
          </>
        )}
        <div style={{ width: "100%", height: "10px" }} />
        <Button
          disabled={Boolean(previewImage)}
          style={{ width: "100%", marginTop: "auto" }}
          onClick={() => uploadFileAndCreatePost()}
        >
          Create Post
        </Button>
        <CustomModal open={loading} handleClose={() => {}}>
          <Loader />
          <br /> <br />
          <Heading>Creating post...</Heading>
        </CustomModal>
      </MainDiv>
    </Body>
  );
};

export default Index;
