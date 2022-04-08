import { useEffect, useState } from "react";
import axios from "axios";
import { alpha, styled } from "@mui/material";

import Post, { SinglePost } from "../../components/Post/index";
import Header from "../../components/Header/index";
import FloatingActionButton from "../../components/FloatingActionButton";
import SearchButton from "../../components/SearchButton";

import { useAppSelector } from "../../hooks";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";

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
  width: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "100px 0px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "90px 10px",
  },
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "center",
}));

const getSkeleton = () => {
  return (
    <>
      <br />
      <PostSkeleton />
      <br />
      <PostSkeleton />
      <br />
      <PostSkeleton />
      <br />
      <PostSkeleton />
    </>
  );
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<SinglePost[]>([]);

  const getPosts = async () => {
    setLoading(true);
    await axios({
      url: `https://rocky-peak-62606.herokuapp.com/posts/getPosts`,
      method: "get",
    }).then((response) => {
      if (response?.data) {
        setPosts(response.data.sort((a, b) => Number(b._id) - Number(a._id)));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Body>
      <Header />
      <MainDiv>
        {loading
          ? getSkeleton()
          : posts.map((item, i) => <Post key={i} post={item} />)}
      </MainDiv>
      <SearchButton />
      <FloatingActionButton />
    </Body>
  );
}