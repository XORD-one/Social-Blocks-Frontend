/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import ConnectWallet from "../pages/ConnectWallet";
import CreatePost from "../pages/CreatePost";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { initializeContract } from "../utils/contractMethods";
import Search from "../pages/Search";
import PostDetail from "../pages/PostDetail";
import Followers from "../pages/Followers";
import Followings from "../pages/Followings";
import keccak from "keccak256";
import Web3 from "web3";
import { isAddressReserved } from "../utils/contractMethods";

const ConnectedRoutes = () => {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Navigate to={"/home"} />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "create",
          element: <CreatePost />,
        },
        {
          path: "connect",
          element: <ConnectWallet />,
        },
        {
          path: "profile",
          children: [{ path: "*", element: <Profile /> }],
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "followers",
          children: [{ path: "*", element: <Followers /> }],
        },
        {
          path: "followings",
          children: [{ path: "*", element: <Followings /> }],
        },
        {
          path: "post",
          children: [{ path: "*", element: <PostDetail /> }],
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
    },
  ]);
};

const NotConnectedRoutes = () => {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Navigate to={"/home"} />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "create",
          element: <Navigate to={"/connect"} />,
        },
        {
          path: "connect",
          element: <ConnectWallet />,
        },
        {
          path: "profile",
          children: [{ path: "*", element: <Profile /> }],
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "followers",
          children: [{ path: "*", element: <Followers /> }],
        },
        {
          path: "followings",
          children: [{ path: "*", element: <Followings /> }],
        },
        {
          path: "post",
          children: [{ path: "*", element: <PostDetail /> }],
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
    },
  ]);
};

const Index = () => {
  const web3React = useWeb3React();
  const { account, deactivate } = useWeb3React();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (web3React.active) {
      initializeContract(web3React.library, () => {
        dispatch({
          type: "SET_INSTANCE",
          payload: true,
        });
      });
    }
  }, [web3React.active, web3React.library]);

  useEffect(() => {
    if (account) {
      navigate("/connect");
    }
  }, [account]);

  return web3React.active ? ConnectedRoutes() : NotConnectedRoutes();
};

export default Index;
