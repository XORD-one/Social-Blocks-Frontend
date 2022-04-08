import styled from "@emotion/styled";

export default styled("button")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  padding: "10px 20px",
  //@ts-ignore
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  borderRadius: "5px",
  border: "none",
  margin: "15px 0px",
  marginTop: "10px",
  cursor: "pointer",
  width: "100%",
}));
