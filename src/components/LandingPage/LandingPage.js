import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './LandingPage.css';
import ImgLeft from '../ImgLeft/ImgLeft';
import ImgRight from '../ImgRight/ImgRight';

export default class LandingPage extends Component {
    render() {
        return(
            <div className='landing-page'>
                <ImgRight imgSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycRZLGS1G7WPiXiEvhrLC5VX0bjCRXizpPg&usqp=CAU'}>
                    <h1>Crew</h1>
                    <h3>No Contact Networking</h3>
                    <p>After work, family, and taking out the trash, there’s almost no time left to grow personal and professional relationships. So we connect busy dudes looking for someone to grab a beer with, play a round, or shoot the shit. </p>
                    <Link to='/register'>Join Crew</Link>
                </ImgRight>
                <ImgLeft imgSrc={'https://comps.canstockphoto.com/young-cheerful-caucasian-man-dancing-eps-vector_csp55575648.jpg'}>
                    <p>Our Premise Is Simple:</p>
                    <p>It’s Hard To Make Friends and Network As A Grown Man.</p>
                    <p>It’s Even Harder During a Pandemic.</p>
                    <p>Which Is Why We Connect Every Bro With Another Dude Once Daily Via Email.</p>
                </ImgLeft>
                <ImgRight imgSrc={'https://st3.depositphotos.com/1001599/14645/v/950/depositphotos_146455615-stock-illustration-man-dreaming-about-buying-new.jpg'}>
                    <p>How?</p>
                    <p>We Compare Interests, Hobbies, Professions, And Values To Match Bros Who Would Probably Be Friends.</p>
                    <p>Then We Make Our Morning Email Introduction That Highlights Commonalities Before Taking Our Leave.</p>
                    <button>Button</button>
                </ImgRight>
            </div>
        )
    }
}