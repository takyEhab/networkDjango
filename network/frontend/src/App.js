import React, { lazy, useState, useEffect, useReducer, useMemo, useCallback, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { UserContext } from './components/userContext';
import { api } from './components/axios'
import'./App.css';
import Header from './components/Header'
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, error, logOut, setData } from "./components/store/actions"

const Register = lazy(() => import('./components/SignUp'));
const Login = lazy(() => import('./components/SignIn'));
const Following = lazy(() => import('./components/following'));
const SpringModal = lazy(() => import('./components/basicmodal')); 
const User = lazy(() => import('./components/User')); 
const Posts = lazy(() => import('./components/Posts'));



export default function App() {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.postsState.posts)
  const CONFIG = useSelector(state => state.myInfoState.CONFIG)

  useEffect(() => {
    refresh()
    api.get('me/', CONFIG)
      .then(info => {
        dispatch(logIn(info.data, CONFIG))
      })
      .catch(() => {
        dispatch(logOut())
      })
  }, []);

  const refresh = useCallback(() => {
    api.get('posts/')
      .then(posts => {
        dispatch(setData(posts.data))
      })
      .catch(() => {
        dispatch(error())
      })
  }, [posts])


  const ProviderValue = {refresh};

  return (
    <Router>
      <UserContext.Provider value={ProviderValue} >
        <Header />
        
        <Suspense fallback={<Loading />}>

          <Switch>

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

          </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router >
  )
}
