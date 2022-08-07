import { Dialog, DialogContent, DialogTitle, Box, Button } from '@mui/material';
import axios from 'axios';
import { useFeedbackContext } from '../context/feedback.context';
import { DataType } from '../models/data.model';
import { capitalize, setupConfig } from '../utils/helpers';

interface DeleteModalProps {
  id: string
  name: string
  type: DataType
  updateContext: (id: string) => void
  handleClose: () => void;
}

const DeleteModal = ({ id, name, type, updateContext, handleClose }: DeleteModalProps) => {

  const feedbackContext = useFeedbackContext();

  const handleDelete = async () => {
    const config = await setupConfig('DELETE', `/${type}/${id}`);
    return axios.request(config)
      .then(() => {
        updateContext(id);
        feedbackContext.setFeedback({
          message: `${capitalize(type).slice(0, -1)} deleted!`,
          open: true,
          type: 0,
        });
        handleClose();
      })
      .catch((error: any) => {
        if (typeof error === 'object') {
          feedbackContext.setFeedback({
            message: error.response.data ?? error.message, 
            error: true,
            open: true,
          });
        } else {
          feedbackContext.setFeedback({
            message: error, 
            error: true,
            open: true,
          });
        }
      });
  };

  return (
    <Dialog onClose={handleClose} open={true}>
      <DialogTitle>Do you want to delete {name}?</DialogTitle>
      <DialogContent>
        <Box display='flex' flexGrow={1} justifyContent='center'>
          <Button color='error' variant='contained' onClick={handleClose}>Cancel</Button>
          &nbsp;
          <Button variant='contained' onClick={handleDelete}>Delete</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
