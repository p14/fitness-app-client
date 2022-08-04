import { Alert, Snackbar } from '@mui/material';
import { useFeedbackContext } from '../context/feedback.context';

const FeedbackAlert = () => {

  const feedbackContext = useFeedbackContext();

  return (
    <Snackbar 
      open={feedbackContext.feedback.open} 
      autoHideDuration={6000} 
      onClose={() => feedbackContext.setFeedback({ ...feedbackContext.feedback, open: false })} 
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <Alert
        onClose={() => feedbackContext.setFeedback({ ...feedbackContext.feedback, open: false })}
        severity={feedbackContext.feedback.error ? 'error' : 'success'}
      >
        {feedbackContext.feedback.message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackAlert;
