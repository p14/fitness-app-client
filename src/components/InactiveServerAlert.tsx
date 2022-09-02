import { Box, Dialog, DialogContent, DialogTitle, LinearProgress } from '@mui/material';

const InactiveServerAlert = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>Starting the server</DialogTitle>
      <DialogContent>
      This app is currently hosted on a free server, this might take a minute.
        <Box sx={{ marginTop: 1 }}>
          <LinearProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InactiveServerAlert;
