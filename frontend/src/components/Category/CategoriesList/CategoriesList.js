import React, {useEffect} from 'react';
import {deleteCategory, getCategories} from "../../../store/actions/category";
import {useDispatch, useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const CategoriesList = () => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.category.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to='/addCategory'
            >
                Создать категорию
            </Button>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>

                {categories && categories.map(e => (
                    <Card key={e._id} style={{
                        maxWidth: '25%',
                        minWidth: '80px',
                        maxHeight: '120px',
                        position: 'relative',
                        margin: '5px'
                    }}>
                        <CardContent>
                            <Typography gutterBottom style={{fontSize: '20px', marginBottom: '20px'}}>
                                <span style={{display: 'block', fontSize: '22px'}}> <b>{e.title}</b> </span>
                                {e.parent &&
                                <span style={{display: 'block'}}><b>parent: </b> {e.parent.title}</span>
                                }
                            </Typography>
                            <div style={{display: 'flex'}}>
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    style={{position: 'absolute', bottom: '5px', right: '5px', cursor: 'pointer'}}
                                    component={NavLink}
                                    to={'/editCategory/' + e._id}
                                >
                                    <EditIcon/>
                                </IconButton>

                                <IconButton
                                    onClick={() => dispatch(deleteCategory(e._id))}
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

export default CategoriesList;