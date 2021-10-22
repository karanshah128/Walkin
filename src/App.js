
import React, { Component } from 'react';
import PrivateRoutes from './PrivateRoutes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WithGlobalState from './WithGlobalState';
import BackgroundLoader from './BackgroundLoader';
import ErrorBoundary from './ErrorBoundary';
import { StateProvider } from './Context';
import Login from "./Component/Login/View/Login"
import EntryMode from "./Component/EntryMode/View/EntryMode"
import CustomerDetails from "./Component/CutomerDetails/View/CustomerDetails"
import EditDetails from "./Component/EditDetails/View/EditDetails"
import Logout from "./Component/Logout/View/Logout"




class App extends Component {

  componentDidCatch(err) {

    this.props.history.push({
      pathname: '/',
    });
  }

  render() {
    return (

      <ErrorBoundary>
        <React.Suspense fallback={<BackgroundLoader />}>
          <StateProvider>
            <BrowserRouter >
              <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoutes>
                  <Switch>
                    <Route exact path="/EntryMode" component={EntryMode} />
                    <Route exact path="/CustomerDetails" component={CustomerDetails} />
                    <Route exact path="/EditDetails" component={EditDetails} />
                    <Route exact path="/Logout" component={Logout} />
                  </Switch>
                </PrivateRoutes>


              </Switch>
            </BrowserRouter>
          </StateProvider>
        </React.Suspense>
      </ErrorBoundary>






    );
  }
}

export default App;