import Spinner from "../spinner";

import React, {Component} from 'react';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-servicce";

const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: null
        }

        componentDidMount() {
            const {getData} = this.props;
            getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                });
        };

        render() {
            const {data} = this.state;
            if (!data) {
                return <Spinner/>
            }
            return <View {...this.props} data={data}/>
        }
    };
}

export default withData;