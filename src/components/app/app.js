import React, {Component} from 'react';

import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-servicce";
import ErrorBoudry from "../error-boudry";
import { SwapiServiceProvider} from "../swapi-service-context";

import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage,
    PlanetsPage,
    StarshipPage,
    LoginPage,
    SecretPage} from '../pages'


import {BrowserRouter as Router,
    Route,
    Switch,
    Redirect} from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {
    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };
    onServiceChange =() => {
        console.log('change service')
        this.setState( ({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                                                    DummySwapiService :
                                                    SwapiService;
            return {
                swapiService: new Service()
            }
        })
    }

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
        console.log(this.state)
    }
    // обрабатывает ошибку в компоненте
    componentDidCatch(error, errorInfo) {
        console.log('DidCatch')
    }

    render() {

        const  { isLoggedIn } = this.props;
        return (
            <ErrorBoudry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="container">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet />

                            <Switch >
                                <Route path='/' exact render={ () => {
                                    return <h2>Welcome StarDB</h2>
                                }}/>
                                <Route path='/people/:id?'
                                       component={PeoplePage}/>
                                <Route path='/planets'
                                       component={PlanetsPage}/>
                                <Route path='/starships'
                                       exact
                                       component={StarshipPage}/>
                                <Route path='/starships/:id'
                                       render={({match, location, history}) => {
                                           const { id } = match.params
                                           return <StarshipDetails itemId={id}/>
                                       }}/>
                                <Route path='/login'
                                       render={() => (
                                           <LoginPage isLoggedIn={isLoggedIn}
                                                      onLogin={this.onLogin}/>
                                       )}/>
                                <Route path='/secret'
                                       render={ () => (
                                           <SecretPage isLoggedIn={isLoggedIn} />
                                       )}/>

                                <Redirect to='/'/>
                                {/*<Route render={()=> <h2>Page not found</h2>}/>*/}

                            </Switch>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoudry>
        )
    };
};