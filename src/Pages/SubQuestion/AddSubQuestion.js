import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router-dom'
import MapContext from '../../Components/MapContext';
import toast from 'react-simple-toasts';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';
import Swal from 'sweetalert2';

const AddSubQuestion = () => {


    const navigate = useNavigate()




    const [prodData, setProdData] = useState([])


    useEffect(() => {
        try {

            axios.get(`${BaseUrl.baseUrl}/company/get`).then(res => {
                if (res.data.status === 'ok') {
                    setProdData(res.data.data)
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




    const [productId, setProductId] = useState(null)


    const submit = () => {
        if (!productId) {
            toast('🚨 Must select product!')
        }
        
        else {

            try {

                const param = new FormData()
                param.append('productId', productId)


                axios.post(`${BaseUrl.baseUrl}/company/create`, param).then(res => {
                    if (res.data.status === 'ok') {
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
                <Header name={'Sub Question'} />
            </div>


            <div className='bg-light rounded-3 p-3  mb-4 me-3'>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                    <h3>Add Sub Question</h3>
                    {/* <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{cursor:'pointer'}} onClick={()=>{navigate('/addcompany')}}>
                        <h5 className='m-0 p-0'>Add</h5>
                    </div> */}
                </div>


                <div className='row  w-100'>




                    <div className='col-md-6 mb-4'>

                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <select class="form-select" aria-label="Default select example" onChange={(e) => { setProductId(e.target.value) }}>
                                <option selected>Select Product</option>
                                {prodData?.length > 0 ? prodData.map(i => {
                                    return (<>
                                        <option value={i?._id}>{i?.name}</option>
                                    </>)
                                })

                                    : <p>No data found!</p>}

                            </select>
                        </div>
                    </div>





                </div>



                <div className='p-1 px-3 mb-5 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{ cursor: 'pointer', width: '140px' }} onClick={() => { submit() }}>
                    <h5 className='m-0 p-0'>Submit</h5>
                </div>


            </div>











        </div>
    )
}

export default AddSubQuestion