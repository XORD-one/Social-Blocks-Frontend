import { FC, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import keccak from "keccak256";
import { injected, walletconnect } from "../../utils/connector";
import Button from "../../components/Button";
import { isAddressReserved } from "../../utils/contractMethods";
import Web3 from "web3";
import { useAppSelector } from "../../hooks";
import Logo1 from "../../assets/Green Logo medium.png";
import Logo2 from "../../assets/Red Logo medium.png";
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
  width: "400px",
  height: "fit-content",
  marginLeft: "auto",
  marginRight: "auto",
  transform: "translateY(-50%)",
  marginTop: "50vh",
  backgroundColor: theme.palette.background.paper,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "9px",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  padding: "30px",
  paddingBottom: "15px",

  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "30px",
    paddingBottom: "15px",
  },
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "30px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  marginBottom: "10px",
}));

const Text = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "400",
  color: theme.palette.text.primary,
  margin: "25px 0px",
}));

const Logo = styled("img")(({ theme }) => ({
  textAlign: "left",
  cursor: "pointer",
  height: "150px",
  margin: "10px auto",
}));

const Index: FC = () => {
  const { activate, account, library, active, deactivate } = useWeb3React();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const instance = useAppSelector((state) => state.contractReducer.instance);
  const signature = useAppSelector((state) => state.userReducer.signature);

  useEffect(() => {
    deactivate();
  }, []);

  // useEffect(() => {}, [signature, account, instance, active]);

  const getSignature = async () => {
    if (library && account && active) {
      const timeConstant = 3600;

      const time = Math.floor(Math.floor(Date.now() / 1000) / timeConstant);
      const hash = keccak(time.toString()).toString("hex");

      const web3 = new Web3(library.currentProvider);

      const signedMessage = await web3.eth.personal.sign(hash, account, "");

      dispatch({
        type: "SET_WALLET_ADDRESS",
        payload: account,
      });
      dispatch({
        type: "SET_SIGNATURE",
        payload: signedMessage,
      });

      return signedMessage;
    }
  };

  const redirect = async () => {
    let signedMessage = await getSignature();
    if (signedMessage && account && instance && active) {
      const username = await isAddressReserved(account);
      if (!username) {
        navigate("/register");
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            username,
            displayName: "",
          },
        });
        navigate("/home");
      }
    }
  };

  const activateMetamaskWallet = async () => {
    try {
      await activate(injected);
      redirect();
    } catch (e: any) {
      console.log(e);
    }
  };

  const activateWalletConnect = async () => {
    try {
      await activate(walletconnect, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(walletconnect);
        } else {
          console.log("Pending Error Occured");
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Body>
      <MainDiv>
        <Logo
          //@ts-ignore
          src={theme.palette.mode === "dark" ? Logo1 : Logo2}
        ></Logo>
        <Heading>Social Blocks</Heading>
        <Button
          onClick={() => {
            activateMetamaskWallet();
          }}
        >
          Connect Metamask
        </Button>
        {/* <Button
          onClick={() => {
            activateWalletConnect();
          }}
        >
          WalletConnect
        </Button> */}
      </MainDiv>
    </Body>
  );
};

export default Index;
