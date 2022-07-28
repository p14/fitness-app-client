import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, setTokenStorage } from '../api/auth.api';
import { useFeedbackContext } from '../context/feedback.context';
import { useSessionContext } from '../context/session.context';
import { LoginData } from '../models/auth.model';

const LoginForm: React.FC = () => {

  const theme = createTheme();
  const sessionContext = useSessionContext();
  const feedbackContext = useFeedbackContext();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then((response) => response.data)
      .then((data) => {
        setTokenStorage(data);
        sessionContext.setSession(true, data.user);
        navigate('/');
      })
      .catch((error: any) => {
        if (typeof error === 'object') {
          feedbackContext.setFeedback({
            message: error.response.data ?? error.message, 
            error: true,
            open: true,
          });
        } else {
          feedbackContext.setFeedback({
            message: error, 
            error: true,
            open: true,
          });
        }
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: LoginData) => {
      handleLogin(values.email, values.password);
    }
  });

  useEffect(() => {
    if (sessionContext.isLoggedIn) {
      navigate('/');
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            User Login
          </Typography>

          <Container component='main' maxWidth='sm'>
            <FormControl fullWidth>
              <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      name='email'
                      label='Email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      name='password'
                      label='Password'
                      type='password'
                    />
                  </Grid>
                </Grid>

                <Button fullWidth type='submit' variant='contained' sx={{ marginBottom: 2, marginTop: 2 }}>
                  Log In
                </Button>

                <Typography variant='body2'>
                  Don't have an account? <Link to='/register'>Register</Link>
                </Typography>
              </Box>
            </FormControl>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
