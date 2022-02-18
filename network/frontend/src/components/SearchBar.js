import React,{useState} from "react";
import TextField from '@mui/material/TextField';
import { api } from './axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useHistory } from "react-router-dom";
import Zoom from '@mui/material/Zoom';
import { useSelector} from 'react-redux'
import { useSnackbar } from 'notistack';


export default function Search(props) {
  const [data, setData] = useState(null);
	const myInfoState = useSelector(state => state.myInfoState)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  const search = (name) => {
    api.get(`users/${name}/`)
    .then(users => {
        setData(users.data)
    })
  }
  const redirect = (username) => {
    history.push(`/profile/${username}`)
    props.closeModel()
  }
	const HandelChange = (e) => {
		if(e.target.value === "") {
			setData(null)
		} else {
			search(e.target.value);
		}
	}
	const follow = (e, user) => {
    const isF = e.target.textContent
		e.stopPropagation()
		api.patch(`follow/${user.id}/`, {}, myInfoState.CONFIG).then(()=>{
      enqueueSnackbar(isF === 'follow' ? `You FOLLOWED ${user.username}!`:`You UNFOLLOWED ${user.username}!`, { variant: 'info' });
      e.target.textContent = isF === 'follow' ? 'unfollow':'follow'
    })
	}
  
  return (
    <div>
        <TextField
            id="outlined-multiline-static"
            label="Type Username..."
            autoComplete="off"
            rows={3}
            style={{ width: '100%', marginTop: '2%' }}
            onChange={HandelChange}

        />
    <Zoom in={data !== null}>

    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 250 }}>
        <Table stickyHeader aria-label="sticky table">

          <TableBody>
            {data && 
            data.map((user) => {
                return (
                  <TableRow onClick={() => redirect(user.username)} hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell >
                        {user.username}
                    </TableCell>
										
										{(myInfoState.myInfo && myInfoState.myInfo.id !== user.id) &&

											<TableCell align='right'>
                        <Button onClick={(e) => follow(e, user)} color="secondary" variant="outlined" > 
                        
                           {myInfoState.myInfo.following.filter(e => e.following_user_id === user.username).length > 0 
                          ? 'Unfollow'
                          : 'Follow'
                          }
                          </Button>
                    	</TableCell>
										}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </Zoom>

    </div>
  );
}
