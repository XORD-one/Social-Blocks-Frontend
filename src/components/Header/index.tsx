import { styled, alpha } from '@mui/material/styles';
import ConnectButton from '../ConnectButton/index';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../assets/Green Logo small.png';
import Logo2 from '../../assets/Red Logo small.png';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import keccak256 from 'keccak256';
import Web3 from 'web3';
import { isAddressReserved } from '../../utils/contractMethods';
import { injected, walletconnect } from '../../utils/connector';
import { useEffect } from 'react';

const Header = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
  padding: '10px 20px',
  backgroundColor: theme.palette.background.paper,
  borderBottom: 'solid 3px ' + alpha(theme.palette.text.primary, 0.5),
  boxShadow: '0 0 1rem 0 ' + alpha('#000', 0.2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: '0px',
  zIndex: '1000',
}));

const Logo = styled('img')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '500',
  color: theme.palette.primary.main,
  textAlign: 'left',
  cursor: 'pointer',
  height: '59px',
}));

const Input = styled('input')<{ isSearchPage? }>(({ theme, isSearchPage }) => ({
  fontSize: '20px',
  fontWeight: '500',
  color: theme.palette.text.primary,
  padding: '13px 18px',
  width: '500px',
  backgroundColor: theme.palette.background.default,
  border: 'solid 3px ' + alpha(theme.palette.text.primary, 0.5),
  borderRadius: '13px',
  margin: '7px 0px',
  marginLeft: 'auto',
  marginRight: 'auto',

  ':focus': {
    outline: 'none',
  },

  [theme.breakpoints.down('smd')]: {
    display: isSearchPage ? 'block' : 'none',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const Heading = styled('div')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '500',
  color: theme.palette.text.primary,
}));

export default function HeaderComponent(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTab = useMediaQuery(theme.breakpoints.down('smd'));

  const { activate, deactivate } = useWeb3React();

  const activateMetamaskWallet = async () => {
    try {
      await activate(injected);
    } catch (e: any) {
      console.log(e);
    }
  };

  const activateWalletConnect = async () => {
    try {
      await activate(walletconnect, undefined, true).catch(error => {
        if (error instanceof UnsupportedChainIdError) {
          activate(walletconnect);
        } else {
          console.log('Pending Error Occured');
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Header>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        {props?.isSearchPage ? (
          <>
            {!isTab ? (
              <>
                <Logo
                  onClick={() => {
                    navigate('/');
                  }}
                  src={theme.palette.mode === 'dark' ? Logo1 : Logo2}
                />
                &nbsp; &nbsp;
                <Heading
                  onClick={() => {
                    navigate('/');
                  }}
                  style={{ fontWeight: '700' }}>
                  Social Blocks
                </Heading>
              </>
            ) : null}
          </>
        ) : (
          <>
            <Logo
              onClick={() => {
                navigate('/');
              }}
              src={theme.palette.mode === 'dark' ? Logo1 : Logo2}
            />
            {!isMobile ? (
              <>
                &nbsp; &nbsp;
                <Heading style={{ fontWeight: '700' }}>Social Blocks</Heading>
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
            window.location.href.split('/')[3] !== 'search' &&
            !props.followPage
          ) {
            navigate('/search');
          }
        }}
        onChange={e => {
          if (props?.isSearchPage) {
            props?.setSearchValue(e.target.value);
          }
        }}
      />
      {props?.isSearchPage ? (
        !isTab ? (
          <div>
            <ConnectButton connectMetamask={() => activateMetamaskWallet()} />
          </div>
        ) : null
      ) : (
        <div>
          <ConnectButton connectMetamask={() => activateMetamaskWallet()} />
        </div>
      )}
    </Header>
  );
}
