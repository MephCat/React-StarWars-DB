import React, {Component} from 'react';

import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/swapi-servicce";
import ErrorButton from "../error-button";
import ErrorBoudry from "../error-boudry";
import Row from "../row";

import ItemDetails, { Record } from "../item-details/item-details";

import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PlanetList,
    PersonList,
    StarshipList
} from "../sw-components";


export default class App extends Component {
    swapiService = new SwapiService()

    state = {
        showRandomPlanet: true
    };
    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    // обрабатывает ошибку в компоненте
    componentDidCatch(error, errorInfo) {
        console.log('DidCatch')
    }

    render() {
        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;
        const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >

                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />

            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}>

                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />
            </ItemDetails>
        );
        return (
            <ErrorBoudry>
                <div className="container">
                    <Header />
                    {planet}

                    <div className="row mb2 button-row">
                        <button className="toggle-planet btn btn-warning btn-lg"
                                onClick={this.toggleRandomPlanet}
                        >
                            Toggle Random Planet
                        </button>
                        <ErrorButton/>
                    </div>
                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={5}/>
                    <StarshipDetails itemId={9} />
                    <PersonList >
                        { ({name}) => <span>{name}</span>}
                    </PersonList>
                </div>
            </ErrorBoudry>
        )
    };
};