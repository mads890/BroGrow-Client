import React from 'react';
import './ImgRight.css';

export default function ImgRight(props) {
    return(
        <div className='img-right'>
            <div className='img-right-children'>
                {props.children}
            </div>
            <img src={props.imgSrc} className='img-right-img' />
        </div>
    )
}