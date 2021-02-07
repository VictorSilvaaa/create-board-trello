import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from './pages/landing/index'


const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/"  exac component={Landing}/>
        </Switch>
        </BrowserRouter>
    );
}

export default Routes;