import React from 'react'

const CarouselSlider = () => {
    return (
        <div>
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={require('../Assests/slider1.png')} className="d-block w-100" alt="..." />
                        <h3 className='fw-bold text-center'>Home</h3>
                    </div>
                    <div className="carousel-item">
                        <img src={require('../Assests/slider2.png')} className="d-block w-100" alt="..." />
                        <h3 className='fw-bold text-center'>Tasks</h3>
                    </div>
                    <div className="carousel-item">
                        <img src={require('../Assests/slider3.png')} className="d-block w-100" alt="..." />
                        <h3 className='fw-bold text-center'>Analytics</h3>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}

export default CarouselSlider