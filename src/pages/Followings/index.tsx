/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { alpha, styled } from "@mui/material";
import Header from "../../components/Header/index";
import ProfileSkeleton from "../../components/Skeletons/ProfileSkeleton";
import Profile from "../../components/Profile";

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
  width: "500px",
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
      <ProfileSkeleton />
      <br />
      <ProfileSkeleton />
      <br />
      <ProfileSkeleton />
      <br />
      <ProfileSkeleton />
    </>
  );
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  let [searchedUsers, setSearchedUsers] = useState<any[]>([]);
  const [address, setAddress] = useState<any>("");
  const [user, setUser] = useState<any>();

  const getAllUsers = async () => {
    setLoading(true);
    await axios({
      url: `https://socialblocks.herokuapp.com/users/getFollowing/${address}`,
      method: "get",
    }).then((response) => {
      if (response?.data) {
        setAllUsers(response.data.data);
        setSearchedUsers(response.data.data);
        setUser(response?.data?.user);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  };

  useEffect(() => {
    setAddress(window.location.href.split("/")[4]);
  }, []);

  useEffect(() => {
    if (address !== "") {
      getAllUsers();
    }
  }, [address]);

  useEffect(() => {
    setLoading(true);
    let users: any[] = [];
    setSearchedUsers([...users]);
    allUsers.forEach((e) => {
      if (
        e.displayName.toLowerCase().includes(searchValue.toLowerCase()) ||
        e.userName.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        users = [...users, e];
      }
    });
    setSearchedUsers(users);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [searchValue]);

  return (
    <Body>
      <Header
        isSearchPage={true}
        setSearchValue={setSearchValue}
        followPage={true}
      />
      <MainDiv>
        {loading ? (
          getSkeleton()
        ) : searchedUsers.length === 0 ? (
          <Heading style={{ marginTop: "30px" }}>No User Found.</Heading>
        ) : (
          <>
            <Heading style={{ marginTop: "30px" }}>
              {user ? user?.displayName + "'s followings" : "Loading..."}
            </Heading>
            {searchedUsers?.map((item, i) => (
              <Profile
                key={i}
                image={item.image}
                displayName={item.displayName}
                userName={item.userName}
                address={item.address}
              />
            ))}
          </>
        )}
      </MainDiv>
    </Body>
  );
}
