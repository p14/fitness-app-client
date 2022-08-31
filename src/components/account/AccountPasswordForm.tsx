import { Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUserPassword } from '../../api/auth.api';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { SessionUser } from '../../context/session.context';
import { initialPasswordUpdateData, PasswordUpdateData } from '../../models/user.model';

interface AccountPasswordFormProps {
  user: SessionUser
}

const AccountPasswordForm = ({ user }: AccountPasswordFormProps) => {

  const theme = createTheme();
  const feedbackContext = useFeedbackContext();

  const handleUpdatePassword = (passwordUpdateData: PasswordUpdateData) => {
    updateUserPassword(user._id, passwordUpdateData)
      .then((response) => response.data)
      .then(() => {
        feedbackContext.setFeedback({
          message: 'Account Password Updated!', 
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
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: initialPasswordUpdateData,
    validationSchema,
    onSubmit: (values: PasswordUpdateData) => handleUpdatePassword(values),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginBottom: 2, marginTop: 2 }}>
          <Typography component='h1' variant='h5'>
            Edit Password
          </Typography>

          <Container component='main' maxWidth='sm'>
            <FormControl fullWidth>
              <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                      helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                      name='oldPassword'
                      label='Old Password'
                      type='password'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                      helperText={formik.touched.newPassword && formik.errors.newPassword}
                      name='newPassword'
                      label='New Password'
                      type='password'
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

export default AccountPasswordForm;
