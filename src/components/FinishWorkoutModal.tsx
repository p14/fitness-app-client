import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FinishModalProps {
  handleClose: (value: React.SetStateAction<boolean>) => void
}

const FinishModal = ({ handleClose }: FinishModalProps) => {

  const navigate = useNavigate();

  return (
    <Dialog open fullWidth maxWidth='xs' onClose={handleClose}>
      <DialogTitle>
        Workout Complete
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Great job, keep up the awesome work!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => navigate('/dashboard')}>
          End Workout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinishModal;
