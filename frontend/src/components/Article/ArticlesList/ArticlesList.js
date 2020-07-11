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
import {deleteArticle, getArticles} from "../../../store/actions/article";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const ArticlesList = props => {
    const dispatch = useDispatch();

    const articles = useSelector(state => state.article.articles);
    const categories = useSelector(state => state.category.categories);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getArticles(props.match.params.category));
    }, [dispatch, props.match.params.category]);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to='/addArticle'
            >
                Создать статью
            </Button>
            <Grid container>
                <Grid item container lg={2}
                      style={{display: 'block', paddingRight: '5px', borderRight: '2px solid #ccc'}}>
                    <Typography
                        variant='h5'
                    >
                        Categories
                    </Typography>
                    <NavLink
                        style={{textDecoration: 'none', color: '#000'}}
                        to={'/articlesList'}
                    >
                        <Card style={{marginBottom: '3px', background: '#F8F8F8'}}>
                            <CardContent>
                                <Typography>
                                    All
                                </Typography>
                            </CardContent>
                        </Card>
                    </NavLink>
                    {categories && categories.map(e => (
                        <NavLink
                            key={e._id}
                            style={{textDecoration: 'none', color: '#000'}}
                            to={'/articlesList/' + e._id}
                        >
                            <Card style={{marginBottom: '3px', background: '#F8F8F8'}}>
                                <CardContent>
                                    <Typography>
                                        {e.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </NavLink>
                    ))}
                </Grid>
                <Grid item container style={{display: 'flex', flexWrap: 'wrap'}} lg={10}>
                    {articles && articles.map(e => (
                        <Grid item key={e._id} sm={12}
                              style={{minWidth: '80px', margin: '0 auto', padding: '5px', boxSizing: 'border-box'}}>
                            <Card style={{position: 'relative'}}>
                                {e.image &&
                                <CardMedia
                                    style={{width: '100%',height: '400px', maxHeight: '500px'}}
                                    image={e.image}
                                    title={e.title}
                                />
                                }
                                <CardContent>
                                    <Typography gutterBottom style={{fontSize: '20px', marginBottom: '20px'}}>
                                        <span style={{display: 'block', fontSize: '22px'}}> <b>{e.title}</b> </span>

                                        <span style={{
                                            display: 'block',
                                            fontSize: '20px'
                                        }}> <b>category: </b> {e.category.title} </span>

                                        <span style={{
                                            display: 'block',
                                            fontSize: '20px'
                                        }}> <b>user: </b> {e.user.displayName} </span>

                                        <span style={{display: 'block', fontSize: '16px'}}> {e.description} </span>
                                    </Typography>
                                    <div style={{display: 'flex'}}>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            style={{
                                                position: 'absolute',
                                                bottom: '5px',
                                                right: '5px',
                                                cursor: 'pointer'
                                            }}
                                            component={NavLink}
                                            to={'/editArticle/' + e._id}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            onClick={() => dispatch(deleteArticle(e._id))}
                                            aria-label="delete"
                                            size="small"
                                            style={{position: 'absolute', bottom: '5px', right: '40px'}}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default ArticlesList;