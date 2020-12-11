import React from 'react';
import './ImgLeft.css';

export default function ImgLeft(props) {
    return(
        <div className='img-left'>
            <img src={props.imgSrc} className='img-left-img' />
            <div className='img-left-children'>
                {props.children}
            </div>
        </div>
    )
}