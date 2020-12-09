import React from 'react';

import ItemDetails, { Record } from '../item-details';
import SwapiService from "../../services/swapi-servicce";

const swapiService = new SwapiService();

const {
    getPerson,
    getPlanet,
    getStarship,
    getPersonImg,
    getPlanetImg,
    getStarshipImg
} = swapiService;

const PersonDetails = ({ itemId }) => {
    return (
        <ItemDetails itemId={itemId}
                     getData={getPerson}
                     getImgUrl={getPersonImg}>
            <Record field="gender" label="Gender"/>
            <Record field="eyeColor" label="Eye Color"/>
        </ItemDetails>
    )
};
const PlanetDetails = ({itemId}) => {
    return (
        <ItemDetails itemId={itemId}
                     getData={getPlanet}
                     getImgUrl={getPlanetImg}>
            <Record field="population" label="Population"/>
            <Record field="rotationPeriod" label="Rotation Period"/>
            <Record field="diameter" label="Diameter"/>

        </ItemDetails>
    )
};
const StarshipDetails = ({itemId}) => {
    return (
        <ItemDetails itemId={itemId}
                     getData={getStarship}
                     getImgUrl={getStarshipImg}
        >
            <Record field="model" label="Model"/>
            <Record field="length" label="Length"/>
            <Record field="costInCredits" label="Cost"/>

        </ItemDetails>
    )
};

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}