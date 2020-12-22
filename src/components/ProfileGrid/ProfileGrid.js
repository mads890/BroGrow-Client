import React, { Component } from 'react';
import './ProfileGrid.css';

export default class ProfileGrid extends Component {
    render() {
        let items = this.props.items.map(item => 
            (!item.checked === true)
            ?   <div onClick={(e) => this.props.handleClick(e.target.getAttribute('id'))} className='grid-item' id={item.id} key={item.id} >
                    {item.name}
                </div>
            :   <div onClick={(e) => this.props.handleClick(e.target.getAttribute('id'))} className='grid-item checked' id={item.id} key={item.id} >
                {item.name}
                </div>
            )
        return(
            <div className='profile-grid'>
                {items}
            </div>
        )
    }
}