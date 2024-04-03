import React from 'react';
import './homepage.css';
import RecoShows from '../shows/recommended/RecoShows';
import UpcomingShows from '../shows/upcoming/UpcomingShows';

function HomePage() {
    return (
        <div className='home'>
            <h1 className='heading'>Discover Exciting Events Happening Near You - Stay Tuned for Updates!</h1>
            <p className='paragraph'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <RecoShows/>
            <UpcomingShows/>
        </div>
    );
}

export default HomePage;
