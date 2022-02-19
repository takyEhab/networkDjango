import React, { useCallback, useContext, useEffect, useState } from 'react'
import { api } from './axios'
import Card from './Card'
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';


function Following() {
  const isLogedIn = useSelector(state => state.myInfoState.isLogedIn)
  const myInfo = useSelector(state => state.myInfoState.myInfo)

  const [posts, setPosts] = useState('loading')
  const [following, setFollowing] = useState('')
  const [page, setPage] = useState(1);

  useEffect(async () => {
    getFollowingPosts()
  }, [following])
  useEffect(() => {
    if (isLogedIn) {
      myInfo.following.forEach(item => {
        setFollowing(prevState => {
          return [...prevState, item.following_user_id];
        })

      });
    }
  }, [myInfo])

  const getFollowingPosts = useCallback(async () => {
    let res = await api.get(`posts/`).then(res => res.data)

    const posts = res.filter(function (post) {
      return (
        following.includes(post.writer)
      )
    })
    setPosts(posts)
  }, [following])
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  const postPerPage = 10
  const last = page * postPerPage
  const first = last - postPerPage

  const pageCount = Math.ceil(((posts !== null && posts !== 'loading') && posts.length) / postPerPage)

  return (
    <div>
      {(posts !== null && posts !== 'loading') &&
        posts.sort((a, b) => {
          return new Date(a.id) - new Date(b.id);
        }).slice(first, last).map((item, i) => <Card
          key={i} post={item} from={'following'}
          getFollowingPosts={getFollowingPosts}
        />)}

      {(posts === 'loading') ?
        <LinearProgress sx={{ marginTop: '10%' }} /> :
        <Pagination size='large' count={pageCount} page={page} onChange={handleChange} />}

    </div>
  )
}

export default Following
