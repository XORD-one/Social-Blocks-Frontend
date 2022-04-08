/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
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
          path: "create",
          element: <CreatePost />,
        },
        {
          path: "connect",
          element: <ConnectWallet />,
        },
        {
          path: "register",
          element: <Register />,
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
          path: "post",
          children: [{ path: "*", element: <PostDetail /> }],
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
          path: "register",
          element: <Register />,
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
          path: "post",
          children: [{ path: "*", element: <PostDetail /> }],
        },
      ],
    },
  ]);
};

const Index = () => {
  const web3React = useWeb3React();
  const dispatch = useDispatch();

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

  return web3React.active ? ConnectedRoutes() : NotConnectedRoutes();
};

export default Index;
