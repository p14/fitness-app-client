import { PersonRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { refresh, updateUser } from '../../api/auth.api';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { SessionUser } from '../../context/session.context';
import { User } from '../../models/user.model';

interface AccountFormProps {
  user: SessionUser
  setSession: (isLoggedIn: boolean, user: SessionUser) => void
}

const AccountForm = ({ user, setSession }: AccountFormProps) => {

  const theme = createTheme();
  const feedbackContext = useFeedbackContext();

  const handleUpdateAccount = (userData: User) => {
    updateUser(userData)
      .then((response) => response.data)
      .then((data) => {
        setSession(true, data);
        refresh();
        feedbackContext.setFeedback({
          message: 'Account Updated!', 
          type: FeedbackType.SUCCESS,
          open: true,
        });
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
    email: Yup.string().email('Invalid email address').required(),
  });

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: (values: User) => handleUpdateAccount(values),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <PersonRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Edit Account
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
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      name='email'
                      label='Email'
                    />
                  </Grid>
                </Grid>

                <Button type='submit' variant='contained' sx={{ marginBottom: 2, marginTop: 2 }}>
                  Save
                </Button>
              </Box>
            </FormControl>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AccountForm;
