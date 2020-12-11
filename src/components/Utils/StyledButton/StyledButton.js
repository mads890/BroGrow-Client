import React from 'react';
import { Link } from 'react-router-dom';
import './StyledButton.css';

export default function StyledButton() {
    return(
        <Link to={this.props.to}>
            <button className={`${this.props.text}-button`}>
                {this.props.text}
            </button>
        </Link>
    )
}