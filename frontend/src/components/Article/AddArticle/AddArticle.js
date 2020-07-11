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
import Grid from "@material-ui/core/Grid";
import {addArticle} from "../../../store/actions/article";

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

const AddArticle = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const categories = useSelector(state => state.category.categories);

    const initialArticle = {
        title: '',
        description: '',
        category: '',
        image: ''
    };

    const [article, setArticle] = useState(initialArticle);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const changeArticle = e => setArticle({...article, [e.target.name]: e.target.value});

    const createCategory = e => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(initialArticle).forEach(e => {
            data.append(e, article[e])
        });

        dispatch(addArticle(data));
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
                    value={article.title}
                    onChange={changeArticle}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    rows={4}
                    multiline
                    value={article.description}
                    onChange={changeArticle}
                />

                {categories[0] &&
                <FormControl variant="filled" style={{width: '50%'}}>
                    <InputLabel htmlFor="parent">Category</InputLabel>
                    <Select
                        id='parent'
                        variant="outlined"
                        value={article.category}
                        onChange={changeArticle}
                        name='category'
                        labelId='Parent'
                        fullWidth
                    >
                        {categories.map(option => (
                            <MenuItem value={option._id} key={option._id}>{option.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                }

                <Grid>
                    <input
                        accept="image/*"
                        className={classes.input}
                        style={{ display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={e => setArticle({...article ,image: e.target.files[0]})}
                    />
                    <label htmlFor="raised-button-file">
                        <Button type='button' component="span" className={classes.button}>
                            Upload image
                        </Button>
                    </label>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Создать статью
                </Button>
            </form>

        </div>
    );
};

export default AddArticle;