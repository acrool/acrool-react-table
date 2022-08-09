import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// Custom
import BaseUsed from './BaseUsed';
import CheckedUsed from './CheckedUsed';


const Router = () => {

    return (
        <Switch>
            <Route path="/" children={<BaseUsed/>} exact/>
            <Route path="/checkedUsed" children={<CheckedUsed/>} exact/>
        </Switch>
    );
};

export default Router;

