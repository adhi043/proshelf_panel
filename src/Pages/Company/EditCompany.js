import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import {  useNavigate, useParams } from 'react-router-dom'
import MapContext from '../../Components/MapContext';
import toast from 'react-simple-toasts';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';
import Swal from 'sweetalert2';

const EditCompany = () => {

    const { mapValue, setMapValue } = useContext(MapContext);
    const navigate = useNavigate()
    const {id}=useParams()

    


    const [companyName, setCompanyName] = useState(null)
    const [image, setImage] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState(null)
    const [cofirmPassword, setConfirmPassword] = useState(null)
    const [aboutCompany, setAboutCompany] = useState(null)

    

    const [data, setData] = useState({})


    useEffect(() => {
        try {

            axios.get(`${BaseUrl.baseUrl}/company/get/${id}`).then(res => {
                if (res.data.status === 'ok') {
                    setData(res.data.data)
                    setCompanyName(res.data.data.companyName)
                    setEmail(res.data.data.email)
                    setPhone(res.data.data.phone)
                    setPassword(res.data.data.password)
                    setAboutCompany(res.data.data.aboutCompany)
                    setMapValue({
                        lat: res.data.data?.lat,
                        lng: res.data.data?.lng,
                        address: res.data.data.address,
                        city: res.data.data.city
                    })
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



    // useEffect(() => {

    //     if (!mapValue) {
    //         Swal.fire({
    //             title: "Location",
    //             text: "Must first select location",
    //             icon: "question",
    //             confirmButtonText: 'Navigate',
    //             confirmButtonColor: "#FFC107",
    //             showLoaderOnConfirm: true,
    //             preConfirm: async () => {
    //                 try {
    //                     navigate('/OpenMap')
    //                     window.location.reload()
    //                 } catch (error) {
    //                     Swal.showValidationMessage(`
    //     Request failed: ${error}
    //   `);
    //                 }
    //             },
    //             allowOutsideClick: () => !Swal.isLoading()
            
    //         });
    //     }

    // }, [])



    const submit = () => {
        

            try {

                const param=new FormData()
                if(image){
                    param.append('image',image)
                }
                if(companyName!==data?.companyName){
                    param.append('companyName',companyName)
                }
                if(aboutCompany!==data?.aboutCompany){
                param.append('aboutCompany',aboutCompany)
                }
                if(email!==data?.email){
                    param.append('email',email)
                }
                if(phone!==data?.phone){
                    param.append('phone',phone)
                }
                if(password!==data?.password){
                    param.append('password',password)
                }
                param.append('address',mapValue?.address)
                param.append('city',mapValue?.city)
                param.append('lat',mapValue?.lat)
                param.append('lng',mapValue?.lng)


                axios.put(`${BaseUrl.baseUrl}/company/update/${id}`,param).then(res => {
                    if (res.data.status === 'ok') {
                        setMapValue(null)
                        toast('🎉 Updated Successfully!')
                        navigate('/company')
                    }
                    else if(res.data.status === 'fail'){
                        toast('🚩'+res.data.message)
                    }

                }).catch(err=>{
                    toast('🚨'+err.message)
                })


            } catch (err) {
                toast('🚨 Something went wrong!')
            }


    }



    return (
        <div>
            <div>
                <Header name={'Company'} />
            </div>


            <div className='bg-light rounded-3 p-3  mb-4 me-3'>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                    <h3>Edit Company</h3>
                    {/* <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{cursor:'pointer'}} onClick={()=>{navigate('/addcompany')}}>
                        <h5 className='m-0 p-0'>Add</h5>
                    </div> */}
                </div>


                <div className='row  w-100'>


                    
                <div className='col-md-12 mb-4'>
                        <div className='d-flex align-items-center px-3 position-relative'>
                        <img src={image?URL?.createObjectURL(image):data?.image} className='border' style={{width:'120px',height:'120px',objectFit:'cover',borderRadius:200}}/>
                        {image?<div className={`d-flex justify-content-center align-items-center bg-${image?'danger':'warning'} position-absolute`} style={{width:'35px',height:'35px',borderRadius:200,top:'10px',left:'5px'}} onClick={()=>{setImage(null)}}>
                            <i className={`bi bi-x fs-4 text-white`}></i>
                        </div>:
                        <div className={`d-flex justify-content-center align-items-center bg-${image?'danger':'warning'} position-absolute`} style={{width:'35px',height:'35px',borderRadius:200,top:'10px',left:'5px'}}>
                            <i className={`bi bi-pencil fs-6`}></i>
                        </div>}
                            {image?null:<input type='file' className='border rounded-3 p-2 px-3 position-absolute' placeholder='Enter Logo' style={{width:'120px',height:'120px',borderRadius:200,opacity:0}} onChange={(e) => { setImage(e.target.files[0]) }} />}
                        </div>
                    </div>



                    <div className='col-md-6 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <i className='bi bi-pencil'></i>
                            <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Company Name' defaultValue={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />
                        </div>
                    </div>


                    <div className='col-md-6 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <i className='bi bi-pencil'></i>
                            <input type='email' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Your Email' defaultValue={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                    </div>

                    <div className='col-md-6 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <i className='bi bi-pencil'></i>
                            <input type='tel' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Your Phone' defaultValue={phone} onChange={(e) => { setPhone(e.target.value) }} />
                        </div>
                    </div>


                    <div className='col-md-6 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <i className='bi bi-pencil'></i>
                            <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Your Password' defaultValue={password} onChange={(e) => { setPassword(e.target.value) }} />
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




                    <div className='col-md-12 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3 h-auto'>
                            <i className='bi bi-pencil'></i>
                            <textarea className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter about Company' defaultValue={aboutCompany} onChange={(e) => { setAboutCompany(e.target.value) }} />
                        </div>
                    </div>


                </div>



                <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{ cursor: 'pointer', width: '140px' }} onClick={() => { submit() }}>
                    <h5 className='m-0 p-0'>Submit</h5>
                </div>

            </div>



        </div>
    )
}

export default EditCompany