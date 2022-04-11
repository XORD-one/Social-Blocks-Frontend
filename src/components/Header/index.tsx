import { styled, alpha } from "@mui/material/styles";
import ConnectButton from "../ConnectButton/index";
import { useNavigate } from "react-router-dom";
import Logo1 from "../../assets/Green Logo small.png";
import Logo2 from "../../assets/Red Logo small.png";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";

const Header = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  padding: "10px 20px",
  backgroundColor: theme.palette.background.paper,
  borderBottom: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: "0px",
  zIndex: "1000",
}));

const Logo = styled("img")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.primary.main,
  textAlign: "left",
  cursor: "pointer",
  height: "59px",
}));

const Input = styled("input")<{ isSearchPage? }>(({ theme, isSearchPage }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  padding: "13px 18px",
  width: "500px",
  backgroundColor: theme.palette.background.default,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "13px",
  margin: "7px 0px",
  marginLeft: "auto",
  marginRight: "auto",

  ":focus": {
    outline: "none",
  },

  [theme.breakpoints.down("smd")]: {
    display: isSearchPage ? "block" : "none",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
}));

export default function HeaderComponent(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("smd"));

  return (
    <Header>
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        {props?.isSearchPage ? (
          <>
            {!isTab ? (
              <>
                <Logo
                  onClick={() => {
                    navigate("/");
                  }}
                  src={theme.palette.mode === "dark" ? Logo1 : Logo2}
                />
                &nbsp; &nbsp;
                <Heading>Social Blocks</Heading>
              </>
            ) : null}
          </>
        ) : (
          <>
            <Logo
              onClick={() => {
                navigate("/");
              }}
              src={theme.palette.mode === "dark" ? Logo1 : Logo2}
            />
            {!isMobile ? (
              <>
                &nbsp; &nbsp;
                <Heading>Social Blocks</Heading>
              </>
            ) : null}
          </>
        )}
      </div>
      <Input
        placeholder="Search Users... &#128269;"
        autoFocus={props?.isSearchPage ? true : false}
        isSearchPage={props?.isSearchPage}
        onClick={() => {
          if (
            window.location.href.split("/")[3] !== "search" &&
            !props.followPage
          ) {
            navigate("/search");
          }
        }}
        onChange={(e) => {
          if (props?.isSearchPage) {
            props?.setSearchValue(e.target.value);
          }
        }}
      />
      {props?.isSearchPage ? (
        !isTab ? (
          <div>
            <ConnectButton />
          </div>
        ) : null
      ) : (
        <div>
          <ConnectButton />
        </div>
      )}
    </Header>
  );
}
