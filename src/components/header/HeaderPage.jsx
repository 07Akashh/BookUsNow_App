import React from 'react'
import Styles from './header.module.css'
import './header.css'
const HeaderPage = () => {
  return (
    <div className={Styles.container}>
    <ul className={Styles.item}>
        <li><h3 className={Styles.logo}>BookUsNow</h3></li>
        <li><button className={Styles.category}><i className="fa-solid fa-bars"></i> Categories</button></li>
        <li><div className={Styles.fontSearch}><input type="search" className={Styles.search} placeholder='DJI Phantom' />
          <i className="fa-solid fa-magnifying-glass"></i></div></li>
        <li><button className={Styles.favbtn}><i className="fa-solid fa-heart"></i><span> Favorites</span></button></li>
        <li><button className={Styles.signbtn}>Sign In</button><i className="fa-solid fa-user usericn"></i></li>
    </ul>
    <p className={Styles.location}><i className="fa-solid fa-location-dot"> </i> Mumbai, India  <a href="/"><i className="fa-solid fa-chevron-right fas"></i></a></p>
    <div className={Styles.header1}>
      
      <ul className={Styles.itemList}>
        <li>Live Shows</li>
        <li>Streams</li>
        <li>Movies</li>
        <li>Plays</li>
        <li>Events</li>
        <li>Sports</li>
        <li>Activities</li>
      </ul>
    </div>
    </div>
  )
}

export default HeaderPage
