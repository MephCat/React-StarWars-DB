import React, {Component} from 'react';

import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/swapi-servicce";
import ErrorButton from "../error-button";

export default class App extends Component {
    swapiService = new SwapiService()

    state = {
        showRandomPlanet: true,
        selectedPerson: 4,
        hasError: false
    }
    toggleRandomPlanet = () => {

    }

    // обрабатывает ошибку в компоненте
    componentDidCatch(error, errorInfo) {
        console.log('DidCatch')
        this.setState({hasError: true})
    }

    render() {
        if(this.state.hasError) {
            return <ErrorIndicator/>
        }
        const planet = this.state.showRandomPlanet? <RandomPlanet/> : null;
        return (
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

                <PeoplePage />

            </div>
        )
    };
};