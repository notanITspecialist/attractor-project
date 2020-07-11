import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, getCategories} from "../../../store/actions/category";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

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

const AddCategory = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const categories = useSelector(state => state.category.categories);

    const [category, setCategory] = useState({
        title: '',
        parent: ''
    });

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const changeCategory = e => setCategory({...category, [e.target.name]: e.target.value});

    const createCategory = e => {
        e.preventDefault();

        dispatch(addCategory(category));
    };

    return (
        <div>
            <form className={classes.form} noValidate onSubmit={createCategory}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    value={category.title}
                    onChange={changeCategory}
                />

                {categories[0] &&
                <FormControl variant="filled" style={{width: '50%'}}>
                    <InputLabel htmlFor="parent">Parent category</InputLabel>
                    <Select
                        id='parent'
                        variant="outlined"
                        value={category.parent}
                        onChange={changeCategory}
                        name='parent'
                        labelId='Parent'
                        fullWidth
                    >
                        {categories.map(option => (
                            <MenuItem value={option._id} key={option._id}>{option.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                }


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Создать категорию
                </Button>
            </form>

        </div>
    );
};

export default AddCategory;