import { Box, Button, Checkbox, Typography } from '@mui/material';
import { capitalize, getBackgroundColor } from '../../utils/helpers';

interface GenerateWorkoutListProps {
  workout: string[]
  category: string
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const GenerateWorkoutList = ({ workout, category, setOpenModal }: GenerateWorkoutListProps) => {
  return (
    <>
      <Typography variant='h4' sx={{ alignSelf: 'center', display: { xs: 'none', sm: 'inline' }, fontWeight: 400 }}>
        {`${capitalize(category)} Workout`}
      </Typography>

      <Typography variant='h5' sx={{ alignSelf: 'center', display: { xs: 'inline', sm: 'none' }, fontWeight: 400 }}>
        {`${capitalize(category)} Workout`}
      </Typography>

      <Box sx={{ alignSelf: 'center', border: '1px solid #ccc', margin: '1rem 0', maxWidth: '600px', width: '100%' }}>
        {workout.map((exercise, index) => {
          return (
            <Box key={exercise} sx={{ alignItems: 'center', backgroundColor: getBackgroundColor(index), display: 'flex' }}>
              <Checkbox />

              <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'inline' }}}>
                {exercise}
              </Typography>

              <Typography variant='body1' sx={{ display: { xs: 'inline', sm: 'none' }}}>
                {exercise}
              </Typography>
            </Box>
          )
        })}
      </Box>

      <Button variant='contained' sx={{ alignSelf: 'center' }} onClick={() => setOpenModal(prev => !prev)}>
        Complete Workout
      </Button>
    </>
  );
}

export default GenerateWorkoutList;
