import React, { useState } from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'

const Wrapper = () => {

  const [displaySide,setDisplaySide]=useState(false)

  return (
    <div className=''>
      
      <div className={`position-fixed ${displaySide?'d-none':''}`} style={{zIndex:99}}>
        <Sidebar />
      </div>
      <div className='position-sticky bg-warning set-shadow d-flex justify-content-center align-items-center  d-block d-sm-none' style={{ width: '35px', height: '35px', borderRadius: 200,zIndex:999,left:displaySide?'-35px':'39%',top:'0%',cursor:'pointer' }} onClick={()=>{setDisplaySide(!displaySide)}}>
        <i className={`bi bi-chevron-bar-${displaySide?'left':'right'} fs-5 pt-1`}></i>
      </div>
      <div className='set-padding'>
        <Outlet />
      </div>
    </div>
  )
}

export default Wrapper