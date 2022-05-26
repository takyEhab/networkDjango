import React, { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { funcContext } from './funcContext';

import { Link } from "react-router-dom";
import { api } from './axios'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';


import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

import Zoom from '@mui/material/Zoom';

const cardStyle = { textAlign: 'center', width: 'auto', margin: 'auto', marginTop: '2%' }

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const generateColor = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export default function RecipeReviewCard(props) {
  const { refresh } = useContext(funcContext)
  const posts = useSelector(state => state.postsState.posts)
  const myInfoState = useSelector(state => state.myInfoState)
  const [isLike, setLike] = useState(null);
  const [edit, setEdit] = useState('')
  const [isErr, setErr] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.post.UsersLikes.includes(myInfoState.isLogedIn && myInfoState.myInfo.id)) {
      setLike(true);
    } else {
      setLike(false)
    }
  }, [myInfoState.isLogedIn, posts])
  const refreshSelected = () => {
    if (props.from === 'main') {
      refresh()
    } else if (props.from === 'following') {
      props.getFollowingPosts()
    } else {
      props.GetUserPosts()
    }
  }
  const like = (id) => {
    api.patch(`posts/${id}/like/`, {}, myInfoState.CONFIG)
      .then(() => refreshSelected())
  }
  const editPost = (post, id) => {
    api.patch(`posts/${id}/`, { post }, myInfoState.CONFIG)
      .then(() => {
        refreshSelected()
        enqueueSnackbar('Post Edited!', { variant: 'info' })
      })
      .catch(() => {
        enqueueSnackbar('Error while editing the post!\n try to Refresh the page and try again', { variant: 'error' })

      })
  }
  const deletePost = (id) => {
    api.delete(`posts/${id}/`, myInfoState.CONFIG)
      .then(() => {
        refreshSelected();
        enqueueSnackbar('Post Deleted!', { variant: 'info' })
      })
      .catch(() => {
        enqueueSnackbar('Error while deleting the post!\n try to Refresh the page and try again', { variant: 'error' })
      })
  }
  const HandleSave = () => {
    if (edit.length > 5) {
      editPost(edit, props.post.id)
      setIsEdit(false);
    } else { setErr(true) }
  }

  const likeFunc = () => {
    if (!myInfoState.isLogedIn) {
      return
    }
    isLike ? setLike(false) : setLike(true);
    like(props.post.id)
  }

  const HandelChange = (event) => {
    setEdit(event.target.value)
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Zoom in={true}>
      <Card style={cardStyle} sx={{ maxWidth: 550 }}>
        <CardHeader
          avatar={
            <Link style={{ textDecoration: 'initial' }} to={`/profile/${props.post.writer}`}>
              <Avatar sx={{ bgcolor: generateColor(props.post.writer) }} aria-label="recipe">
                {props.post.writer.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }

          action={
            myInfoState.isLogedIn && (myInfoState.myInfo.username === props.post.writer ?
              (isEdit ?
                <IconButton onClick={() => setIsEdit(false)} >
                  <ClearIcon />
                </IconButton>
                :
                <IconButton onClick={handleClick} >
                  <MoreVertIcon />
                </IconButton>)
              : '')
          }

          title={props.post.writer}

          subheader={props.post.created_at}
        />
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { setIsEdit(!isEdit); handleClose(); setEdit(props.post.post) }} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>

          <MenuItem onClick={() => { handleClose(); deletePost(props.post.id) }} disableRipple>
            <DeleteIcon />
            Delete
          </MenuItem>
        </StyledMenu>
        <CardContent>
          {isEdit ?
            <>
              <TextField
                id="outlined-multiline-static"
                value={edit}
                multiline
                rows={5}
                style={{ width: '100%', marginTop: '1%' }}
                onChange={HandelChange}
              />
              <Button onClick={HandleSave}>Save</Button>

              <Slide direction="up" in={isErr} mountOnEnter unmountOnExit>
                <Alert severity="warning">you should at least type 5 letters</Alert>
              </Slide>
            </>
            :
            <Typography variant="body2" color="text.secondary">
              {props.post.post}
            </Typography>
          }

        </CardContent>

        <CardActions disableSpacing>

          <IconButton onClick={likeFunc} style={{ color: isLike ? 'red' : 'gray' }} aria-label="add to favorites">
            <FavoriteIcon />{props.post.likes == 0 ? '' : props.post.likes}
          </IconButton>
        </CardActions>
      </Card>
    </Zoom>
  );
}
