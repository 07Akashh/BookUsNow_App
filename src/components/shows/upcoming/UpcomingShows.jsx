import React, { useState, useEffect } from 'react';
import Styles from './UpcomingShows.module.css'
function UpcomingShows() {
    const [upcomingEvent, setUpcomingEvent] = useState(null)

    const getFileIdFromUrl = (url) => {
        const startIndex = url.indexOf('/d/') + 3;
        const endIndex = url.indexOf('/view');
        return url.substring(startIndex, endIndex);
    };
    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch('https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                response.json() // Parse response to JSON
                    .then(data => {
                        setUpcomingEvent(data); // Set the state with the fetched data
                    });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    return (
        <div>
            <div className={Styles.upcoming}>
                <h1>Upcoming Shows <i className="fa-solid fa-arrow-right-long arrow"></i></h1>
                <div className={Styles.container}>
                    <div className={Styles.items}>
                        {upcomingEvent && (() => {
                            const elements = [];
                            let index = 0;
                            for (const key in upcomingEvent) {
                                const event = upcomingEvent[key];
                                for (const eventkey in event) {
                                    const events = event[eventkey]
                                    const eventDate = new Date(events.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                                    const formattedWeather = events.weather.replace(/C$/, '°C');
                                    const fileId = getFileIdFromUrl(events.imgUrl);
                                    const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
                                    elements.push(
                                        <div key={index++} className={Styles.card1} >
                                            <img src={imageUrl} alt={events.eventName} className={Styles.eventImg}/>
                                            <p className={Styles.date}> {eventDate}</p>
                                            <div className={Styles.cardContent}>
                                                <h3 className={Styles.name}>
                                                    {events.eventName}</h3>
                                                <p className={Styles.location}><i className="fa-solid fasL fa-location-dot"> </i>{events.cityName}</p>
                                                <p className={Styles.dst}>{formattedWeather} | {Math.trunc(Math.abs(events.distanceKm / 100))} km</p>

                                            </div>
                                        </div>
                                    );
                                }
                            }
                            return elements;
                        })()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingShows
