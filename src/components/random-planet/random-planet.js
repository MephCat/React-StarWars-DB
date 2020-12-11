import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SwapiService from '../../services/swapi-servicce';

import './random-planet.css';
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    // static propTypes = {
    //     // propName - пропс для которого проводим валидыцию
    //     // componentName- компонент для которого проводим валидацию
    //     updateInterval: (props, propName, componentName) => {
    //         const val = props[propName]
    //         if(typeof val ==="number" && !isNaN(val)){
    //             return null;
    //         }
    //         return new TypeError(`${componentName}: ${propName} must be number`)
    //     }
    // }
    // аналогично
    static propTypes = {
        updateInterval: PropTypes.number.isRequired
    }
    constructor() {
        super();
        console.log('constructor')
    }
    componentDidMount() {
        const { updateInterval } = this.props;
        this.interval = setInterval( this.updatePlanet() , updateInterval);
        console.log('DidMount')
    }

    // используется перед очисткой DOM(удалён компонент)
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        });
    };

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    updatePlanet = () => {
        const id = Math.floor( Math.random()*25) + 3;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        console.log('render')
        const {planet, loading, error} = this.state;
        const hasData = !(loading || error);
        const errorMessage = error ? <ErrorIndicator />: null
        const spinner = loading ? <Spinner/> : null
        const content = hasData ? <PlanetView planet={planet}/> : null

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }

    // для компонентов классов
    // static defaultProps = {
    //     updateInterval: 10000
    // }
}
RandomPlanet.defaulProps = {
    updateInterval: 10000
}

const PlanetView = ({planet}) => {
    const {
        id,
        name,
        population,
        rotationPeriod,
        diameter
    } = planet;
    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
            alt={name}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}