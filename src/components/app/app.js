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

export default class App extends Component {
    swapiService = new SwapiService()

    state = {
        showRandomPlanet: true,
        selectedPerson: 4,
        hasError: false
    }
    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
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

        const { getPerson,
                getStarship,
                getStarshipImg,
                getPersonImg} = this.swapiService;
        const personDetails = (
          <ItemDetails itemId={11}
                       getData={getPerson}
                       getImgUrl={getPersonImg}>
              <Record field="gender" label="Gender"/>
              <Record field="eyeColor" label="Eye Color"/>
          </ItemDetails>
        );
        const starshipDetails = (
          <ItemDetails itemId={5}
                       getData={getStarship}
                       getImgUrl={getStarshipImg}
                       >
              <Record field="model" label="Model"/>
              <Record field="length" label="Length"/>
              <Record field="costInCredits" label="Cost"/>

          </ItemDetails>
        );
        const planet = this.state.showRandomPlanet? <RandomPlanet/> : null;
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

                    <PeoplePage />

                    <Row left={personDetails} right={starshipDetails}/>
                </div>
            </ErrorBoudry>
        )
    };
};