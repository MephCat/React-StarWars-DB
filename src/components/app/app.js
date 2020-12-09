import React, {Component} from 'react';

import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-servicce";
import ErrorBoudry from "../error-boudry";
import { SwapiServiceProvider} from "../swapi-service-context";

import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage, PlanetsPage, StarshipPage} from '../pages'

export default class App extends Component {
    state = {
        swapiService: new SwapiService()
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

    // обрабатывает ошибку в компоненте
    componentDidCatch(error, errorInfo) {
        console.log('DidCatch')
    }

    render() {

        return (
            <ErrorBoudry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="container">
                        <Header onServiceChange={this.onServiceChange}/>
                        <RandomPlanet/>
                        <PeoplePage />
                        <PlanetsPage />
                        <StarshipPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoudry>
        )
    };
};