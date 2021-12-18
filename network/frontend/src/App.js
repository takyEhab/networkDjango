import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Register from './components/SignUp';
import Login from './components/SignIn';
import Following from './components/following'
import './App.css';
import SpringModal from './components/basicmodal'
import User from './components/User';
import Posts from './components/Posts';
import { SnackbarProvider } from 'notistack';
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserContext } from './components/userContext';
import { api } from './components/axios'

const initialState = {
  posts: null, isLoading: true, error: '',
  infoIsLoading: true, myInfo: null,
  isLogedIn: false
}

const reducer = (current, action) => {
  switch (action.type) {
    case 'refresh':
      return {
        ...current,
        isLoading: false,
        posts: action.payload,
        error: ''
      }
    case 'error':
      return {
        ...current,
        isLoading: false,
        posts: null,
        error: "Something went wrong ,Can't Load Posts"
      }
    case 'LogedIn':
      return {
        ...current,
        isLogedIn: true,
        infoIsLoading: false,
        myInfo: action.payload
      }
    case 'NotLogedIn':
      localStorage.removeItem('knox');
      return {
        ...current,
        isLogedIn: false,
        myInfo: null,
        infoIsLoading: false
      }
    default:
      return current
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [CONFIG, setCONFIG] = useState({
    headers: { Authorization: `Token ${localStorage.getItem('knox')}` }
  })

  useEffect(() => {
    setCONFIG({ headers: { Authorization: `Token ${localStorage.getItem('knox')}` } })
  }, [state.myInfo]);

  useEffect(() => {
    refresh()
    api.get('me/', CONFIG)
      .then(data => {
        dispatch({ type: 'LogedIn', payload: data.data })
      })
      .catch(() => dispatch({ type: 'NotLogedIn' }))
  }, []);

  const refresh = useCallback(() => {
    api.get('posts/')
      .then(posts => {
        dispatch({ type: 'refresh', payload: posts.data })
      })
      .catch(() => dispatch({ type: 'error' }))
  }, [state.posts])



  const ProviderValue = useMemo(() => ({ state, dispatch, refresh, CONFIG })
    , [state, dispatch, refresh, CONFIG])

  return (
    <Router>
      <Switch>

        <UserContext.Provider value={ProviderValue} >
          <Header />

          <Route exact path="/">

            <SpringModal />

            <Posts />

          </Route>

          <Route exact path="/profile/:name" component={User} />
          <Route exact path="/following" component={Following} />
          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login" >
            <Login />
          </Route>
        </UserContext.Provider>

      </Switch>
    </Router >
  )

}

ReactDOM.render(<SnackbarProvider maxSnack={3}>
  <App />
</SnackbarProvider>
  , document.getElementById('root'));
