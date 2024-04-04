import React, { useState, useEffect } from 'react';
import Styles from './UpcomingShows.module.css';
import { useInView } from 'react-intersection-observer';
import Loader from '../../loader/loader';

// This package we use to see if perticular element is comes in user view or not .
// Login behind use this package is : we will track last element every time
// as soon as the last element comes in the user view we will call the api for next data .


export default function LazyUpcomingShows() {

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(true)
    const [isLastPageFetched, setIsLastPageFetched] = useState(false)
    const [pageCount, setPageCount] = useState(0)

    const [ref, inView] = useInView();

    // using this ref to attach the last element so that we can tract that last element has came in user view or not .
    // ref will attach to last element to track.
    // inView will be true when that element will come in user view

    useEffect(() => {
        //  if last element is in user view and all pages data is not fetched
        //  we will set isFetchingData true to fetch next page data.
        if (inView && !isLastPageFetched) {
            setIsFetchingData(true)
        }
    }, [inView])

    useEffect(() => {
        //  if isFetchingData = true, will call the api
        if (isFetchingData) {
            fetchData()
        }
    }, [isFetchingData])

    const getFileIdFromUrl = (url) => {
        const startIndex = url.indexOf('/d/') + 3;
        const endIndex = url.indexOf('/view');
        return url.substring(startIndex, endIndex);
    };


    async function fetchData() {

        try {
            const response = await fetch(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${pageCount + 1}&type=upcoming`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const {
                events = [],
                totalPages = '',
                page = ''
            } = await response.json();
            //  here we have destructured the data .

            setUpcomingEvents([
                ...upcomingEvents,
                ...events
            ]);
            setPageCount(pageCount + 1)

            setIsLastPageFetched(totalPages === page)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsFetchingData(false)
        }
    }

    return (
        <div>
            <div className={Styles.upcoming}>
                <div className={Styles.sticky}>
                    <div className={Styles.upcSticky}>
                        <h1>Upcoming Shows <i className="fa-solid fa-arrow-right-long arrow"></i></h1>
                        <a href="/" className={Styles.seeAll}>See All</a>
                    </div>
                </div>
                <div className={Styles.container}>
                    <div className={Styles.items}>
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className={Styles.card1} ref={index === upcomingEvents.length - 1 ? ref : null}>
                                <img src={`https://drive.google.com/thumbnail?id=${getFileIdFromUrl(event.imgUrl)}`} alt={event.eventName} className={Styles.eventImg} />
                                <p className={Styles.date}>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <div className={Styles.cardContent}>
                                    <h3 className={Styles.name}>{event.eventName}</h3>
                                    <p className={Styles.location}><i className="fa-solid fasL fa-location-dot"></i>{event.cityName}</p>
                                    <p className={Styles.dst}>{event.weather.replace(/C$/, '°C')} | {Math.trunc(Math.abs(event.distanceKm / 100))} km</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {
                isFetchingData && (
                    <Loader />
                )
            }
        </div>
    );
}
