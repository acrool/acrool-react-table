import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// Custom
import BaseUsed from './BaseUsed';


const Router = () => {

    return (
        <Switch>
            <Route path="/" children={<BaseUsed/>} exact/>
        </Switch>
    );
};

export default Router;

