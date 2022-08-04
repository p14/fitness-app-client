import { Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from '@mui/material';

interface DeleteModalProps {
  handleChangeCategory: () => void
  handleClose: () => void;
}

const ConfirmationModal = ({ handleChangeCategory, handleClose }: DeleteModalProps) => {
  return (
    <Dialog onClose={handleClose} open={true}>
      <DialogTitle>Are you sure you want to change the category?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Changing the workout category will remove all exercises from this workout.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='error' variant='contained' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleChangeCategory}>Change</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
