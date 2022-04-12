/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material";
import { useTheme } from "@emotion/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useAppSelector } from "../../hooks";
import { useMediaQuery } from "@mui/material";
import Transparent from "../../assets/transparent.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";

const MainDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  marginLeft: "auto",
  marginRight: "auto",
  margin: "15px 0px",
  backgroundColor: theme.palette.background.paper,
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "9px",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),

  [theme.breakpoints.down("sm")]: {},
}));

const PostHeader = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  padding: "11px",
  alignItems: "center",
}));

const PostPicture = styled("img")(({ theme }) => ({
  width: "55px",
  height: "55px",
  objectFit: "cover",
  borderRadius: "40px",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  cursor: "pointer",
}));

const PostDisplayname = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "left",
  marginLeft: "15px",
  cursor: "pointer",
  wordBreak: "break-all",
}));

const PostUsername = styled("div")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "left",
  marginLeft: "15px",
  cursor: "pointer",
  wordBreak: "break-all",
}));

const PostDescription = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.text.primary,
  textAlign: "left",
  margin: "0px 15px",
  cursor: "pointer",
  marginBottom: "10px",
  wordBreak: "break-all",
}));

const PostContent = styled("img")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  maxHeight: "450px",
  minHeight: "300px",
  objectFit: "cover",
  backgroundColor: theme.palette.background.paper,
  overflow: "hidden",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  borderTop: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderBottom: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  cursor: "pointer",
}));

const PostBottom = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  padding: "3px 15px",
  paddingBottom: "0px",
  alignItems: "center",
}));

const PostLikeCount = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  marginLeft: "10px",
}));

const PostBuy = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  marginLeft: "auto",
  backgroundColor: theme.palette.background.default,
  padding: "0px 7px",
  borderRadius: "9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
}));

type Props = {
  post: SinglePost;
};

export interface User {
  id: string;
  address: string;
  userName: string;
  displayName: string;
  bio: string;
  image: string;
}

export interface SinglePost {
  _id: string;
  creator: User;
  owner: User;
  name: string;
  description: string;
  buyStatus: number;
  sellValue: number;
  image: string;
  transferHistory: any[];
  createdAt: string;
  updatedAt: string;
  likesArray: string[];
}

const Post: React.FC<Props> = (props) => {
  const [likeStatus, setLikeStatus] = React.useState(false);
  const [postLikes, setPostLikes] = React.useState<any>(
    props.post.likesArray?.length
  );
  const { account } = useWeb3React();
  const theme = useTheme();
  //@ts-ignore
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const signature = useAppSelector((state) => state.userReducer.signature);
  const walletAddress = useAppSelector(
    (state) => state.userReducer.walletAddress
  );

  useEffect(() => {
    if (account && props?.post?.likesArray?.includes(account)) {
      setLikeStatus(true);
    }
  }, [props.post.likesArray, account]);

  const handleLike = async () => {
    if (!signature && !walletAddress) {
      navigate("/connect");
      return;
    }

    await axios.post("https://socialblocks.herokuapp.com/likes/setLikes", {
      postId: props.post._id,
      postUserAddress: props.post.owner.id,
      userAddress: walletAddress,
      signature,
    });
  };

  if (!props.post.owner?.id) return null;

  return (
    <MainDiv>
      <PostHeader>
        <PostPicture
          onClick={() => navigate(`/profile/${props.post.owner.id}`)}
          src={props.post.owner.image}
        />
        <div>
          <PostDisplayname
            onClick={() => navigate(`/profile/${props.post.owner.id}`)}
          >
            {props.post.owner.displayName}
          </PostDisplayname>
          <PostUsername
            onClick={() => navigate(`/profile/${props.post.owner.id}`)}
          >
            @{props.post.owner.userName}
          </PostUsername>
        </div>
        <MoreVertIcon
          style={{
            marginLeft: "auto",
            height: "40px",
            width: "40px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/post/${props.post._id}`)}
        />
      </PostHeader>
      <div style={{ position: "relative" }}>
        <PostContent
          src={props.post.image}
          onClick={() => navigate(`/post/${props.post._id}`)}
        />
        {props.post.owner.id !== props.post.creator.id ? (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "10px",
              padding: isMobile ? "3px" : "3px",
              //@ts-ignore
              border: "solid 3px " + theme.palette.background.paper,
              //@ts-ignore
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
              borderRadius: "25px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/profile/${props.post.creator.id}`)}
          >
            {!isMobile ? (
              <img
                src={props.post.creator.image}
                style={{
                  backgroundSize: "cover",
                  height: "40px",
                  width: "40px",
                  borderRadius: "100%",
                  objectFit: "cover",
                  //@ts-ignore
                  border: "solid 3px " + theme.palette.background.paper,
                }}
              />
            ) : null}
            &nbsp;
            <span
              style={{
                //@ts-ignore
                color: theme.palette.primary.main,
                opacity: "0.7",
                fontSize: isMobile ? "15px" : "20px",
                fontWeight: "500",
              }}
            >
              @{props.post.creator.userName}
            </span>
            &nbsp;
          </div>
        ) : null}
      </div>
      <PostBottom>
        {likeStatus ? (
          <FavoriteIcon
            style={{
              //@ts-ignore
              fill: theme?.palette?.primary?.main,
              cursor: "pointer",
            }}
          />
        ) : (
          <FavoriteIcon
            style={{
              //@ts-ignore
              cursor: "pointer",
            }}
            onClick={() => {
              setLikeStatus(true);
              setPostLikes(postLikes + 1);
              handleLike();
            }}
          />
        )}
        <PostLikeCount>{postLikes}</PostLikeCount>
        {props.post.buyStatus === 2 ? (
          <PostBuy onClick={() => navigate(`/post/${props.post._id}`)}>
            NFS
          </PostBuy>
        ) : props.post.buyStatus === 1 ? (
          <PostBuy onClick={() => navigate(`/post/${props.post._id}`)}>
            Bidding
          </PostBuy>
        ) : (
          <PostBuy onClick={() => navigate(`/post/${props.post._id}`)}>
            {props.post.sellValue / 10 ** 18} Ξ
          </PostBuy>
        )}
        &nbsp; &nbsp;
        <ReplyIcon
          style={{
            height: "30px",
            width: "30px",
            transform: "rotateY(180deg)",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/post/${props.post._id}`)}
        />
      </PostBottom>
      <PostDescription
        style={{
          fontWeight: "500",
          margin: "0px 15px",
          flex: 1,
        }}
      >
        {props.post.name}
      </PostDescription>
      <PostDescription
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "17px",
        }}
      >
        {props.post.description}
      </PostDescription>
    </MainDiv>
  );
};

export default Post;
