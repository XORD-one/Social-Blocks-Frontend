/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from "@mui/system";
import { alpha } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header/index";
import Profile from "../../components/Profile/index";
import axios from "axios";
import PostDetailsSkeleton from "../../components/Skeletons/PostDetailsSkeleton/index";
import { useAppSelector } from "../../hooks";
import CustomModal from "../../components/CustomModal";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { CONTRACT_ADDRESS } from "../../contract/constants";
import contractAbi from "../../contract/contractAbi.json";

const Body = styled("div")(({ theme }) => ({
  width: "100vw",
  maxHeight: "100vh",
  overflowY: "auto",

  "::-webkit-scrollbar": {
    width: "13px",
    //@ts-ignore
    background: alpha(theme.palette.primary.main, 0.1),
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "3px",
    //@ts-ignore
    background: theme.palette.primary.main,
    height: "150px",
  },

  //@ts-ignore
  [theme.breakpoints.down("sm")]: {
    "::-webkit-scrollbar": {
      width: "13px",
      //@ts-ignore
      background: alpha(theme.palette.primary.main, 0.1),
      display: "none",
    },
  },
}));

const MainContainer = styled("div")(({ theme }) => ({
  width: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "100px 0px",

  //@ts-ignore
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "90px 10px",
  },
}));

const MainDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  marginLeft: "auto",
  marginRight: "auto",
  margin: "15px 0px",
  borderRadius: "9px",
  //@ts-ignore
  [theme.breakpoints.down("sm")]: {},
}));

const PostContent = styled("img")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  boxShadow: "0 0 1rem 0 " + alpha("#000", 0.2),
  //@ts-ignore
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "8px",
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "500",
  //@ts-ignore
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "15px",
}));

const InfoContainer = styled("div")(({ theme }) => ({
  width: "100%",
  //@ts-ignore
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  margin: "20px 0px",
  padding: "8px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-around",
}));

const InfoTab = styled("div")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "800",
  width: "100px",
  margin: "10px 0px",
}));

const Input = styled("input")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "400",
  //@ts-ignore
  color: theme.palette.text.primary,
  margin: "5px 0px",
  marginTop: "0px",
  padding: "9px 18px",
  width: "100%",
  //@ts-ignore
  backgroundColor: theme.palette.background.paper,
  //@ts-ignore
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "5px",
}));

const TextArea = styled("textarea")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "400",
  //@ts-ignore
  color: theme.palette.text.primary,
  margin: "5px 0px",
  marginTop: "0px",
  padding: "9px 18px",
  width: "100%",
  //@ts-ignore
  backgroundColor: theme.palette.background.paper,
  //@ts-ignore
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  borderRadius: "5px",
  overflowY: "auto",
  resize: "vertical",
  minHeight: "100px",

  "::-webkit-scrollbar": {
    width: "5px",
    //@ts-ignore
    background: alpha(theme.palette.primary.main, 0.1),
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "5px",
    //@ts-ignore
    background: theme.palette.primary.main,
  },
}));

const CommentBody = styled("div")(({ theme }) => ({
  padding: "5px 10px",
  margin: "7px 0px",
  marginBottom: "15px",
  border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "9px",
}));

const CommentText = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  textAlign: "left",
  wordBreak: "break-all",
}));

const CommentUser = styled("div")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "500",
  textAlign: "right",
  cursor: "pointer",
}));

const PostDetail: FC = () => {
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentingModalStatus, setCommentingModalStatus] = useState(false);
  const [postId, setPostId] = useState("");
  const [postDetails, setPostDetails] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const signature = useAppSelector((state) => state.userReducer.signature);
  const walletAddress = useAppSelector(
    (state) => state.userReducer.walletAddress
  );
  const navigate = useNavigate();
  const { account } = useWeb3React();
  const web3Context = useWeb3React();
  const web3 = new Web3(
    "https://rinkeby.infura.io/v3/7c4e9e4322bc446195e561d9ea27d827"
  );
  const [likes, setLikes] = useState<any[]>([]);
  const [biddingTimestamp, setBiddingTimestamp] = useState<any>();
  const [biddingDate, setBiddingDate] = useState<string>("---");
  const [biddingPrice, setBiddingPrice] = useState<any>("---");
  const [biddingAddress, setBiddingAddress] = useState<string>("---");

  const getPostDetails = async () => {
    if (postId !== "") {
      const result = await axios.get(
        "https://socialblocks.herokuapp.com/posts/getSinglePost/" + postId
      );
      setPostDetails(result?.data?._doc);
      setLikes(result?.data?.likesArray);
    }
  };

  const setComment = async () => {
    if (!account) {
      navigate("/connect");
      return;
    }

    if (commentText !== "") {
      setCommentingModalStatus(true);
      let result = await axios.post(
        "https://socialblocks.herokuapp.com/comment/setcomment",
        {
          postId: parseInt(postId),
          comment: commentText,
          userAddress: walletAddress?.toLowerCase(),
          signature,
        }
      );
      setComments([...comments, result?.data?.comment]);
      setCommentText("");
      setCommentingModalStatus(false);
    }
  };

  const getComments = async () => {
    if (postId !== "") {
      const result = await axios.get(
        "https://socialblocks.herokuapp.com/comment/getcomments/" + postId
      );
      setComments(result?.data?.comments);
    }
  };

  const getBiddingDetails = async () => {
    const web3 = new Web3(
      "https://rinkeby.infura.io/v3/7c4e9e4322bc446195e561d9ea27d827"
    );
    const contract = new web3.eth.Contract(
      contractAbi as any,
      CONTRACT_ADDRESS
    );
    const info = await contract.methods.getLastBidInfoById(postId).call();
    let date = new Date(info[2] * 1000);
    let dateArr = date.toDateString().split(" ");
    setBiddingDate(dateArr[2] + " " + dateArr[1] + " " + dateArr[3]);
    if (info[1] == "0") {
      setBiddingPrice(postDetails?.sellValue / 10 ** 18);
    } else {
      setBiddingPrice(info[1]);
    }

    if (parseInt(info[0]) > postDetails.sellValue) {
      setPostDetails((state) => ({
        ...state,
        sellValue: info[0],
      }));
    }
    setBiddingAddress(info[0]);
    setBiddingTimestamp(info[2]);
  };

  useEffect(() => {
    setPostId(window.location.href.split("/")[4]);
  }, []);

  useEffect(() => {
    getPostDetails();
    getComments();
  }, [postId]);

  useEffect(() => {
    if (postDetails?.buyStatus === 1) {
      getBiddingDetails();
    }
  }, [postDetails]);

  return (
    <Body>
      <Header />
      <MainContainer>
        {postDetails ? (
          <MainDiv>
            <Heading style={{ fontWeight: "800" }}>PostId #{postId}</Heading>
            <PostContent src={postDetails?.image} />
            <Heading style={{ marginTop: "10px" }}>{postDetails?.name}</Heading>
            <Heading style={{ fontSize: "20px" }}>
              "{postDetails?.description}"
            </Heading>
            <InfoContainer>
              <InfoTab>
                <div>{likes.length}</div>
                <div style={{ fontSize: "15px", fontWeight: "500" }}>Likes</div>
              </InfoTab>
              <InfoTab>
                <div>{comments.length}</div>
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Comments
                </div>
              </InfoTab>
              <InfoTab>
                <div>{postDetails?.sellValue / 10 ** 18}$</div>
                <div style={{ fontSize: "15px", fontWeight: "500" }}>Value</div>
              </InfoTab>
            </InfoContainer>
            <Heading style={{ marginTop: "10px", textAlign: "left" }}>
              Creator :
            </Heading>
            <Profile
              userName={postDetails?.creator?.userName}
              displayName={postDetails?.creator?.displayName}
              image={postDetails?.creator?.image}
              address={postDetails?.creator?.address}
            />
            <Heading style={{ marginTop: "10px", textAlign: "left" }}>
              Owner :
            </Heading>
            <Profile
              userName={postDetails?.owner?.userName}
              displayName={postDetails?.owner?.displayName}
              image={postDetails?.owner?.image}
              address={postDetails?.owner?.address}
            />
            <Heading
              style={{
                marginTop: "10px",
                textAlign: "left",
                marginBottom: "0px",
              }}
            >
              Status :
            </Heading>
            <Heading
              style={{
                textAlign: "left",
                fontSize: "40px",
                marginTop: "0px",
                fontWeight: "400",
              }}
            >
              &#8226;
              {postDetails?.buyStatus === 0
                ? "Buyable."
                : postDetails?.buyStatus === 1
                ? "Biddable."
                : "Not for sale."}
            </Heading>

            {
              // buy status is buyable
              postDetails?.buyStatus === 0 ? (
                <>
                  <Heading
                    style={{
                      marginTop: "10px",
                      textAlign: "left",
                      marginBottom: "0px",
                    }}
                  >
                    Value :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: "left",
                      fontSize: "40px",
                      marginTop: "0px",
                      fontWeight: "400",
                    }}
                  >
                    &#8226; {postDetails?.sellValue / 10 ** 18}$
                  </Heading>

                  {postDetails.owner.address === account?.toLowerCase() ? (
                    <Button style={{ marginTop: "25px" }}>Change Status</Button>
                  ) : (
                    <Button style={{ marginTop: "25px" }}>Buy</Button>
                  )}
                </>
              ) : // buy status is bidding
              postDetails?.buyStatus === 1 ? (
                <>
                  <Heading
                    style={{
                      marginTop: "10px",
                      textAlign: "left",
                      marginBottom: "0px",
                    }}
                  >
                    Bidding Ends :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: "left",
                      fontSize: "40px",
                      marginTop: "0px",
                      fontWeight: "400",
                    }}
                  >
                    &#8226; {biddingDate}
                  </Heading>
                  <Heading
                    style={{
                      marginTop: "10px",
                      textAlign: "left",
                      marginBottom: "0px",
                    }}
                  >
                    Last Bid :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: "left",
                      fontSize: "40px",
                      marginTop: "0px",
                      fontWeight: "400",
                    }}
                  >
                    &#8226; {biddingPrice}$
                  </Heading>
                  <Heading
                    style={{
                      marginTop: "10px",
                      textAlign: "left",
                      marginBottom: "0px",
                    }}
                  >
                    Last Bidder :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: "left",
                      fontSize: "40px",
                      marginTop: "0px",
                      fontWeight: "400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(
                        `/profile/${
                          biddingAddress !==
                          "0x0000000000000000000000000000000000000000"
                            ? biddingAddress
                            : postDetails.owner.address
                        }`
                      );
                    }}
                  >
                    &#8226;
                    {biddingAddress ===
                    "0x0000000000000000000000000000000000000000"
                      ? postDetails.owner.address.slice(0, 5) +
                        "..." +
                        postDetails.owner.address.slice(37, 43)
                      : biddingAddress.slice(0, 5) +
                        "..." +
                        biddingAddress.slice(37, 43)}
                  </Heading>

                  {postDetails.owner.address !== account?.toLowerCase() ? (
                    <>
                      <Heading
                        style={{
                          marginTop: "10px",
                          textAlign: "left",
                          marginBottom: "0px",
                        }}
                      >
                        Your Bid:
                      </Heading>
                      <Input
                        placeholder="Enter amount"
                        type={"number"}
                        style={{ marginTop: "10px" }}
                      />
                      <Button style={{ marginTop: "25px" }}>Bid</Button>
                    </>
                  ) : Math.floor(Date.now() / 1000) >
                    parseInt(biddingTimestamp) ? (
                    <Button style={{ marginTop: "25px" }}>Claim Bid</Button>
                  ) : null}
                </>
              ) : null
            }
            <div style={{ display: "flex", alignItems: "center" }}>
              <Heading
                style={{
                  marginTop: "10px",
                  textAlign: "left",
                  marginBottom: "0px",
                }}
              >
                Comments :
              </Heading>
              <Heading
                style={{
                  marginTop: "10px",
                  textAlign: "left",
                  marginBottom: "0px",
                  marginLeft: "auto",
                  cursor: "pointer",
                  fontSize: "30px",
                }}
                onClick={() => {
                  setCommentStatus(!commentStatus);
                }}
              >
                {commentStatus ? "-" : "+"}
              </Heading>
            </div>
            {commentStatus ? (
              <>
                <TextArea
                  placeholder="Enter your comment..."
                  style={{ marginTop: "10px" }}
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                />
                <Button
                  style={{ marginTop: "15px" }}
                  onClick={() => {
                    setComment();
                  }}
                >
                  Comment
                </Button>
              </>
            ) : null}

            {comments.length > 0 ? (
              comments.map((comment, i) => {
                return (
                  <CommentBody key={i}>
                    <CommentText>{comment.comment}</CommentText>
                    <CommentUser
                      onClick={() =>
                        navigate(`/profile/${comment.userAddress}`)
                      }
                    >
                      @{comment.userName}
                    </CommentUser>
                  </CommentBody>
                );
              })
            ) : (
              <Heading
                style={{
                  textAlign: "left",
                  fontSize: "40px",
                  marginTop: "0px",
                  fontWeight: "400",
                }}
              >
                &#8226; No Comments.
              </Heading>
            )}

            <CustomModal open={commentingModalStatus} handleClose={() => {}}>
              <Loader />
              <br /> <br />
              <Heading>Adding Comment...</Heading>
            </CustomModal>
          </MainDiv>
        ) : (
          <MainDiv>
            <PostDetailsSkeleton />
          </MainDiv>
        )}
      </MainContainer>
    </Body>
  );
};

export default PostDetail;
