import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BaseUrl from '../../BaseUrl'
import toast from 'react-simple-toasts'
import Swal from 'sweetalert2'

const Employe = () => {

    

    const navigate = useNavigate()

    const [data, setData] = useState([])


    useEffect(() => {
        try {

            axios.get(`${BaseUrl.baseUrl}/employe/get`).then(res => {
                if (res.data.status === 'ok') {
                    setData(res.data.data)
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





    const del=(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {

            if (result.isConfirmed) {
              
            try {

                axios.delete(`${BaseUrl.baseUrl}/employe/delete/${id}`).then(res => {
                    if (res.data.status === 'ok') {
                        toast('🎉 Deleted Successfully!')

                        axios.get(`${BaseUrl.baseUrl}/employe/get`).then(res => {
                            if (res.data.status === 'ok') {
                                setData(res.data.data)
                            }
                            else if (res.data.status === 'fail') {
                                toast('🚩' + res.data.message)
                            }
            
                        }).catch(err => {
                            toast('🚨' + err.message)
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
            }


          })
    }



    return (
        <div>
            <div>
                <Header name={'Product'} />
            </div>  


            <div className='bg-light rounded-3 p-3  mb-4 me-3'>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                    <h3>Team</h3>
                    <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{ cursor: 'pointer' }} onClick={() => { navigate('/addteam') }}>
                        <h5 className='m-0 p-0'>Add</h5>
                    </div>
                </div>


                <div className='border border-dark rounded-3 p-3 w-100'>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Profile Image</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.length > 0 ? data?.map(i => {
                                    return (<>

                                        <tr>
                                            <td>
                                                <img src={i?.image?i?.image:"https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"} style={{width:'45px',height:'45px',objectFit:'cover',borderRadius:200}}/>
                                            </td>
                                            <td>{i?.firstName}</td>
                                            <td>{i?.lastName}</td>
                                            <td>{i?.email}</td>
                                            <td>{i?.phone}</td>
                                            <td>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <button className='btn btn-outline-info btn-sm' onClick={()=>{navigate(`/editteam/${i?._id}`)}}>
                                                        <i className='bi bi-pencil'></i>
                                                    </button>
                                                    <button className='btn btn-outline-danger btn-sm' onClick={()=>{del(i?._id)}}>
                                                        <i className='bi bi-trash-fill'></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    </>)
                                }) :
                                    <p>No data found!</p>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Employe