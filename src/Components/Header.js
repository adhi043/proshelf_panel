import React from 'react'

const Header = ({name}) => {
  return (
    <div className='p-4 d-flex align-items-center justify-content-between'>
      <div className='d-none d-sm-flex p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center'>
          <h6 className='m-0 p-0'>{name}</h6>
      </div>

      <div className='  d-flex justify-content-center align-items-center'>
                <img src={require('../Assests/logo1.png')} alt='logo' style={{ width: '170px', height: '70px', objectFit: 'contain' }} />
            </div>


      <div className='d-flex justify-content-between align-items-center gap-3'>
      <h5>Hello Admin!</h5>
      <img src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg' style={{width:'55px',height:'55px',borderRadius:200}}/>
      </div>
      
    </div>
  )
}

export default Header