import React from "react"
import { Router, Switch, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import History from '../compounds/History/History'
import Home from './Home/Home'
import TwoPlayerGame from './TwoPlayerGame/TwoPlayerGame'
import { ROUTES } from '../config/common/routes'

export default function Decider() {
    return (
        <React.Fragment>
            <Grid>
                <Router history={History}>
                    <Switch>
                        <Route path={ROUTES.HOME} exact component={Home}></Route>
                        <Route path={ROUTES.TWO_PLAYER_GAME} exact component={TwoPlayerGame}></Route>
                    </Switch>
                </Router>
            </Grid>
        </React.Fragment>
    );
}

