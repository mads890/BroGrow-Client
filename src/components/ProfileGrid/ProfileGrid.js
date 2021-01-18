import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProfileGrid.css';

export default class ProfileGrid extends Component {
    render() {
        const userId = this.props.userId
        let items = this.props.items.map(item => 
            (!item.checked === true)
            ?   <div className='grid-item' id={item.id} key={item.id} >
                    {item.name}
                </div>
            :   <div className='grid-item checked' id={item.id} key={item.id} >
                {item.name}
                </div>
            )
        return(
            <div className='profile-grid'>
                {items}
                <Link className='add-link' to={`/user/${userId}/update/${this.props.section}`}>+</Link>
            </div>
        )
    }
}