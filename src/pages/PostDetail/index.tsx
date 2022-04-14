/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { styled, alpha } from '@mui/system';
import { FC, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header/index';
import Profile from '../../components/Profile/index';
import axios from 'axios';
import PostDetailsSkeleton from '../../components/Skeletons/PostDetailsSkeleton/index';
import { useAppSelector } from '../../hooks';
import CustomModal from '../../components/CustomModal';
import CustomFormModal from '../../components/CustomFormModal';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { CONTRACT_ADDRESS } from '../../contract/constants';
import contractAbi from '../../contract/contractAbi.json';
import ChangeStatusModal from './ChangeStatusModal/index';
import User from '../../components/User';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { injected } from '../../utils/connector';
import { useDispatch } from 'react-redux';

const Body = styled('div')(({ theme }) => ({
  width: '100vw',
  maxHeight: '100vh',
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    width: '13px',
    //@ts-ignore
    background: alpha(theme.palette.primary.main, 0.1),
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '3px',
    //@ts-ignore
    background: theme.palette.primary.main,
    height: '150px',
  },

  //@ts-ignore
  [theme.breakpoints.down('sm')]: {
    '::-webkit-scrollbar': {
      width: '13px',
      //@ts-ignore
      background: alpha(theme.palette.primary.main, 0.1),
      display: 'none',
    },
  },
}));

const MainContainer = styled('div')(({ theme }) => ({
  width: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '100px 0px',

  //@ts-ignore
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '90px 10px',
  },
}));

const MainDiv = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
  marginLeft: 'auto',
  marginRight: 'auto',
  margin: '15px 0px',
  borderRadius: '9px',
  //@ts-ignore
  [theme.breakpoints.down('sm')]: {},
}));

const PostContent = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
  maxHeight: '550px',
  minHeight: '300px',
  objectFit: 'cover',
  boxShadow: '0 0 1rem 0 ' + alpha('#000', 0.2),
  //@ts-ignore
  border: 'solid 3px ' + alpha(theme.palette.text.primary, 0.5),
  borderRadius: '8px',
}));

const Heading = styled('div')(({ theme }) => ({
  fontSize: '25px',
  fontWeight: '500',
  //@ts-ignore
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: '15px',
}));

const InfoContainer = styled('div')(({ theme }) => ({
  width: '100%',
  //@ts-ignore
  border: 'solid 3px ' + alpha(theme.palette.text.primary, 0.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  margin: '20px 0px',
  padding: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
}));

const InfoTab = styled('div')(({ theme }) => ({
  fontSize: '25px',
  fontWeight: '800',
  width: '100px',
  margin: '10px 0px',
}));

const Input = styled('input')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '400',
  //@ts-ignore
  color: theme.palette.text.primary,
  margin: '5px 0px',
  marginTop: '0px',
  padding: '9px 18px',
  width: '100%',
  //@ts-ignore
  backgroundColor: theme.palette.background.paper,
  //@ts-ignore
  border: 'solid 3px ' + alpha(theme.palette.text.primary, 0.5),
  borderRadius: '5px',
}));

const TextArea = styled('textarea')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '400',
  //@ts-ignore
  color: theme.palette.text.primary,
  margin: '5px 0px',
  marginTop: '0px',
  padding: '9px 18px',
  width: '100%',
  //@ts-ignore
  backgroundColor: theme.palette.background.paper,
  //@ts-ignore
  border: 'solid 3px ' + alpha(theme.palette.text.primary, 0.5),
  borderRadius: '5px',
  overflowY: 'auto',
  resize: 'vertical',
  minHeight: '100px',

  '::-webkit-scrollbar': {
    width: '5px',
    //@ts-ignore
    background: alpha(theme.palette.primary.main, 0.1),
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '5px',
    //@ts-ignore
    background: theme.palette.primary.main,
  },
}));

const HorizontalSlider = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  overflowX: 'auto',
  alignItems: 'center',

  '::-webkit-scrollbar': {
    height: '8px',
    //@ts-ignore
    background: alpha(theme.palette.primary.main, 0.1),
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '5px',
    //@ts-ignore
    background: theme.palette.primary.main,
  },
}));

const CommentBody = styled('div')(({ theme }) => ({
  padding: '5px 10px',
  margin: '7px 0px',
  marginBottom: '15px',
  border: 'solid 3px ' + alpha(theme.palette.text.primary, 0.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '9px',
}));

const CommentText = styled('div')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '500',
  textAlign: 'left',
  wordBreak: 'break-all',
}));

const CommentUser = styled('div')(({ theme }) => ({
  fontSize: '15px',
  fontWeight: '500',
  textAlign: 'right',
  cursor: 'pointer',
}));

const Ring = styled('div')(({ theme }) => ({
  height: '25px',
  width: '25px',
  borderRadius: '100%',
  border: 'solid 4px ' + alpha(theme.palette.text.primary, 0.5),
}));

const HorizontalDivider = styled('div')(({ theme }) => ({
  height: '4px',
  width: '50px',
  backgroundColor: alpha(theme.palette.text.primary, 0.5),
}));

const PostDetail: FC = () => {
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentingModalStatus, setCommentingModalStatus] = useState(false);
  const [buyModalStatus, setBuyModalStatus] = useState(false);
  const [claimModalStatus, setClaimModalStatus] = useState(false);
  const [statusFormModalStatus, setStatusFormModalStatus] = useState(false);
  const [statusModalStatus, setStatusModalStatus] = useState(false);
  const [biddingModalStatus, setBiddingModalStatus] = useState(false);
  const [claimingBidModalStatus, setClaimingBidModalStatus] = useState(false);

  const [postId, setPostId] = useState('');
  const [postDetails, setPostDetails] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [transferHistory, setTransferHistory] = useState<any[]>([]);

  const [commentText, setCommentText] = useState<string>('');
  const signature = useAppSelector(state => state.userReducer.signature);
  const walletAddress = useAppSelector(
    state => state.userReducer.walletAddress,
  );
  const navigate = useNavigate();
  const { account, activate } = useWeb3React();
  const web3Context = useWeb3React();
  const dispatch = useDispatch();

  const [likes, setLikes] = useState<any[]>([]);
  const [biddingTimestamp, setBiddingTimestamp] = useState<any>();
  const [biddingDate, setBiddingDate] = useState<Date>();
  const [biddingPrice, setBiddingPrice] = useState<any>('---');
  const [biddingAddress, setBiddingAddress] = useState<string>('---');

  const [claimableAmount, setClaimableAmount] = useState(0);

  const [bidAmmount, setBidAmount] = useState(0);

  const theme = useTheme();
  //@ts-ignore
  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'));

  const getPostDetails = async () => {
    if (postId !== '') {
      const result = await axios.get(
        'https://socialblocks.herokuapp.com/posts/getSinglePost/' + postId,
      );
      const transferResult = await axios.get(
        'https://socialblocks.herokuapp.com/posts/getTransferHistory/' + postId,
      );
      setPostDetails(result?.data?._doc);
      setTransferHistory(transferResult?.data?.usersInOrder);
      setLikes(result?.data?.likesArray);
    }
  };

  const setComment = async () => {
    if (!account) {
      await activate(injected);
      return;
    }

    if (commentText !== '') {
      setCommentingModalStatus(true);
      let result = await axios.post(
        'https://socialblocks.herokuapp.com/comment/setcomment',
        {
          postId: parseInt(postId),
          comment: commentText,
          userAddress: walletAddress?.toLowerCase(),
          signature,
        },
      );
      setComments([...comments, result?.data?.comment]);
      setCommentText('');
      setCommentingModalStatus(false);
    }
  };

  const getComments = async () => {
    if (postId !== '') {
      const result = await axios.get(
        'https://socialblocks.herokuapp.com/comment/getcomments/' + postId,
      );
      setComments(result?.data?.comments);
      if (result?.data?.comments?.length == 0) {
        setCommentStatus(true);
      }
    }
  };

  const getBiddingDetails = async () => {
    const web3 = new Web3(
      'https://rinkeby.infura.io/v3/7c4e9e4322bc446195e561d9ea27d827',
    );
    const contract = new web3.eth.Contract(
      contractAbi as any,
      CONTRACT_ADDRESS,
    );
    const info = await contract.methods.getLastBidInfoById(postId).call();
    let date = new Date(info[2] * 1000);
    setBiddingDate(date);
    if (info[1] == '0') {
      setBiddingPrice(postDetails?.sellValue / 10 ** 18);
    } else {
      setBiddingPrice(info[1] / 10 ** 18);
    }

    if (parseInt(info[0]) > postDetails.sellValue) {
      setPostDetails(state => ({
        ...state,
        sellValue: info[0],
      }));
    }
    setBiddingAddress(info[0]);
    setBiddingTimestamp(info[2]);
  };

  const buy = async () => {
    if (!account) {
      await activate(injected);
      return;
    }
    const web3 = new Web3(web3Context?.library?.currentProvider);
    const contract = new web3.eth.Contract(
      contractAbi as any,
      CONTRACT_ADDRESS,
    );

    setBuyModalStatus(true);

    contract.methods
      .buyPost(postId)
      .send({ from: account, value: postDetails.sellValue })
      .on('transactionHash', hash => {
        console.log('transaction hash: ' + hash);
      })
      .on('confirmation', async function (confirmationNumber) {
        if (confirmationNumber === 1) {
          navigate(`/profile/${account}`);
          setBuyModalStatus(false);
        }
      })
      .on('error', async function (error) {
        setBuyModalStatus(false);
      });
  };

  const claimReward = async () => {
    try {
      setClaimModalStatus(true);
      const web3 = new Web3(web3Context?.library?.currentProvider);
      const contract = new web3.eth.Contract(
        contractAbi as any,
        CONTRACT_ADDRESS,
      );

      const { data } = await axios.post(
        'https://socialblocks.herokuapp.com/likes/getLikesHash',
        {
          signature,
          userAddress: walletAddress,
          likes: likes.length,
        },
      );

      console.log('data =', data);

      await contract.methods
        .claimPostReward(
          parseInt(postId),
          likes.length,
          data.signedObject.signature,
          data.signedObject.messageHash,
        )
        .send({
          from: walletAddress,
        })
        .on('transactionHash', hash => {
          console.log('transaction hash: ' + hash);
        })
        .on('confirmation', confirmationNumber => {
          if (confirmationNumber === 1) {
            console.log('confirmationNumber =', confirmationNumber);
            setClaimModalStatus(false);
          }
        })
        .on('error', async function (error) {
          setClaimModalStatus(false);
        });
    } catch (error) {
      console.log('error -', error);
      setClaimModalStatus(false);
    }
  };

  const changeStatus = async (status, price, bidDuration) => {
    const web3 = new Web3(web3Context?.library?.currentProvider);
    const contract = new web3.eth.Contract(
      contractAbi as any,
      CONTRACT_ADDRESS,
    );

    if (status === '2') {
      price = '1';
    }

    if (status != '' && !isNaN(parseFloat(price)) && parseFloat(price) > 0) {
      setStatusFormModalStatus(false);
      setStatusModalStatus(true);

      var date = new Date();
      date.setDate(date.getDate() + bidDuration);
      console.log('aaa', price);

      contract.methods
        .changePostInfo(
          postId,
          status,
          Web3.utils.toWei(price),
          Math.floor(date.getTime() / 1000).toString(),
        )
        .send({ from: account })
        .on('transactionHash', hash => {
          console.log('transaction hash: ' + hash);
        })
        .on('confirmation', confirmationNumber => {
          if (confirmationNumber === 1) {
            console.log('confirmationNumber =', confirmationNumber);
            setStatusModalStatus(false);
            let id = postId;
            setPostId('0');
            setPostId(id);
            dispatch({ type: 'SET_CHANGES_MODAL_VISIBLE', payload: true });
          }
        })
        .on('error', async function (error) {
          setStatusModalStatus(false);
        });
    }
    // const info = await contract.methods.getLastBidInfoById(postId).call();
  };

  const getClaimableAmount = async () => {
    const web3 = new Web3(
      'https://rinkeby.infura.io/v3/7c4e9e4322bc446195e561d9ea27d827',
    );
    const contract = new web3.eth.Contract(
      contractAbi as any,
      CONTRACT_ADDRESS,
    );
    let likesClaimed = await contract.methods.idToLikes(postId).call();
    setClaimableAmount((likes.length - parseInt(likesClaimed)) * 0.001);
  };

  const bid = async () => {
    if (!account) {
      await activate(injected);
      return;
    }
    const web3 = new Web3(web3Context?.library?.currentProvider);
    const contract = new web3.eth.Contract(
      contractAbi as any,
      CONTRACT_ADDRESS,
    );

    if (!isNaN(bidAmmount) && bidAmmount > parseFloat(biddingPrice)) {
      setBiddingModalStatus(true);

      contract.methods
        .bid(postId)
        .send({
          from: account,
          value: web3.utils.toWei(bidAmmount.toString(), 'ether'),
        })
        .on('transactionHash', hash => {
          console.log('transaction hash: ' + hash);
        })
        .on('confirmation', async function (confirmationNumber) {
          if (confirmationNumber === 1) {
            setBiddingModalStatus(false);
          }
        })
        .on('error', async function (error) {
          setBiddingModalStatus(false);
        });
    }
  };

  const claimBid = async () => {
    if (!account) {
      await activate(injected);
      return;
    }
    const web3 = new Web3(web3Context?.library?.currentProvider);
    const contract = new web3.eth.Contract(
      contractAbi as any,
      CONTRACT_ADDRESS,
    );

    setClaimingBidModalStatus(true);

    contract.methods
      .claimBid(postId)
      .send({
        from: account,
      })
      .on('transactionHash', hash => {
        console.log('transaction hash: ' + hash);
      })
      .on('confirmation', async function (confirmationNumber) {
        if (confirmationNumber === 1) {
          setClaimingBidModalStatus(false);
        }
      })
      .on('error', async function (error) {
        setClaimingBidModalStatus(false);
      });
  };

  useEffect(() => {
    setPostId(window.location.href.split('/')[4]);
  }, []);

  useEffect(() => {
    if (postId != '0') {
      getPostDetails();
      getComments();
    }
  }, [postId]);

  useEffect(() => {
    if (postDetails?.buyStatus === 1) {
      getBiddingDetails();
    }
  }, [postDetails]);

  useEffect(() => {
    if (likes.length > 0) {
      getClaimableAmount();
    }
  }, [likes]);

  return (
    <Body>
      <Header />
      <MainContainer>
        {postDetails ? (
          <MainDiv>
            <Heading style={{ fontWeight: '800', fontSize: '30px' }}>
              PostId#{postId}
            </Heading>
            <PostContent src={postDetails?.image} />
            <Heading style={{ marginTop: '10px', fontWeight: '700' }}>
              {postDetails?.name}
            </Heading>
            <Heading style={{ fontSize: '20px' }}>
              "{postDetails?.description}"
            </Heading>
            <InfoContainer>
              <InfoTab>
                <div>{likes.length}</div>
                <div style={{ fontSize: '15px', fontWeight: '500' }}>Likes</div>
              </InfoTab>
              <InfoTab>
                <div>{comments.length}</div>
                <div style={{ fontSize: '15px', fontWeight: '500' }}>
                  Comments
                </div>
              </InfoTab>
              <InfoTab>
                <div>
                  {postDetails.buyStatus == 0 ? (
                    <>{postDetails?.sellValue / 10 ** 18}Ξ</>
                  ) : postDetails.buyStatus == 1 ? (
                    <>{biddingPrice}Ξ</>
                  ) : (
                    <>NFS</>
                  )}
                </div>
                <div style={{ fontSize: '15px', fontWeight: '500' }}>Value</div>
              </InfoTab>
            </InfoContainer>
            {postDetails?.owner?.address === account?.toLowerCase() ? (
              <>
                <Heading style={{ marginBottom: '10px', marginTop: '30px' }}>
                  Reward :&nbsp;
                  <span
                    style={{ fontWeight: '700', cursor: 'pointer' }}
                    title={claimableAmount + ' Social Blocks Token'}>
                    {claimableAmount + ' '}
                    &nbsp;SBT
                  </span>
                </Heading>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <a
                    href="https://rinkeby.etherscan.io/address/0xcfb6f890d0a605a3e0b767b0ce32fad25ec96de8"
                    target={'_blank'}
                    style={{
                      fontWeight: '700',
                      textDecoration: 'none',
                      //@ts-ignore
                      color: theme.palette.text.primary,
                    }}
                    rel="noreferrer">
                    Social Blocks Token (SBT)
                  </a>
                  &nbsp;
                  <IosShareIcon
                    style={{ transform: 'rotate(90deg)' }}
                    onClick={() => {
                      window.open(
                        'https://rinkeby.etherscan.io/address/0xcfb6f890d0a605a3e0b767b0ce32fad25ec96de8',
                        '_blank',
                      );
                    }}
                  />
                </div>
                <Button
                  onClick={() => claimReward()}
                  style={{ marginTop: '25px' }}>
                  Claim Reward
                </Button>
              </>
            ) : null}
            <Heading style={{ marginTop: '10px', textAlign: 'left' }}>
              Creator :
            </Heading>
            <Profile
              userName={postDetails?.creator?.userName}
              displayName={postDetails?.creator?.displayName}
              image={postDetails?.creator?.image}
              address={postDetails?.creator?.address}
            />
            <Heading style={{ marginTop: '10px', textAlign: 'left' }}>
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
                marginTop: '10px',
                textAlign: 'left',
                marginBottom: '0px',
              }}>
              Status :
            </Heading>
            <Heading
              style={{
                textAlign: 'left',
                fontSize: '40px',
                marginTop: '0px',
                fontWeight: '400',
              }}>
              &#8226;
              {postDetails?.buyStatus === 0
                ? 'Buyable.'
                : postDetails?.buyStatus === 1
                ? 'Biddable.'
                : 'Not for sale.'}
            </Heading>
            {
              // buy status is buyable
              postDetails?.buyStatus === 0 ? (
                <>
                  <Heading
                    style={{
                      marginTop: '10px',
                      textAlign: 'left',
                      marginBottom: '0px',
                    }}>
                    Value :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: 'left',
                      fontSize: '40px',
                      marginTop: '0px',
                      fontWeight: '400',
                    }}>
                    {postDetails.buyStatus == 0 ? (
                      <>&#8226; {postDetails?.sellValue / 10 ** 18}Eth</>
                    ) : postDetails.buyStatus == 1 ? (
                      <>&#8226; {postDetails?.sellValue / 10 ** 18}Eth</>
                    ) : (
                      <>&#8226; Not For Sale.</>
                    )}
                  </Heading>

                  {postDetails.owner.address === account?.toLowerCase() ? (
                    <Button
                      style={{ marginTop: '25px' }}
                      onClick={() => {
                        setStatusFormModalStatus(true);
                      }}>
                      Change Status &#38; Price
                    </Button>
                  ) : (
                    <Button
                      style={{ marginTop: '25px' }}
                      onClick={() => {
                        buy();
                      }}>
                      Buy
                    </Button>
                  )}
                </>
              ) : // buy status is bidding
              postDetails?.buyStatus === 1 ? (
                <>
                  <Heading
                    style={{
                      marginTop: '10px',
                      textAlign: 'left',
                      marginBottom: '0px',
                    }}>
                    Bidding Ends :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: 'left',
                      fontSize: '33px',
                      marginTop: '0px',
                      fontWeight: '400',
                    }}>
                    &#8226; {biddingDate?.toDateString()}
                    {isMobile ? <br /> : <>&nbsp;</>}
                    (&nbsp;
                    {biddingDate?.getHours() + 'h : '}
                    {biddingDate?.getHours() + 'm : '}
                    {biddingDate?.getSeconds() + 's'}&nbsp;)
                  </Heading>
                  <Heading
                    style={{
                      marginTop: '10px',
                      textAlign: 'left',
                      marginBottom: '0px',
                    }}>
                    Last Bid :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: 'left',
                      fontSize: '40px',
                      marginTop: '0px',
                      fontWeight: '400',
                    }}>
                    &#8226; {biddingPrice} Eth
                  </Heading>
                  <Heading
                    style={{
                      marginTop: '10px',
                      textAlign: 'left',
                      marginBottom: '0px',
                    }}>
                    Last Bidder :
                  </Heading>
                  <Heading
                    style={{
                      textAlign: 'left',
                      fontSize: '40px',
                      marginTop: '0px',
                      fontWeight: '400',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      navigate(
                        `/profile/${
                          biddingAddress !==
                          '0x0000000000000000000000000000000000000000'
                            ? biddingAddress
                            : postDetails.owner.address
                        }`,
                      );
                    }}>
                    &#8226;
                    {biddingAddress ===
                    '0x0000000000000000000000000000000000000000'
                      ? postDetails.owner.address.slice(0, 7) +
                        '...' +
                        postDetails.owner.address.slice(37, 43)
                      : biddingAddress.slice(0, 5) +
                        '...' +
                        biddingAddress.slice(37, 43)}
                  </Heading>

                  {postDetails.owner.address !== account?.toLowerCase() ? (
                    <>
                      <Heading
                        style={{
                          marginTop: '10px',
                          textAlign: 'left',
                          marginBottom: '0px',
                        }}>
                        Your Bid (Eth) :
                      </Heading>
                      <Input
                        placeholder="Enter amount"
                        type={'number'}
                        style={{ marginTop: '10px' }}
                        onChange={e => {
                          setBidAmount(parseFloat(e.target.value));
                        }}
                      />
                      <Button
                        style={{ marginTop: '25px' }}
                        onClick={() => {
                          bid();
                        }}>
                        Bid
                      </Button>
                    </>
                  ) : Math.floor(Date.now() / 1000) >
                    parseInt(biddingTimestamp) ? (
                    <Button
                      style={{ marginTop: '25px' }}
                      onClick={() => {
                        claimBid();
                      }}>
                      Claim Bid
                    </Button>
                  ) : (
                    <Button style={{ marginTop: '25px', opacity: '0.3' }}>
                      Claim Bid
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {postDetails.owner.address === account?.toLowerCase() ? (
                    <Button
                      style={{ marginTop: '25px' }}
                      onClick={() => {
                        setStatusFormModalStatus(true);
                      }}>
                      Change Status &#38; Price
                    </Button>
                  ) : null}
                </>
              )
            }
            <br />
            <Heading
              style={{
                marginTop: '10px',
                textAlign: 'left',
                marginBottom: '0px',
              }}>
              Transfer history :
            </Heading>
            <HorizontalSlider>
              <div>
                <Ring />
              </div>

              <div>
                <HorizontalDivider />
              </div>

              {transferHistory.map(e => {
                return (
                  <>
                    <User
                      userName={e?.userName}
                      displayName={e?.displayName}
                      image={e?.image}
                      address={e?.address}
                    />
                    <div>
                      <HorizontalDivider />
                    </div>
                  </>
                );
              })}

              <div>
                <Ring />
              </div>
            </HorizontalSlider>
            <br />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Heading
                style={{
                  marginTop: '10px',
                  textAlign: 'left',
                  marginBottom: '0px',
                }}>
                Comments :
              </Heading>
              <Heading
                style={{
                  marginTop: '10px',
                  textAlign: 'left',
                  marginBottom: '0px',
                  marginLeft: 'auto',
                  cursor: 'pointer',
                  fontSize: '30px',
                }}
                onClick={() => {
                  setCommentStatus(!commentStatus);
                }}>
                {commentStatus ? '-' : '+'}
              </Heading>
            </div>
            {commentStatus ? (
              <>
                <TextArea
                  placeholder="Enter your comment..."
                  style={{ marginTop: '10px' }}
                  value={commentText}
                  onChange={e => {
                    setCommentText(e.target.value);
                  }}
                />
                <Button
                  style={{ marginTop: '15px' }}
                  onClick={() => {
                    setComment();
                  }}>
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
                      }>
                      @{comment.userName}
                    </CommentUser>
                  </CommentBody>
                );
              })
            ) : (
              <Heading
                style={{
                  textAlign: 'left',
                  fontSize: '40px',
                  marginTop: '0px',
                  fontWeight: '400',
                }}>
                &#8226; No Comments.
              </Heading>
            )}
            <CustomModal open={commentingModalStatus} handleClose={() => {}}>
              <Loader />
              <br /> <br />
              <Heading>Adding Comment...</Heading>
            </CustomModal>
            <CustomModal open={buyModalStatus} handleClose={() => {}}>
              <Loader />
              <br /> <br />
              <Heading>Buying Post...</Heading>
            </CustomModal>
            <CustomModal open={claimModalStatus} handleClose={() => {}}>
              <Loader />
              <br /> <br />
              <Heading>Claming Reward...</Heading>
            </CustomModal>
            <CustomFormModal
              open={statusFormModalStatus}
              handleClose={() => {
                setStatusFormModalStatus(false);
              }}>
              <ChangeStatusModal
                title={postDetails?.name}
                description={postDetails?.description}
                changeStatus={changeStatus}
              />
            </CustomFormModal>
            <CustomModal open={statusModalStatus} handleClose={() => {}}>
              <Loader />
              <br /> <br />
              <Heading>Changing Status...</Heading>
            </CustomModal>
            <CustomModal open={biddingModalStatus} handleClose={() => {}}>
              <Loader />
              <br /> <br />
              <Heading>Bidding...</Heading>
            </CustomModal>
            <CustomModal open={claimingBidModalStatus} handleClose={() => {}}>
              <Loader />
              <br /> <br />
              <Heading>Claming...</Heading>
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
