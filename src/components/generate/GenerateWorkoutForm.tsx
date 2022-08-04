import { FitnessCenterRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GenerateWorkoutData, initialGenerateWorkoutData, WorkoutCategory } from '../../models/workout.model';

interface GenerateWorkoutFromProps {
  handleGenerateWorkout: ({ category, length }: {
    category: string;
    length: number;
  }) => Promise<void>
}

const GenerateWorkoutForm = ({ handleGenerateWorkout }: GenerateWorkoutFromProps) => {

  const theme = createTheme();

  const validationSchema = Yup.object().shape({
    category: Yup.string().oneOf(Object.values(WorkoutCategory)).required(),
    length: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: initialGenerateWorkoutData,
    validationSchema,
    onSubmit: (values: GenerateWorkoutData) => handleGenerateWorkout(values),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
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
                      <MenuItem key={WorkoutCategory.CHEST} value={WorkoutCategory.CHEST}>Chest</MenuItem>
                      <MenuItem key={WorkoutCategory.BACK} value={WorkoutCategory.BACK}>Back</MenuItem>
                      <MenuItem key={WorkoutCategory.ARMS} value={WorkoutCategory.ARMS}>Arms</MenuItem>
                      <MenuItem key={WorkoutCategory.SHOULDERS} value={WorkoutCategory.SHOULDERS}>Shoulders</MenuItem>
                      <MenuItem key={WorkoutCategory.LEGS} value={WorkoutCategory.LEGS}>Legs</MenuItem>
                      <MenuItem key={WorkoutCategory.PUSH} value={WorkoutCategory.PUSH}>Push</MenuItem>
                      <MenuItem key={WorkoutCategory.PULL} value={WorkoutCategory.PULL}>Pull</MenuItem>
                      <MenuItem key={WorkoutCategory.UPPER} value={WorkoutCategory.UPPER}>Upper</MenuItem>
                      <MenuItem key={WorkoutCategory.LOWER} value={WorkoutCategory.LOWER}>Lower</MenuItem>
                      <MenuItem key={WorkoutCategory.FULL_BODY} value={WorkoutCategory.FULL_BODY}>Full Body</MenuItem>
                      <MenuItem key={WorkoutCategory.HIIT} value={WorkoutCategory.HIIT}>HIIT</MenuItem>
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
                      <MenuItem key={4} value={4}>Short</MenuItem>
                      <MenuItem key={5} value={5}>Medium</MenuItem>
                      <MenuItem key={6} value={6}>Long</MenuItem>
                    </TextField>
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
