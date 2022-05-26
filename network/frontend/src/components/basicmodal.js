import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import NewPost from './NewPost';
import Modal from '@mui/material/Modal';
import Popover from '@mui/material/Popover';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CreateIcon from '@mui/icons-material/Create';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [openModel, setOpenModel] = React.useState(false);

  const handleCloseModel = () => setOpenModel(false);

  const isLogedIn = useSelector(state => state.myInfoState.isLogedIn)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (isLogedIn) {
      setOpenModel(true)
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const open2 = Boolean(anchorEl);
  const id = open2 ? 'simple-popover' : undefined;


  return (
    <div style={{ textAlign: 'center', marginTop: '1%' }}>

      <TextField style={{ width: '53%' }} aria-describedby={id}
        onClick={handleClick} value="Write New Post"
        readOnly={true}
        multiline
        rows={3}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <CreateIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Popover id={id}
        open={open2}
        anchorEl={anchorEl}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Typography sx={{ p: 2 }}>You have to be loged in to write a post.</Typography>
      </Popover>


      <Modal
        open={openModel}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Post
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <NewPost setOpen={setOpenModel} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
