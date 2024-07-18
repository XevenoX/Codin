import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
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
import { useNavigate } from 'react-router-dom';
import signInPic from '../pics/Signin.png';
import { ConstructionOutlined } from '@mui/icons-material';

export default function SignIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data.user);
      console.log(response.ok);

      if (response.ok) {
        // 登录成功
        setError('');
        setEmailError(false);
        setCookie('user', data.user, { path: '/' });
        onLogin(data.user);

        // 根据用户角色导航
        if (data.user.role === 'publisher') {
          console.log('Its a developer');
          console.log(data.user);
          navigate(`/publisherhomepage/${data.user.id}`);
        } else if (data.user.role === 'developer') {
          navigate(`/developerhomepage/${data.user.id}`);
        } else {
          console.log('Neither publisher nor developer!');
          navigate('/'); // 默认跳转到首页
        }
      } else {
        console.log('Login failed:', data.message);
        // 登录失败
        setError(data.message || 'Login failed');
        setEmailError(true);
      }
    } catch (error) {
      console.log('An error occurred during login:', error); // 添加日志
      setError('An error occurred during login');
      setEmailError(true);
    }
  };

  return (
    <div className="sign-in">
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
          <Box
            sx={{
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Avatar
              src={signInPic}
              sx={{
                m: 1,
                height: 90,
                width: 'auto',
              }}
            ></Avatar>
          </Box>
          <Box>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? error : ''}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={emailError}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography variant="h6">Sign in</Typography>
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body3">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
