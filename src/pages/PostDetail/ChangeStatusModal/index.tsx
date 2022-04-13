import { FC, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { create } from "ipfs-http-client";

import FieldFileInput, { CustomFile } from "../../../components/FieldFileInput";
import Button from "../../../components/Button";
import { createPost } from "../../../utils/contractMethods";
import CustomModal from "../../../components/CustomModal";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useTheme } from "@emotion/react";

const MainDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "35px 25px",

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

const Index: FC<any> = (props) => {
  const [status, setStatus] = useState("2");
  const [price, setPrice] = useState("");
  const theme = useTheme();
  const [bidDuration, setBidDuration] = useState<number>(0);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

  return (
    <MainDiv>
      <Heading>Change Status &#38; Price.</Heading>
      <br />
      <Label>Title :</Label>
      <Heading style={{ textAlign: "left", fontWeight: "700" }}>
        {props?.title}
      </Heading>
      <Label>Description :</Label>
      <Heading style={{ textAlign: "left", fontWeight: "700" }}>
        {props?.description}
      </Heading>

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
          label="Not For Sale"
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
          <Label>Price (Eth) :</Label>
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
          <Label>Base Price (Eth) :</Label>
          <Input
            placeholder="Enter base price."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
          <br />
          <Label>Bidding Duration (days) :</Label>
          <Input
            placeholder="Bidding duration in days."
            value={bidDuration ? bidDuration : 0}
            onChange={(e) => setBidDuration(parseInt(e.target.value))}
            type="number"
          />
          <br />
        </>
      )}
      <div style={{ width: "100%", height: "10px" }} />
      <Button
        style={{ width: "100%", marginTop: "auto" }}
        onClick={() => {
          props.changeStatus(status, price, bidDuration);
        }}
      >
        Sumbit Changes
      </Button>
    </MainDiv>
  );
};

export default Index;
