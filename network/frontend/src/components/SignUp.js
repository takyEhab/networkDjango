import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { api } from './axios'
import {logIn} from './store/actions'
import { useSelector, useDispatch } from 'react-redux';

const theme = createTheme();

export default function SignUp(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const [error, setError] = React.useState({
    message: '',
    close: false,
    isError: false
  })

  const register = async (username, email, password, password2) => {
    try {
      let res = await api.post('register/', { username, email, password, password2 });
      const config = { headers: { Authorization: `Token ${res.data.token}` } }
      localStorage.setItem('CONFIG', JSON.stringify(config))
      dispatch(logIn(res.data.user, config));

      enqueueSnackbar('you are registered successfully!', { variant: 'success' });
      history.push('/');


    } catch (err) {

      const error = err.response
      if (error) {
        const message = error.data;
        const errors = ['username', 'password', 'email'];
        for (var i = 0; i < errors.length; i++) {
          if (message[errors[i]]) {
            setError({ close: false, isError: true, message: message[errors[i]].isArray ? message[errors[i]][0] : message[errors[i]] })
          }
        }
      }
    }
  }


  const handleSubmit = (event) => {
    setError({ isError: false, message: '', close: true });

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    register(data.get('username'), data.get('email'), data.get('password'), data.get('password2'));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type='email'
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid><Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Password Confirmation"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Slide direction="up" in={error.isError} mountOnEnter unmountOnExit>
              <Alert severity="error">{error.message}</Alert>
            </Slide>


            <Button
              disabled={error.close}
              hidden
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
