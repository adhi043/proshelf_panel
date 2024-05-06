import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router-dom'
import MapContext from '../../Components/MapContext';
import toast from 'react-simple-toasts';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';
import Swal from 'sweetalert2';

const AddTasks = () => {

    const { mapValue, setMapValue } = useContext(MapContext);


    const navigate = useNavigate()



    useEffect(() => {

        if (!mapValue) {
            Swal.fire({
                title: "Location",
                text: "Must first select location",
                icon: "question",
                confirmButtonText: 'Navigate',
                confirmButtonColor: "#FFC107",
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    try {
                        navigate('/OpenMap')
                        window.location.reload()
                    } catch (error) {
                        Swal.showValidationMessage(`
        Request failed: ${error}
      `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()

            });
        }

    }, [])



    const [companyData, setCompanyData] = useState([])


    useEffect(() => {
        try {

            axios.get(`${BaseUrl.baseUrl}/company/get`).then(res => {
                if (res.data.status === 'ok') {
                    setCompanyData(res.data.data)
                }
                else if (res.data.status === 'fail') {
                    toast('🚩' + res.data.message)
                }

            }).catch(err => {
                toast('🚨' + err.message)
            })


        } catch (err) {
            toast('🚨 Something went wrong!')
        }

    }, [])



    const [assignData, setBrandData] = useState([])


    useEffect(() => {
        try {

            axios.get(`${BaseUrl.baseUrl}/brand/get`).then(res => {
                if (res.data.status === 'ok') {
                    setBrandData(res.data.data)
                }
                else if (res.data.status === 'fail') {
                    toast('🚩' + res.data.message)
                }

            }).catch(err => {
                toast('🚨' + err.message)
            })


        } catch (err) {
            toast('🚨 Something went wrong!')
        }

    }, [])







    const [name, setName] = useState(null)
    const [lastDate, setLastDate] = useState(null)
    const [companyId, setCompanyId] = useState(null)
    const [assignId, setAssignId] = useState(null)


    const submit = () => {
        if (!name) {
            toast('🚨 Must enter name!')
        }
        else if (!lastDate) {
            toast('🚨 Must seleect last date!')
        }
        else if (!companyId) {
            toast('🚨 Must select company!')
        }
        else if (!mapValue) {
            toast('🚨 Must select location!')
        }
        else if (!assignId) {
            toast('🚨 Must select assign to!')
        }
        else {

            try {

                const param = new FormData()
                param.append('name', name)
                param.append('lastDate', lastDate)
                param.append('companyId', companyId)
                param.append('assignId', assignId)
                param.append('address', mapValue?.address)
                param.append('city', mapValue?.city)
                param.append('lat', mapValue?.lat)
                param.append('lng', mapValue?.lng)


                axios.post(`${BaseUrl.baseUrl}/company/create`, param).then(res => {
                    if (res.data.status === 'ok') {
                        setMapValue(null)
                        toast('🎉 Created Successfully!')
                        navigate('/company')
                    }
                    else if (res.data.status === 'fail') {
                        toast('🚩' + res.data.message)
                    }

                }).catch(err => {
                    toast('🚨' + err.message)
                })


            } catch (err) {
                toast('🚨 Something went wrong!')
            }

        }

    }



    return (
        <div>
            <div>
                <Header name={'Tasks'} />
            </div>


            <div className='bg-light rounded-3 p-3  mb-4 me-3'>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                    <h3>Add Task</h3>
                    {/* <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{cursor:'pointer'}} onClick={()=>{navigate('/addcompany')}}>
                        <h5 className='m-0 p-0'>Add</h5>
                    </div> */}
                </div>


                <div className='row  w-100'>


                    <div className='col-md-6 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <i className='bi bi-pencil'></i>
                            <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Task Name' onChange={(e) => { setName(e.target.value) }} />
                        </div>
                    </div>


                    <div className='col-md-6 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <i className='bi bi-pencil'></i>
                            <input type='date' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Select Last Date' onChange={(e) => { setLastDate(e.target.value) }} />
                        </div>
                    </div>


                    <div className='col-md-6 mb-4'>

                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <select class="form-select" aria-label="Default select example" onChange={(e) => { setCompanyId(e.target.value) }}>
                                <option selected>Select Company</option>
                                {companyData?.length > 0 ? companyData.map(i => {
                                    return (<>
                                        <option value={i?._id}>{i?.companyName}</option>
                                    </>)
                                })

                                    : <p>No data found!</p>}

                            </select>
                        </div>
                    </div>

                    <div className='col-md-6 mb-4'>

                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <select class="form-select" aria-label="Default select example" onChange={(e) => { setAssignId(e.target.value) }}>
                                <option selected>Select Assign To</option>
                                {assignData?.length > 0 ? assignData.map(i => {
                                    return (<>
                                        <option value={i?._id}>{i?.firstName}</option>
                                    </>)
                                })

                                    : <p>No data found!</p>}

                            </select>
                        </div>
                    </div>



                    {mapValue ?
                        <>
                            <div className='col-md-6 mb-4'>
                                <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                                    <i className='bi bi-pencil'></i>
                                    <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Latitude' disabled defaultValue={mapValue?.lat} />
                                </div>
                            </div>


                            <div className='col-md-6 mb-4'>
                                <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                                    <i className='bi bi-pencil'></i>
                                    <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Longitude' disabled defaultValue={mapValue?.lng} />
                                </div>
                            </div>


                            <div className='col-md-6 mb-4'>
                                <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                                    <i className='bi bi-pencil'></i>
                                    <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter City' disabled defaultValue={mapValue?.city} />
                                </div>
                            </div>


                            <div className='col-md-6 mb-4'>
                                <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                                    <i className='bi bi-pencil'></i>
                                    <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Address' disabled defaultValue={mapValue?.address} />
                                </div>
                            </div>

                        </>
                        : null}

                    <div className='col-md-12 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center h-auto position-relative'>
                            <div className='position-absolute rounded-3 w-100 d-flex justify-content-center align-items-center' style={{ height: '120px', backgroundColor: 'rgba(0,0,0,0.5)', cursor: 'pointer' }} onClick={() => {
                                navigate('/OpenMap')
                                window.location.reload()
                            }}>
                                <h4 className='text-white'>Select Company Location</h4>
                            </div>
                            <img src={require('../../Assests/map.png')} alt='logo' className='rounded-3' style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                        </div>
                    </div>


                </div>


                <div className='p-1 px-3 mb-5 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow ' style={{ cursor: 'pointer', width: '140px' }} onClick={() => { submit() }}>
                <h5 className='m-0 p-0'>Submit</h5>
            </div>



            </div>




        </div>
    )
}

export default AddTasks