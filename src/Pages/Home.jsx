import React from 'react'
import Popular from '../Components/Popular/Popular'
import Slideshow from '../Components/Hero/Slideshow'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/Category'
import Navbar from '../Components/Navbar/Navbar'
import './CSS/Home.css'

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Slideshow/>
        <NewCollections/>
        {/* <Offers/> */}
        <Popular/>
    </div>
  )
}

export default Home