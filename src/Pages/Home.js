import React from 'react'
import Header from '../Components/Header'
import { Bar } from "react-chartjs-2";

const Home = () => {


  const chartData = {

    labels: ['Al Ain', 'Sharjah', 'Dubai', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Completed',
        data: [10,0,0,0,0,0],
        fill: false,
        borderColor: '#1778F2',
        backgroundColor:'#1778F2',
        tension: 0.1,
      },
      {
        label: 'Incomplete',
        data: [0,45,0,0,0,0],
        fill: false,
        borderColor: '#00FF00',
        backgroundColor:'#00FF00',
        tension: 0.1,
      },
      {
        label: 'Cancelled',
        data: [0,0,50,0,0,0],
        fill: false,
        borderColor: '#8D1313',
        backgroundColor:'#8D1313',
        tension: 0.1,
      },
      {
        label: 'Time Out',
        data: [0,0,0,30,0,0],
        fill: false,
        borderColor: '#F5A82C',
        backgroundColor:'#F5A82C',
        tension: 0.1,
      },
      {
        label: 'Available',
        data: [0,0,0,0,20,0],
        fill: false,
        borderColor: '#FFF700',
        backgroundColor:'#FFF700',
        tension: 0.1,
      },
      {
        label: 'Not Available',
        data: [0,0,0,0,0,60],
        fill: false,
        borderColor: 'magenta',
        backgroundColor:'magenta',
        tension: 0.1,
      },
    ],
  };


  return (
    <div>

      <div>
        <Header name={'Dashboard'} />
      </div>


      <div className=' bg-warning border border-dark set-shadow p-3 d-flex justify-content-between align-items-center rounded-3 gap-2 mb-3 px-5 ps-3 mb-4 me-3'  >
        <p>Welcome to ProShelf Panel! Below you'll see your tasks details for this company. To view your total number of tasks, simply navigate to the Tasks tab on the left.</p>
      </div>



      <div className='row w-100 mb-4'>

        <div className='col-md-3 mb-3'>
          <div className='bg-warning rounded-3 set-shadow p-3 d-flex justify-content-between align-items-center'>
            <div>
              <i className='bi bi-stack fs-2 '></i>
            </div>
            <div>
              <h5 className=''>Total Tasks</h5>
              <h5 className='text-center'>20</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3 mb-3'>
          <div className='bg-warning rounded-3 set-shadow p-3 d-flex justify-content-between align-items-center'>
            <div>
              <i className='bi bi-boxes fs-2 '></i>
            </div>
            <div>
              <h5 className=''>Total Products</h5>
              <h5 className='text-center'>20</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3 mb-3'>
          <div className='bg-warning rounded-3 set-shadow p-3 d-flex justify-content-between align-items-center'>
            <div>
              <i className='bi bi-building-fill fs-2 '></i>
            </div>
            <div>
              <h5 className=''>Total Companys</h5>
              <h5 className='text-center'>20</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3 mb-3'>
          <div className='bg-warning rounded-3 set-shadow p-3 d-flex justify-content-between align-items-center'>
            <div>
              <i className='bi bi-people-fill fs-2 '></i>
            </div>
            <div>
              <h5 className=''>Total Employes</h5>
              <h5 className='text-center'>20</h5>
            </div>
          </div>
        </div>


      </div>



      <div className='bg-light rounded-3 p-3  mb-4 me-3'>
        <h3>Analytics</h3>
        <Bar data={chartData} options={{
                    indexAxis: 'y',
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                    },
                }} />
      </div>



    </div>
  )
}

export default Home