import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import AlertTitle from '@mui/material/AlertTitle';
import Card from './Card'
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';


export default function Posts() {
  const postsState = useSelector(state => state.postsState)
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' })

  };
  const postPerPage = 10
  const last = page * postPerPage
  const first = last - postPerPage

  const pageCount = Math.ceil(((postsState.posts !== null && postsState.error === '') && postsState.posts.length) / postPerPage)

  return (
    <div>

      {(postsState.posts !== null && postsState.error === '') &&
        postsState.posts.sort((a, b) => {
          return new Date(b.id) - new Date(a.id);
        }).slice(first, last).map((item, i) => 
          <Card
            key={i} post={item}
            from={'main'}
          />
        )}

      {(postsState.isLoading) ?
        <LinearProgress sx={{ marginTop: '10%' }} /> :
        <Pagination size='large' count={pageCount} page={page} onChange={handleChange} />}


      <Slide direction="up" in={postsState.error !== ''} mountOnEnter unmountOnExit>
        <Alert sx={{
          margin: 'auto', width: 'auto', width: '40%',
          marginTop: '1%'
        }} severity="error">
          <AlertTitle>Error</AlertTitle>
          {postsState.error}
        </Alert>
      </Slide>

    </div>
  );
}
