/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useRoutes, Navigate, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import ConnectWallet from '../pages/ConnectWallet';
import CreatePost from '../pages/CreatePost';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { initializeContract } from '../utils/contractMethods';
import Search from '../pages/Search';
import PostDetail from '../pages/PostDetail';
import Followers from '../pages/Followers';
import Followings from '../pages/Followings';
import keccak from 'keccak256';
import Web3 from 'web3';
import { isAddressReserved } from '../utils/contractMethods';
import keccak256 from 'keccak256';
import { useAppSelector } from '../hooks';
import CustomModal from '../components/CustomModal';
import Button from '../components/Button';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

const ConnectedRoutes = () => {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: '',
          element: <Navigate to={'/home'} />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'create',
          element: <CreatePost />,
        },
        {
          path: 'connect',
          element: <ConnectWallet />,
        },
        {
          path: 'profile',
          children: [{ path: '*', element: <Profile /> }],
        },
        {
          path: 'search',
          element: <Search />,
        },
        {
          path: 'followers',
          children: [{ path: '*', element: <Followers /> }],
        },
        {
          path: 'followings',
          children: [{ path: '*', element: <Followings /> }],
        },
        {
          path: 'post',
          children: [{ path: '*', element: <PostDetail /> }],
        },
        {
          path: '*',
          element: <Home />,
        },
      ],
    },
  ]);
};

const NotConnectedRoutes = () => {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: '',
          element: <Navigate to={'/home'} />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'create',
          element: <Navigate to={'/connect'} />,
        },
        {
          path: 'connect',
          element: <ConnectWallet />,
        },
        {
          path: 'profile',
          children: [{ path: '*', element: <Profile /> }],
        },
        {
          path: 'search',
          element: <Search />,
        },
        {
          path: 'followers',
          children: [{ path: '*', element: <Followers /> }],
        },
        {
          path: 'followings',
          children: [{ path: '*', element: <Followings /> }],
        },
        {
          path: 'post',
          children: [{ path: '*', element: <PostDetail /> }],
        },
        {
          path: '*',
          element: <Home />,
        },
      ],
    },
  ]);
};

const Index = () => {
  const { account, library, active } = useWeb3React();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const instance = useAppSelector(state => state.contractReducer.instance);

  const getSignature = async () => {
    if (library && account && active) {
      const timeConstant = 86400;

      const time = Math.floor(Math.floor(Date.now() / 1000) / timeConstant);
      const hash = keccak256(time.toString()).toString('hex');

      const web3 = new Web3(library.currentProvider);

      const signedMessage = await web3.eth.personal.sign(hash, account, '');

      dispatch({
        type: 'SET_WALLET_ADDRESS',
        payload: account,
      });
      dispatch({
        type: 'SET_SIGNATURE',
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
        navigate('/register');
      } else {
        dispatch({
          type: 'SET_USER',
          payload: {
            username,
            displayName: '',
          },
        });
      }
    }
  };

  useEffect(() => {
    if (active) {
      initializeContract(library, () => {
        dispatch({
          type: 'SET_INSTANCE',
          payload: true,
        });
      });
    }
  }, [active, library]);

  useEffect(() => {
    if (account && instance && active && library) {
      redirect();
    }
  }, [account, instance, active, library]);

  return (
    <div>
      {/* <CustomModal open={true} handleClose={() => {}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
          }}>
          <FeedbackOutlinedIcon style={{ height: 100, width: 100 }} />
          <p>Changes will take 30 seconds to reflect</p>
        </div>
        <Button
          style={{
            width: '90%',
            marginTop: 'auto',
            marginBottom: 20,
          }}
          onClick={() => {}}>
          Close
        </Button>
      </CustomModal> */}
      {active ? ConnectedRoutes() : NotConnectedRoutes()}
    </div>
  );
};

export default Index;
