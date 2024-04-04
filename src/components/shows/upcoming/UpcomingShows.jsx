import React, { useState, useEffect ,Suspense} from 'react';
import Styles from './UpcomingShows.module.css'
function UpcomingShows() {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const getFileIdFromUrl = (url) => {
        const startIndex = url.indexOf('/d/') + 3;
        const endIndex = url.indexOf('/view');
        return url.substring(startIndex, endIndex);
    };
    
    async function fetchData() {
        setIsLoading(true);
        let page = 1;
        let allEvents = [];
        try {
            while (page <= 5) {
                const response = await fetch(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const datas = await response.json();
                const data = datas.events;
                allEvents = allEvents.concat(data);
                console.log(allEvents)
                setUpcomingEvents(allEvents);
                if (data.length === 0) {
                    
                    break;
                }
                page++;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    }

    return (
        <div>
            <div className={Styles.upcoming}>
            <div className={Styles.upcSticky}>
                <h1>Upcoming Shows <i className="fa-solid fa-arrow-right-long arrow"></i></h1>
                </div>
                <div className={Styles.container}>
                    <div className={Styles.items}>
                    <Suspense>
                            {upcomingEvents.map((event, index) => (
                                <div key={index} className={Styles.card1}>
                                    <img src={`https://drive.google.com/thumbnail?id=${getFileIdFromUrl(event.imgUrl)}`} alt={event.eventName} className={Styles.eventImg} />
                                    <p className={Styles.date}>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <div className={Styles.cardContent}>
                                        <h3 className={Styles.name}>{event.eventName}</h3>
                                        <p className={Styles.location}><i className="fa-solid fasL fa-location-dot"></i>{event.cityName}</p>
                                        <p className={Styles.dst}>{event.weather.replace(/C$/, '°C')} | {Math.trunc(Math.abs(event.distanceKm / 100))} km</p>
                                    </div>
                                </div>
                            ))}
                        </Suspense>
                    </div>
                    {isLoading && <div className={Styles.loading}>Loading...</div>}
                </div>
            </div>
        </div>
    );
}

export default UpcomingShows
