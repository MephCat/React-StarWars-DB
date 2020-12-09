import React, { Component } from 'react';

import './item-details.css';
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export {
    Record
};


export default class ItemDetails extends Component {

    state = {
        item: null,
        img: null
    }

    componentDidMount() {
        // this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.personId !== prevProps.personId){
            this.updateItem()
        }
    }


    updateItem() {
        const { itemId, getData, getImgUrl } = this.props;
        if( !itemId ) {
            return ;
        }
        getData(itemId)
            .then((item) => {
                this.setState({item , img: getImgUrl(item) })
            })
    }
    render() {
        const { item, img } = this.state
        if(!item){
            return <span>
                Select a person from list
            </span>
        }

        const { name} = this.state.item;
        return (
            <div className="person-details card">
                <img className="person-image"
                     src={img}
                     alt={name} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child,idx) => {
                                return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                    <ErrorButton/>

                </div>
            </div>
        )
    }
}
