import React from 'react';
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/login";
import AddCategory from "./components/Category/AddCategory/AddCategory";
import Container from "@material-ui/core/Container";
import CategoriesList from "./components/Category/CategoriesList/CategoriesList";
import EditCategory from "./components/Category/EditCategory/EditCategory";
import AddArticle from "./components/Article/AddArticle/AddArticle";
import ArticlesList from "./components/Article/ArticlesList/ArticlesList";
import EditArticle from "./components/Article/EditArticle/EditArticle";
import UserList from "./components/User/UserList/UserList";
import EditUser from "./components/User/EditUser/EditUser";

function App() {
    return (
        <>
            <div>
                <div>
                    <NavBar/>
                    <Container>
                        <Switch>
                            <Route path="/registration" exact component={Registration}/>
                            <Route path="/login" exact component={Login}/>

                            <Route path="/usersList" exact component={UserList}/>
                            <Route path="/editUser/:id" exact component={EditUser}/>

                            <Route path="/addCategory" exact component={AddCategory}/>
                            <Route path="/categoriesList" exact component={CategoriesList}/>
                            <Route path="/editCategory/:id" exact component={EditCategory}/>

                            <Route path="/addArticle" exact component={AddArticle}/>
                            <Route path="/articlesList" exact component={ArticlesList}/>
                            <Route path="/articlesList/:category" exact component={ArticlesList}/>
                            <Route path="/editArticle/:id" exact component={EditArticle}/>

                        </Switch>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default App;
