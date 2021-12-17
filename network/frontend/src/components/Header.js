import React, { useContext, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { useSnackbar } from 'notistack';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { api } from './axios'

import ListItem from "@mui/material/ListItem";
import { UserContext } from './userContext'

let navigationLinks = [];


const avatarStyle = {
  marginRight: "auto",
  color: "white",
  backgroundColor: "black",
  borderRadius: 0,
  height: 30,
  width: 100,
  border: "2px solid gray",
  borderLeft: "12px solid transparent",
  borderRight: "12px solid transparent"
}

const linkStyle = {
  marginLeft: 20
}

export default function Header() {
  const { state, CONFIG, dispatch } = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();

  const logout = () => {
    api.post(`logout/`, {}, CONFIG)
      .then(() => {
        dispatch({ type: 'NotLogedIn' })
        enqueueSnackbar('Loged out!', { variant: 'info' });

      })
  }

  if (state.isLogedIn) {
    navigationLinks = [
      { name: state.myInfo.username, href: `/profile/${state.myInfo.username}` },
      { name: "All Posts", href: "/" },
      { name: "Following", href: "/following" },
      { name: "Log out", href: "/" },
    ]
  } else {
    navigationLinks = [
      { name: "All Posts", href: "/" },
      { name: "Log In", href: "/login" },
      { name: "Register", href: "/register" },
    ]
  }
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="md">

        <ToolBar disableGutters>

          <Avatar style={avatarStyle}>Network</Avatar>
          {state.infoIsLoading ?
            <Skeleton width={300} height={80} /> :

            <Hidden mdDown>

              {navigationLinks.map((item) => (

                <Link
                  to={item.href}
                  key={item.name}
                >
                  <Button
                    style={linkStyle}
                    color="textPrimary"
                    variant="button"
                    underline="none"
                    onClick={item.name === 'Log out' ? logout : undefined}
                  >
                    {item.name}
                  </Button>
                </Link>


              ))}
            </Hidden>


          }

          <Hidden mdUp>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </ToolBar>
      </Container>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div
          onClick={() => setOpen(false)}
          onKeyPress={() => setOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navigationLinks.map((item) => (
            <ListItem key={item.name}>
              <Link to={item.href}>
                <Button
                  style={linkStyle}
                  color="textPrimary"
                  variant="button"
                  underline="none"
                  onClick={item.name === 'Log out' ? logout : undefined}
                >
                  {item.name}
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}
