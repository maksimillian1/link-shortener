import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CreatePage } from './pages/CreatePage';
import { LinksPage } from './pages/LinksPage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';


export const useRoutes = isAuthentificated => {
    if(isAuthentificated) {
        return (
            <Switch>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );  
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}