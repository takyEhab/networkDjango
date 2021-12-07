import React, { useState, useEffect, useContext } from 'react';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import AlertTitle from '@mui/material/AlertTitle';
import Card from './Card'
import { UserContext } from './userContext';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';


export default function Posts(props) {
  const { state , refresh } = useContext(UserContext)
  const [page, setPage] = React.useState(1);

  useEffect(async () => {
    refresh()
  }, [])

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' })

  };
  const postPerPage = 10
  const last = page * postPerPage
  const first = last - postPerPage

  const pageCount = Math.ceil(((state.posts !== null && state.error === '') && state.posts.length) / postPerPage)

  return (
    <div>

      {(state.posts !== null && state.error === '') &&
        state.posts.sort((a, b) => {
          return new Date(b.id) - new Date(a.id);
        }).slice(first, last).map((item, i) => <Card
          key={i} post={item}
          from={'main'}
        />)}

      {(state.isLoading || state.infoIsLoading) ?
        <LinearProgress sx={{ marginTop: '10%' }} /> :
        <Pagination size='large' count={pageCount} page={page} onChange={handleChange} />}


      <Slide direction="up" in={state.error !== ''} mountOnEnter unmountOnExit>
        <Alert sx={{
          margin: 'auto', width: 'auto', width: '40%',
          marginTop: '1%'
        }} severity="error">
          <AlertTitle>Error</AlertTitle>
          {state.error}
        </Alert>
      </Slide>

    </div>
  );
}
