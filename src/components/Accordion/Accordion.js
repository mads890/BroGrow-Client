import React, { Component } from 'react';
import './Accordion.css';

export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    toggleOpen = () => {
        this.state.isOpen
        ? this.setState({ isOpen: false })
        : this.setState({ isOpen: true })
    }

    render() {
        return(
            <div className='accordion'>
                <div className='accordion-button' onClick={this.toggleOpen}>
                    <h2>{this.props.title}</h2>
                </div>
                {this.state.isOpen && <div className='accordion-grid'>{this.props.children}</div>}
            </div>
        )
    }
}