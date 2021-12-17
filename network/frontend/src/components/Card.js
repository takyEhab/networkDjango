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
import { UserContext } from './userContext'
import { Link } from "react-router-dom";
import { api } from './axios'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';

export default function RecipeReviewCard(props) {
  const { state, refresh, CONFIG } = useContext(UserContext)
  const [isLike, setLike] = useState(null);
  const [edit, setEdit] = useState(props.post.post)
  const [isErr, setErr] = React.useState(false)
  const [isEdit, setIsEdit] = useState(true)
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.post.UsersLikes.includes(state.isLogedIn && state.myInfo.id)) {
      setLike(true);
    } else {
      setLike(false)
    }
  }, [state.isLogedIn])
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
    api.patch(`posts/${id}/like/`, {}, CONFIG)
      .then(() => refreshSelected())
  }
  const editPost = (post, id) => {
    api.patch(`posts/${id}/`, { post }, CONFIG)
      .then(() => refreshSelected())
  }

  const HandleClick = () => {
    if (edit.length > 5) {
      editPost(edit, props.post.id)
      enqueueSnackbar('Post Edited!', { variant: 'info' });
      
      setIsEdit(true);
    } else { setErr(true) }
  }




  const likeFunc = () => {
    if (!state.isLogedIn) {
      return
    }
    isLike ? setLike(false) : setLike(true);
    like(props.post.id)
  }

  const HandelChange = (event) => {
    setEdit(event.target.value)
  }


  const cardStyle = { textAlign: 'center', width: 'auto', margin: 'auto', marginTop: '2%' }

  return (
    <Card style={cardStyle} sx={{ maxWidth: 550 }}>
      <CardHeader
        avatar={
          <Link style={{ textDecoration: 'initial' }} to={`/profile/${props.post.writer}`}>
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              {props.post.writer.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }

        action={
          state.isLogedIn && (state.myInfo.username === props.post.writer ?

            <IconButton onClick={() => setIsEdit(!isEdit)} >
              <EditIcon />
            </IconButton>
            : '')

        }

        title={props.post.writer}

        subheader={props.post.created_at}
      />

      <CardContent>
        {isEdit ?
          <Typography variant="body2" color="text.secondary">
            {props.post.post}
          </Typography> :
          <>
            <TextField
              id="outlined-multiline-static"
              value={edit}
              multiline
              rows={5}
              style={{ width: '100%', marginTop: '1%' }}
              onChange={HandelChange}
            />
            <Button onClick={HandleClick} >Save</Button>

            <Slide direction="up" in={isErr} mountOnEnter unmountOnExit>
              <Alert severity="warning">you should at least type 5 letters</Alert>
            </Slide>
          </>
        }

      </CardContent>

      <CardActions disableSpacing>

        <IconButton onClick={likeFunc} style={{ color: isLike ? 'red' : 'gray' }} aria-label="add to favorites">
          <FavoriteIcon />{props.post.likes == 0 ? '' : props.post.likes}
        </IconButton>
      </CardActions>
    </Card>
  );
}
