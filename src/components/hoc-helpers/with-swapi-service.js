import React from 'react';
import {SwapiServiceConsumer} from "../swapi-service-context";

const withSwapiService = ( mapMethodexToProps ) => ( Wrapped ) => {
    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) => {
                        const serviceProps = mapMethodexToProps(swapiService);
                        return (
                            <Wrapped {...props} {...serviceProps}/>
                        )
                    }
                }
            </SwapiServiceConsumer>
        )
    }
}
export default withSwapiService