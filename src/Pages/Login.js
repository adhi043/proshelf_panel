import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import CarouselSlider from '../Components/CarouselSlider'

const Login = () => {

    const navigate = useNavigate()
    const [activeTab,setActiveTab]=useState('Admin')

    return (
        <div className='mt-5'>
            <div id="form_wrapper">
                <div id="form_left">
                    <CarouselSlider />
                </div>
                <div className='d-flex flex-column gap-5 '>
                    <img src={require('../Assests/logo1.png')} alt='logo' style={{ width: '170px', height: '70px', objectFit: 'contain' }} />

                    <div className='d-flex gap-3 align-items-center'>
                        <div className={`p-1 px-3 bg-${activeTab==='Admin'?'warning':'light'} rounded-pill d-flex justify-content-center align-items-center set-shadow`} style={{ cursor: 'pointer', width: '140px' }} onClick={() => { setActiveTab('Admin') }}>
                            <h5 className='m-0 p-0'>Admin</h5>
                        </div>
                        
                        <div className={`p-1 px-3 bg-${activeTab==='Company'?'warning':'light'} rounded-pill d-flex justify-content-center align-items-center set-shadow`} style={{ cursor: 'pointer', width: '140px' }} onClick={() => { setActiveTab('Company') }}>
                            <h5 className='m-0 p-0'>Company</h5>
                        </div>
                        

                    </div>

                    <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3' style={{ height: '50px' }}>
                        <i className='bi bi-person'></i>
                        <input type='email' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Your Email' />
                    </div>
                    <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3' style={{ height: '50px' }}>
                        <i className='bi bi-lock'></i>
                        <input type='password' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Your Password' />
                    </div>

                    <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{ cursor: 'pointer', height: '50px' }} onClick={() => { navigate('/home') }}>
                        <h5 className='m-0 p-0'>Submit</h5>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login