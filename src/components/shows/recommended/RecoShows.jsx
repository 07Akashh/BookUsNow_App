import React, { useEffect, useState } from 'react';
import Styles from './RecoShows.module.css';

function RecoShows() {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetchEventData();
    }, []);

    const fetchEventData = async () => {
        try {
            const response = await fetch('https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();


            if (typeof data === 'object' && data !== null) {
                setEvents(data);
            } else {
                console.error('Fetched data is not an object:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getFileIdFromUrl = (url) => {
        const startIndex = url.indexOf('/d/') + 3;
        const endIndex = url.indexOf('/view');
        return url.substring(startIndex, endIndex);
    };

    return (
    <div>
    <div className={Styles.shows}>
                <h1>Recommended Shows <i className="fa-solid fa-arrow-right-long arrow"></i></h1>
                <a href="/">See All</a>
            </div>
            <div className={Styles.showsList}>
                <div className={Styles.containerCard}>
                    <div className={Styles.cardContainer}>
                        {events && (() => {
                            const elements = [];
                            let index = 0; // Initialize index for unique keys
                            for (const key in events) {
                                const event = events[key];
                                for (const eventkey in event) {
                                    const events = event[eventkey]
                                    const eventDate = new Date(events.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                                    const formattedWeather = events.weather.replace(/C$/, '°C');
                                    const fileId = getFileIdFromUrl(events.imgUrl);
                                    const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
                                    elements.push(
                                        <div key={index++} className={Styles.card} style={{ backgroundImage: `url(${imageUrl})` }}>
                                            <div className={Styles.cardContent}>
                                                <h3 className={Styles.name}>
                                                    {events.eventName.length > 20
                                                        ? events.eventName.split(' ')[0] // Print the first word if the length is greater than 15
                                                        : events.eventName.split(' ').slice(0, 2).join(' ')} ...</h3>
                                                <p className={Styles.address}><i className="fa-solid fasL fa-location-dot"> </i>{events.cityName}</p>
                                                <p className={Styles.date}> {eventDate}</p>
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

export default RecoShows

