import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {editUser, getUser} from "../../../store/actions/user";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '40%',
        margin: '0 auto',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const EditUser = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const editedUser = useSelector(state => state.user.editUser);

    const [user, setUser] = useState(null);

    useEffect(() => {
        if(user === null) {
            dispatch(getUser(props.match.params.id))

            if(editedUser && editedUser.username && ( editedUser._id.toString() === props.match.params.id) ) {
                const editInfo = {username: editedUser.username,  displayName: editedUser.displayName, password: ''};

                setUser(() => (editInfo))
            }
        }
    }, [dispatch, editedUser, user, props.match.params.id]);

    const changeUser = e => setUser({...user, [e.target.name]: e.target.value});

    const editingUser = e => {
        e.preventDefault();

        dispatch(editUser(props.match.params.id ,user));
    };

    return (
        <div>
            { user !== null && <form className={classes.form} noValidate onSubmit={editingUser}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    value={user.username}
                    onChange={changeUser}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="displayName"
                    label="Display name"
                    name="displayName"
                    value={user.displayName}
                    onChange={changeUser}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    value={user.password}
                    onChange={changeUser}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Редактировать пользователя
                </Button>
            </form> }

        </div>
    );
};

export default EditUser;