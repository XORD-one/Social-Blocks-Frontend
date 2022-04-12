/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Modal } from "@mui/material";

const MainDiv = styled("div")(({ theme }) => ({
  width: 500,
  height: 600,
  backgroundColor: theme.palette.background.paper,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const OverlayDiv = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

type Props = {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

const CustomModal: React.FC<Props> = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <OverlayDiv onClick={props.handleClose}>
        <MainDiv onClick={(e) => e.stopPropagation()}>{props.children}</MainDiv>
      </OverlayDiv>
    </Modal>
  );
};

export default CustomModal;
