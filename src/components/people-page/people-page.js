import React, { Component } from 'react';

import './people-page.css';

import ItemList from "../item-list";
import PersonDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import ErrorBoudry from "../error-boudry";

import SwapiService from "../../services/swapi-servicce";
import Row from "../row";




export default class PeoplePage extends Component{
    swapiService = new SwapiService()

    state = {
        selectedPerson: 4,
        hasError: false
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    }
    render() {
        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>

                {(i) => (
                    `${i.name} ( ${i.birthYear})`
                )}
            </ItemList>
        )
        const personDetails = (
            <ErrorBoudry>
                <PersonDetails personId={this.state.selectedPerson}/>
            </ErrorBoudry>
        );
        return (
                <Row left={itemList} right={personDetails}/>
        )
    }
}