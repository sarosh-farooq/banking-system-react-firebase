import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/all-customers");
  }

  return (
    <div id="box">
      <h2>We Tried to provide best banking experience <br /> And help ypu to transfer your money easily</h2>
      <button onClick={handleClick}>View All Customer</button>
    </div>

  )
}

export default Home