import { FC } from "react";
import { useThemeSwitch } from "../../hooks/switchTheme";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.primary.main,
  },

  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Index: FC = () => {
  const [, switchTheme] = useThemeSwitch();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "1000",
        bottom: "7px",
        left: "7px",
        borderRadius: "5px",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      <CustomSwitch
        {...label}
        onChange={() => {
          switchTheme();
        }}
      />
    </div>
  );
};

export default Index;
