import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, setTokenStorage } from '../../api/auth.api';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { useSessionContext } from '../../context/session.context';
import { initialLoginData, LoginData } from '../../models/auth.model';
import Loading from '../Loading';

const LoginForm: React.FC = () => {

  const theme = createTheme();
  const sessionContext = useSessionContext();
  const feedbackContext = useFeedbackContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (loginData: LoginData) => {
    setLoading(true);
    login(loginData)
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);
        setTokenStorage(data);
        sessionContext.setSession(true, data.user);
        navigate('/dashboard');
      })
      .catch((error: any) => {
        if (typeof error === 'object') {
          setLoading(false);
          feedbackContext.setFeedback({
            message: error.response.data ?? error.message, 
            type: FeedbackType.ERROR,
            open: true,
          });
        } else {
          setLoading(false);
          feedbackContext.setFeedback({
            message: error, 
            type: FeedbackType.ERROR,
            open: true,
          });
        }
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: initialLoginData,
    validationSchema,
    onSubmit: (values: LoginData) => handleLogin(values),
  });

  useEffect(() => {
    if (sessionContext.isLoggedIn) {
      navigate('/dashboard');
    };
  }, []);

  return (
    <>
      { loading && <Loading /> }
      { !loading &&
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
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          error={formik.touched.username && Boolean(formik.errors.username)}
                          helperText={formik.touched.username && formik.errors.username}
                          name='username'
                          label='Username'
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
      }
    </>
  );
}

export default LoginForm;
