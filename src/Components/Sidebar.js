import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Sidebar = () => {

    const location = useLocation();
    const isActive = (route) => location.pathname.includes(route);

    const navigate = useNavigate()


    return (
        <div className='bg-light py-3 pe-3' style={{ height: '100vh', width: '210px' }}>
            <div className='p-3 mb-2 d-flex justify-content-center align-items-center'>
                <img src={require('../Assests/logo.png')} alt='logo' style={{ width: '110px', height: '80px', objectFit: 'contain' }} />
            </div>

            <div className={`${
                isActive("/home")
                  ? "bg-warning border border-start-0 border-dark set-border set-shadow"
                  : ""
              } p-3 d-flex justify-content-between align-items-center rounded-3 gap-2 mb-3 px-5 ps-3`} style={{ cursor: 'pointer' }} onClick={() => { navigate('/home') }} >
                <i className="bi bi-ui-checks-grid"></i>
                <h5>Dashboard</h5>
            </div>

            
            <div className={`${
                isActive("/team")
                  ? "bg-warning border border-start-0 border-dark set-border set-shadow"
                  : ""
              } p-3 d-flex justify-content-between align-items-center rounded-3 gap-2 mb-3 px-5 ps-3`} style={{ cursor: 'pointer' }} onClick={() => { navigate('/team') }}  >
                <i className="bi bi-people-fill"></i>
                <h5>Team</h5>
            </div>
            
            <div className={`${
                isActive("/brand")
                  ? "bg-warning border border-start-0 border-dark set-border set-shadow"
                  : ""
              } p-3 d-flex justify-content-between align-items-center rounded-3 gap-2 mb-3 px-5 ps-3`} style={{ cursor: 'pointer' }} onClick={() => { navigate('/brand') }}  >
                <i className="bi bi-people-fill"></i>
                <h5>Brand</h5>
            </div>

            <div className={`${
                isActive("/company")
                  ? "bg-warning border border-start-0 border-dark set-border set-shadow"
                  : ""
              } p-3 d-flex justify-content-between align-items-center rounded-3 gap-2 mb-3 px-5 ps-3`} style={{ cursor: 'pointer' }} onClick={() => { navigate('/company') }}  >
                <i className="bi bi-building-fill"></i>
                <h5>Company</h5>
            </div>



            <div className={`${
                isActive("/product")
                  ? "bg-warning border border-start-0 border-dark set-border set-shadow"
                  : ""
              } p-3 d-flex justify-content-between align-items-center rounded-3 gap-2 mb-3 px-5 ps-3`} style={{ cursor: 'pointer' }} onClick={() => { navigate('/product') }}  >
                <i className="bi bi-boxes"></i>
                <h5>Product</h5>
            </div>

        </div>
    )
}

export default Sidebar