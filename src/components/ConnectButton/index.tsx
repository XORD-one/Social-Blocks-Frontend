import * as React from 'react';
import Button from '../Button/index';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import { conciseWalletAddress } from '../../utils/formattingFunctions';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
  connectMetamask: () => any;
};

export default function ConnectButton(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { active, account, deactivate } = useWeb3React();
  const navigate = useNavigate();

  const theme = useTheme();
  //@ts-ignore
  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (active && account) {
      setAnchorEl(event.currentTarget);
    } else {
      console.log('conn -');
      props.connectMetamask();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ width: 'fit-content' }}>
      <Button onClick={handleClick} style={{ margin: '0px' }}>
        {active && account
          ? conciseWalletAddress(account)
          : isMobile
          ? 'Connect'
          : 'Connect Wallet'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          onClick={() => {
            navigate(`/profile/${account}`);
          }}
          sx={{ fontSize: '25px', fontFamily: 'Montserrat' }}>
          <AccountBoxIcon />
          &nbsp; Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>Change Wallet</MenuItem> */}
        <MenuItem
          onClick={() => {
            deactivate();
            navigate(`/home`);
          }}
          sx={{ fontSize: '25px', fontFamily: 'Montserrat' }}>
          <LogoutIcon />
          &nbsp; Disconnet
        </MenuItem>
      </Menu>
    </div>
  );
}
