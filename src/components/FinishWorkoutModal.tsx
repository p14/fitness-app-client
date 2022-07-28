import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface FinishModalProps {
  openModal: boolean
  handleCompleteWorkout: () => void
}

const FinishModal = ({ openModal, handleCompleteWorkout }: FinishModalProps) => {
  return (
    <Dialog open={openModal} fullWidth maxWidth='xs' onClose={() => handleCompleteWorkout()}>
      <DialogTitle>
        Workout Complete
      </DialogTitle>
      <DialogContent>
        <Typography>
          Great job, keep up the awesome work!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => handleCompleteWorkout()}>
          End Workout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinishModal;
