import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './account/Login';
import Profile from './account/Profile';
import ItemList from './item/ItemList';
import ItemDetail from './item/ItemDetail';
import ItemCreate from './item/ItemCreate';
import ItemUpdate from './item/ItemUpdate';
import Logout from './account/Logout';
import PostCreate from './posts/PostCreate';
import ProductList from './product/ProductList';
import ProductDetail from './product/ProductDetail';
import Admin from './account/Admin';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            {/* Item urls */}
            <Route exact path="/items" component={ItemList} />
            <Route exact path="/items/:itemID" component={ItemDetail} />
            <Route exact path="/newitem" component={ItemCreate} />
            <Route exact path="/updateitem/:itemID" component={ItemUpdate} />
            {/* Product */}
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:id" component={ProductDetail} />
            {/* Posts urls */}
            <Route exact path="/newpost" component={PostCreate} />
            {/* User urls */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />           
            <Route exact path="/profile" component={Profile} />            
            <Route exact path="/admin" component={Admin} />            
        </Switch>
    )    
}
export default BaseRouter;