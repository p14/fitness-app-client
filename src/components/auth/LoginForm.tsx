import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, LinearProgress, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, setTokenStorage } from '../../api/auth.api';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { useSessionContext } from '../../context/session.context';
import { initialLoginData, LoginData } from '../../models/auth.model';

const LoginForm: React.FC = () => {

  const theme = createTheme();
  const sessionContext = useSessionContext();
  const feedbackContext = useFeedbackContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (loginData: LoginData) => {
    setLoading(true);
    const startingServers = setTimeout(() => {
      feedbackContext.setFeedback({
        message: 'Firing up the (free) servers, this might take a minute.', 
        type: FeedbackType.WARNING,
        open: true,
      });
    }, 5000);

    login(loginData)
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);
        clearTimeout(startingServers);
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
    email: Yup.string().email('Invalid email address').required(),
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
      { loading &&
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Box sx={{ marginTop: 8 }}>
              <LinearProgress />
            </Box>
          </Container>
        </ThemeProvider>
      }
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
      }
    </>
  );
}

export default LoginForm;
