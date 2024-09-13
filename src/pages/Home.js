import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
    <div>
      {/* <CategoryList/> */}
      {/* <HorizontalCardProduct  heading={"Top's Airpodes"}/> */}
      {/* <HorizontalCardProduct  heading={"Popular's Watches"}/>k */}
      <HeroSection/>  
      <VerticalCardProduct heading={"Mobiles"}/>
    </div>
  )
}

export default Home