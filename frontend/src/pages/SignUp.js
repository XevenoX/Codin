import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios'; // 引入 axios

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('developer'); // 默认值设置为 developer
  const [error, setError] = useState(''); // 用于保存错误信息
  const navigate = useNavigate(); // 引入 useNavigate

  async function handleSubmit(event) {
    event.preventDefault();
    setError(''); // 重置错误状态

    try {
      let response;

      // 使用 axios 发送 POST 请求
      response = await axios.post('http://localhost:5050/signUp', {
        name,
        email,
        password,
        role,
      });

      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming the server returns the created user or some success message
      const result = response.data;
      console.log('User created:', result);

      // 清空表单
      setName('');
      setEmail('');
      setPassword('');
      setRole('developer'); // 重置为默认角色

      // 注册成功后重定向到首页
      navigate('/'); // 重定向到首页
    } catch (error) {
      console.error('A problem occurred with your axios operation: ', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  }

  return (
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Role
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={role} // 设置当前选中的值
                onChange={(e) => setRole(e.target.value)} // 处理选择变化
              >
                <FormControlLabel
                  label="I am looking for a developer"
                  control={<Radio />}
                  value="publisher"
                />
                <FormControlLabel
                  label="I am looking for tasks"
                  control={<Radio />}
                  value="developer"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={error === 'User already exists'} // 如果有错误信息，将此字段设置为错误
                helperText={error === 'User already exists' ? error : ''} // 显示错误信息
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
