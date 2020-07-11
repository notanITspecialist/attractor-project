import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink} from "react-router-dom";
import {deleteUser, getUsers} from "../../../store/actions/user";

const UserList = () => {
    const dispatch = useDispatch();

    const users = useSelector(state => state.user.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>

                {users && users.map(e => (
                    <Card key={e._id} style={{
                        maxWidth: '25%',
                        minWidth: '80px',
                        maxHeight: '120px',
                        position: 'relative',
                        margin: '5px'
                    }}>
                        <CardContent>
                            <Typography gutterBottom style={{fontSize: '20px', marginBottom: '20px'}}>
                                <span style={{display: 'block', fontSize: '22px'}}> <b>display name: </b> {e.displayName} </span>

                                <span style={{display: 'block', fontSize: '22px'}}> <b>username: </b> {e.username} </span>
                            </Typography>
                            <div style={{display: 'flex'}}>
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    style={{position: 'absolute', bottom: '5px', right: '5px', cursor: 'pointer'}}
                                    component={NavLink}
                                    to={'/editUser/' + e._id}
                                >
                                    <EditIcon/>
                                </IconButton>

                                <IconButton
                                    onClick={() => dispatch(deleteUser(e._id))}
                                    aria-label="delete"
                                    size="small"
                                    style={{position: 'absolute', bottom: '5px', right: '40px', cursor: 'pointer'}}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UserList;