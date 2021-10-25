import {
    BrowserRouter as Router,
    Switch,
    Route,
   //  Link
 } from "react-router-dom";
import Details from "./detail";
 import Home from './home';
 


function AppRouter(props) {
    return (
        <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>

            <Route path="/home">
              <Home />
            </Route>

            <Route path="/detail">
              <Details />
            </Route>

            <Route path="/">
              <Home />
            </Route>

          </Switch>
      </Router>
    )
}
export default AppRouter;