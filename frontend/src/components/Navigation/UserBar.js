import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {logoutUser} from "../../store/actions/user";
import {NavLink} from "react-router-dom";


const UserBar = () => {
    const user = useSelector(state => state.user.user);

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <NavLink color="inherit" to='/categoriesList' style={{textDecoration: 'none', color: '#fff'}}>
                <Button color="inherit">
                    Categories list
                </Button>
            </NavLink>

            <NavLink color="inherit" to='/articlesList' style={{textDecoration: 'none', color: '#fff'}}>
                <Button color="inherit">
                    Articles list
                </Button>
            </NavLink>

            <NavLink color="inherit" to='/usersList' style={{textDecoration: 'none', color: '#fff'}}>
                <Button color="inherit">
                    Users list
                </Button>
            </NavLink>

            <Button
                onClick={handleMenu}
                color="inherit"
                style={{textTransform: 'capitalize', marginLeft: 'auto'}}
            >
                    {user.avatar && <Avatar alt={user.displayName} src={user.avatar} />}
                    <Box ml={1}>
                        <Typography variant='h6'>{user.displayName}</Typography>
                    </Box>
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserBar;