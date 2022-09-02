import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register, setTokenStorage } from '../../api/auth.api';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { useSessionContext } from '../../context/session.context';
import { initialRegisterData, RegisterData } from '../../models/auth.model';
import Loading from '../Loading';

const RegisterForm: React.FC = () => {

  const theme = createTheme();
  const sessionContext = useSessionContext();
  const feedbackContext = useFeedbackContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = (registerData: RegisterData) => {
    setLoading(true);
    register(registerData)
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);
        setTokenStorage(data);
        sessionContext.setSession(true, data.user);
        feedbackContext.setFeedback({
          message: 'Account registered!', 
          type: FeedbackType.SUCCESS,
          open: true,
        });
        navigate('/dashboard');
      })
      .catch((error: any) => {
        if (typeof error === 'object') {
          feedbackContext.setFeedback({
            message: error.response.data ?? error.message, 
            type: FeedbackType.ERROR,
            open: true,
          });
        } else {
          feedbackContext.setFeedback({
            message: error, 
            type: FeedbackType.ERROR,
            open: true,
          });
        }
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: initialRegisterData,
    validationSchema,
    onSubmit: (values: RegisterData) => handleRegister(values),
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
                User Register
              </Typography>

              <Container component='main' maxWidth='sm'>
                <FormControl fullWidth>
                  <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                          helperText={formik.touched.firstName && formik.errors.firstName}
                          name='firstName'
                          label='First Name'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                          helperText={formik.touched.lastName && formik.errors.lastName}
                          name='lastName'
                          label='Last Name'
                        />
                      </Grid>
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
                      Register
                    </Button>

                    <Typography variant='body2'>
                      Already have an account? <Link to='/'>Log In</Link>
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

export default RegisterForm;
