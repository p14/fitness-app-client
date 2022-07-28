import { useNavigate } from 'react-router-dom';
import { FitnessCenterRounded, KeyboardBackspace } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, FormControlLabel, Grid, MenuItem, Switch, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { exerciseCategories, exerciseLengths } from './generate.service';

interface GenerateWorkoutFromProps {
  handleGenerateWorkout: ({ category, length, includeAbs }: {
    category: string;
    length: string;
    includeAbs: boolean;
  }) => Promise<void>
}

const GenerateWorkoutForm = ({ handleGenerateWorkout }: GenerateWorkoutFromProps) => {

  const navigate = useNavigate();
  const theme = createTheme();

  const validationSchema = Yup.object().shape({
    category: Yup.string().required(),
    length: Yup.string().required(),
    includeAbs: Yup.boolean().required(),
  });

  const formik = useFormik({
    initialValues: {
      category: '',
      length: '',
      includeAbs: false,
    },
    validationSchema,
    onSubmit: (values: any) => {
      handleGenerateWorkout(values);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Button onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: 'flex', position: 'absolute', marginTop: -4 }}>
          <KeyboardBackspace />
          &nbsp;
          Back to Dashboard
        </Button>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <FitnessCenterRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Generate Workout
          </Typography>

          <Container component='main' maxWidth='xs'>
            <FormControl fullWidth>
              <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                      name='category'
                      label='Category'
                    >
                      {exerciseCategories.map((exerciseCategory) => {
                        return (
                          <MenuItem key={exerciseCategory.value} value={exerciseCategory.value}>
                            {exerciseCategory.name}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      value={formik.values.length}
                      onChange={formik.handleChange}
                      error={formik.touched.length && Boolean(formik.errors.length)}
                      helperText={formik.touched.length && formik.errors.length}
                      name='length'
                      label='Length'
                    >
                      {exerciseLengths.map((exerciseLength) => {
                        return (
                          <MenuItem key={exerciseLength.value} value={exerciseLength.value}>
                            {exerciseLength.name}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={formik.handleChange}
                          checked={formik.values.includeAbs}
                          name='includeAbs'
                        />
                      }
                      label='Include Abs'
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  <Button variant='contained' type='submit' sx={{ marginBottom: 2, marginTop: 2 }}>
                    Start Workout
                  </Button>
                </Box>
              </Box>
            </FormControl>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default GenerateWorkoutForm;
