import React, { useEffect, useState, useCallback, useContext } from 'react'
import Button from '@mui/material/Button';
import { UserContext } from './userContext';
import { api } from './axios'
import Card from './Card'
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export default function User({ match, history }) {
  const { CONFIG } = useContext(UserContext)
  const myInfoState = useSelector(state => state.myInfoState)

  const [user, setUser] = useState('loading')
  const [userPosts, setUserPosts] = useState('loading')
  const [isFollowed, setFollowed] = useState('')
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSame, setIsSame] = useState(false)


  useEffect(() => {
    GetUser()
    GetUserPosts()

  }, [match.params.name])

  useEffect(() => {
    if (myInfoState.isLogedIn) {
      if (myInfoState.myInfo.username === match.params.name) setIsSame(true)
      myInfoState.myInfo.following.forEach(item => {
        if (item.following_user_id === match.params.name) setFollowed(true);
      });
    }
  }, [myInfoState.myInfo, match.params.name])

  const GetUser = () => {
    api.get(`user/${match.params.name}/`)
      .then(res => {
        setUser(res.data);
      })
  }

  const GetUserPosts = useCallback(async () => {
    let res = await api.get(`posts/`).then(res => res.data)

    const posts = res.filter(function (post) {
      return (
        post.writer === match.params.name
      )
    });
    setUserPosts(posts)
  }, [match.params.name])


  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };
  const follow = (id) => {
    api.patch(`follow/${id}/`, {}, CONFIG)
      .then(() => GetUser())
  }

  const postPerPage = 10
  const last = page * postPerPage
  const first = last - postPerPage

  const pageCount = Math.ceil(((userPosts !== null && userPosts !== 'loading') && userPosts.length) / postPerPage)

  const handleClick = (event) => {
    if (myInfoState.isLogedIn) {
      if (user && user !== 'loading') {
        follow(user.id)
        setFollowed(!isFollowed)
      } else undefined
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  return (
    <div>

      {user !== 'loading' ?
        <>
          <h1>{user && user.username}</h1>
          <h1>followers :{user && user.followers.length}</h1>
          <h1>following :{user && user.following.length}</h1>
        </> :
        <CircularProgress />}
      {!isSame &&
        <Button aria-describedby={id} onClick={handleClick} variant="contained">
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      }
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>You have to be Loged in to follow someone.</Typography>
      </Popover>
      <br />
      {(userPosts !== null && userPosts !== 'loading') &&
        userPosts.sort((a, b) => {
          return new Date(a.id) - new Date(b.id);
        }).slice(first, last).map((item, i) => <Card
          key={i} post={item}
          from={'user'}
          GetUserPosts={GetUserPosts}
        />)}

      {(userPosts === 'loading') ?
        <LinearProgress sx={{ marginTop: '10%' }} /> :
        <Pagination size='large' count={pageCount} page={page} onChange={handleChange} />}
    </div>
  )
}
