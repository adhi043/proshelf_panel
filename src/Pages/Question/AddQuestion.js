import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router-dom'
import MapContext from '../../Components/MapContext';
import toast from 'react-simple-toasts';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';
import Swal from 'sweetalert2';

const AddQuestion = () => {

    const { mapValue, setMapValue } = useContext(MapContext);

    const questType = ['MCQS', 'Answer']

    const navigate = useNavigate()


    const [questionName, setQuestionName] = useState(null)
    const [questionType, setQuestionType] = useState(null)




    const submit = () => {
        if (!questionName) {
            toast('🚨 Must enter your question!')
        }
        else if (!questionType) {
            toast('🚨 Must select question type!')
        }
       
        else {

            try {

                const param = new FormData()
                param.append('name', questionName)
                param.append('type', questionType)


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
                <Header name={'Add Question'} />
            </div>


            <div className='bg-light rounded-3 p-3  mb-4 me-3'>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                    <h3>Add Question</h3>
                    {/* <div className='p-1 px-3 bg-warning rounded-pill d-flex justify-content-center align-items-center set-shadow' style={{cursor:'pointer'}} onClick={()=>{navigate('/addcompany')}}>
                        <h5 className='m-0 p-0'>Add</h5>
                    </div> */}
                </div>


                <div className='row  w-100'>


                    <div className='col-md-12 mb-4'>
                        <p>Select Question Type</p>
                        <div className='d-flex align-items-center px-3 gap-3'>
                            {questType?.map(i => {
                                return (<>

                                    <div className='d-flex align-items-center px-3 gap-3' onClick={() => { setQuestionType(i) }} style={{ cursor: 'pointer' }} >
                                        <div style={{ width: '20px', height: '20px', borderRadius: 200, border: questionType === i ? '5px solid gold' : '1px solid black' }} />
                                        <p>{i}</p>

                                    </div>

                                </>)
                            })}
                        </div>
                    </div>

                    <div className='col-md-12 mb-4'>
                        <div className='border border-dark rounded-3 bg-white d-flex align-items-center px-3'>
                            <i className='bi bi-pencil'></i>
                            <input type='text' className='border-0 rounded-3 p-2 w-100 px-3' placeholder='Enter Question Name' value={questionName} onChange={(e) => { setQuestionName(e.target.value) }} />
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

export default AddQuestion