// import React from 'react'
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import FavoriteIcon from '@mui/icons-material/Favorite';

// import EditIcon from '@mui/icons-material/Edit';
// import { styled, alpha } from '@mui/material/styles';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ClearIcon from '@mui/icons-material/Clear';
// import CardMenu from './CardMenu';



// export default function CardTest() {
//   const [isEdit, setEdit] = React.useState(true)
//   const cardStyle = { textAlign: 'center', width: 'auto', margin: 'auto', marginTop: '2%' }

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
  
//   return (
//     <Card style={cardStyle} sx={{ maxWidth: 550 }}>
//     <CardHeader
//       avatar={
//           <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
//             A
//           </Avatar>
//       }

//       action={
//         isEdit ?
//         <IconButton onClick={handleClick} >
//           <MoreVertIcon />
//         </IconButton>
//         :
//           <IconButton onClick={() => setEdit(!isEdit)} >
//             <ClearIcon/>
//          </IconButton>
//       }

//       title="taky"

//       subheader="27-11-2022"
//     />
//     <CardMenu anchorEl={anchorEl} handleClose={handleClose} setEdit={setEdit} isEdit={isEdit} open={open} />

//     <CardContent>
//       {isEdit ?
//         <Typography variant="body2" color="text.secondary">
//           post ma nigga
//         </Typography> :
//         <>
//           <TextField
//             id="outlined-multiline-static"
//             multiline
//             rows={5}
//             style={{ width: '100%', marginTop: '1%' }}
//           />
//           <Button>Save</Button>
//         </>
//       }

//     </CardContent>

//     <CardActions disableSpacing>

//       <IconButton style={{ color: 'red' }} aria-label="add to favorites">
//         <FavoriteIcon />1
//       </IconButton>
//     </CardActions>
//   </Card>
//   )
// }
