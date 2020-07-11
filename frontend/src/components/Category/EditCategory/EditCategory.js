import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {editCategory, getCategories, getCategory} from "../../../store/actions/category";
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

const EditCategory = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const categories = useSelector(state => state.category.categories);

    const editedCategory = useSelector(state => state.category.category);

    const [category, setCategory] = useState(null);

    useEffect(() => {
        if(category === null) {
            dispatch(getCategory(props.match.params.id))

            dispatch(getCategories());

            if(editedCategory.title && ( editedCategory._id === props.match.params.id) ) {
                const editInfo = {title: editedCategory.title}
                editInfo.parent = editedCategory.parent ? editedCategory.parent : ''

                setCategory(() => (editInfo))
            }
        }
    }, [dispatch, editedCategory, category, props.match.params.id]);

    const changeCategory = e => setCategory({...category, [e.target.name]: e.target.value});

    const createCategory = e => {
        e.preventDefault();

        dispatch(editCategory(props.match.params.id ,category));
    };

    return (
        <div>
            { category !== null && <form className={classes.form} noValidate onSubmit={createCategory}>
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
                            option._id !== editedCategory._id && <MenuItem value={option._id} key={option._id}>{option.title}</MenuItem>
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
                    Редактировать категорию
                </Button>
            </form> }

        </div>
    );
};

export default EditCategory;