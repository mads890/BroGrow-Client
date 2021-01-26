import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return(
            <div className='landing-page'>
                <div className='stripe-container'>
                    <div className='vertical-red'></div>
                    <div className='vertical-blue'></div>
                    <div className='horizontal-red'></div>
                    <div className='horizontal-blue'></div>
                </div>
                <div className='header-div'>
                    <div className='header-text'>
                        <h1>Crew</h1>
                        <h2>No Contact Networking</h2>
                        <p>After work, family, and taking out the trash, there’s almost no time left to grow personal and professional relationships. So we connect busy dudes looking for someone to grab a beer with, play a round, or shoot the shit. </p>
                        <Link className='join-link' to='/register'><b>Join Crew</b></Link>
                    </div>
                    <img className='header-img' src={require('../../Assets/Superman.png').default} alt='The Crew-per Hero' />
                </div>
                <div className='landing-div-right'>
                    <img className='testimonial-img' src={require('../../Assets/img1.png').default} alt='Men smiling' />
                    <div className='testimonial'>
                        <h3>Our Premise Is Simple:</h3>
                        <p>It’s Hard To Make Friends and Network As A Grown Man. It’s Even Harder During a Pandemic, which Is Why We Connect Every Bro With Another Dude Once Daily Via Email.</p>
                    </div>
                </div>
                <div className='stripe-container'>
                    <div className='diagonal-red-first'></div>
                    <div className='diagonal-blue-first'></div>
                    <div className='diagonal-navy-first'></div>
                </div>
                <div className='landing-div-left'>
                    <img className='testimonial-img mark' src={require('../../Assets/img2.png').default} alt='Men playing the bass guitar' />
                    <div className='testimonial'>
                        <h2>Jake M.</h2>
                        <h3>New York, NY</h3>
                        <p>“I just moved to the city and wanted to find somebody who played also played bass guitar. Through Crew, I linked up with someone who was also an Iowa transplant.”</p>
                    </div>
                </div>
                <div className='stripe-container'>
                    <div className='diagonal-red-second'></div>
                    <div className='diagonal-blue-second'></div>
                    <div className='diagonal-navy-second'></div>
                </div>
                <div className='landing-div-left'>
                    <div className='testimonial'>
                        <h2>Marcel F.</h2>
                        <h3>Charlotte, NC</h3>
                        <p>“My good buddies from high school are having kids and going to little league games. They don’t have time to ride anymore, and before Crew, it was typically difficult to  find other cyclists in the area.”</p>
                    </div>
                    <img className='testimonial-img' src={require('../../Assets/img3.png').default} alt='Men cycling' />
                </div>
                <div className='stripe-container'>
                    <div className='diagonal-red-third'></div>
                    <div className='diagonal-blue-third'></div>
                    <div className='diagonal-navy-third'></div>
                </div>
                <div className='landing-div-right'>
                    <img className='testimonial-img' src={require('../../Assets/img4.png').default} alt='Men on their laptops' />
                    <div className='testimonial'>
                        <h2>Ang Q.</h2>
                        <h3>San Francisco, CA</h3>
                        <p>“I started my company about six months ago, and while rewarding, it’s also draining socially. I have very little time left to go out and network. I signed up for Crew because I wanted to automate the process of meeting like-minded people with similar interests. No more hanging around meetups asking people what they do for a living.”</p>
                    </div>
                </div>
                <div className='stripe-container'>
                    <div className='diagonal-navy-fat'></div>
                    <div className='diagonal-blue-fat'></div>
                    <div className='diagonal-red-fat'></div>
                </div>
                <div className='recap-section'>
                    <h1>Recap Time.</h1>
                    <h2>Shall We Review The Process? We Shall.</h2>
                    <div className='numbered-list'>
                        <div className='numbered-list-item'>
                            <div className='item-number'>1</div>
                            <div className='item-text'>First off, we’ve got to get to know you. We’ll be asking some basic questions about your hobbies, interests, and favorite teams. Don’t worry, though. We’ll text you before we sell to big data. </div>
                        </div>
                        <div className='numbered-list-item'>
                            <div className='item-number'>2</div>
                            <div className='item-text'>Then we match you with other guys who have at least two overlapping attributes. We will not, under any circumstances, pair fans of rival teams. We’re better than that.</div>
                        </div>
                        <div className='numbered-list-item'>
                            <div className='item-number'>3</div>
                            <div className='item-text'>Then we send an intro email outlining why you’ll probably be friends, get along, and form a lifelong bond that will only be broken by death itself. We’ll include a little relevant conversation starter, just to break the ice. Something like, “Can you believe the Jets?” To which both of you should reply, “No, they’re killing me.”</div>
                        </div>
                        <Link className='join-link' to='/register'><b>Join Crew</b></Link>
                    </div>
                </div>
            </div>
        )
    }
}