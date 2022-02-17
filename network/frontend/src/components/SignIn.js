import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { api } from './axios';
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { UserContext } from './userContext';  
import { useDispatch } from 'react-redux';
import { logIn } from './store/actions';

const theme = createTheme();

export default function SignIn() {
  // const { dispatch } = useContext(UserContext)
  const dispatch = useDispatch();

  const [error, setError] = React.useState({
    message: '',
    close: false,
    isError: false
  })

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const login = async (username, password) => {
    try {
      let res = await api.post('login/', { username, password });
      const config = { headers: { Authorization: `Token ${res.data.token}` } }
      localStorage.setItem('CONFIG', JSON.stringify(config))
      dispatch(logIn(res.data.user, config));
      enqueueSnackbar('you are loged in successfully!', { variant: 'success' });
      history.push('/');

    } catch (err) {
      if (err.response) {
        setError({ close: false, isError: true, message: err.response.data['non_field_errors'][0] })
      }
    }
  }

  const handleSubmit = (event) => {
    setError({ isError: false, message: '', close: true });
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    login(data.get('username'), data.get('password'));
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
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Slide direction="up" in={error.isError} mountOnEnter unmountOnExit>
              <Alert severity="error">{error.message}</Alert>
            </Slide>

            <Button
              disabled={error.close}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">

              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
