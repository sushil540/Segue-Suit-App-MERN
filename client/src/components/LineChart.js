// import React,{useEffect,useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'
// import { Line } from 'react-chartjs-2'
// import { startGetOrderDates, startGetOrders } from '../actions/orderActions'
// ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement,Title,Tooltip,Legend)

// const LineChart=(props)=>{
// const [dates,setDates] = useState('')
//  const dispatch = useDispatch()

//  useEffect(()=>{
//     dispatch(startGetOrders())
//     dispatch(startGetOrderDates())
//  },[dispatch])

//  const handleChange = (e)=>{
//   const input = e.target.value
//   setDates(input)
// }

// console.log('dates',dates)
//  const orderDetails = useSelector((state)=>{
//     return state.order.monthData
//  })

// let months = ["1","2","3","4","5","6","7","8","9","10","11","12"]

// const yearOrders = orderDetails.filter((ele)=>{
//   return ele.year === dates
// }) 

// let monthlyOrders
// if(dates){
//   monthlyOrders = months.map((ele)=>{
//     return {
//       month : ele,
//       orders : yearOrders.reduce((pv,cv)=>{
//           if(cv.month === ele){
//             return cv.orderCount
//           }else{
//             return pv
//           }
//       },0)
//     }
//   })
// }else{
//   monthlyOrders = months.map((ele)=>{
//     return {
//       month : ele,
//       orders : orderDetails.reduce((pv,cv)=>{
//           if(cv.month === ele){
//             return cv.orderCount
//           }else{
//             return pv
//           }
//       },0)
//     }
//   })
// }

// const listOrders = monthlyOrders.map((ele)=>{
//   return ele.orders
// })

// //[month, order:{orderCount: 0, year:2023, }]

//     return( 
//         <div className='container-fluid'>
//        <select
//         className="col-md-4 shadow mb-5 bg-body-tertiary rounded"
//         value={dates}
//         onChange={handleChange}>
//               <option value="">Select Year</option>
//               {orderDetails.map((ele,i)=>{
//                 return(
//                   <option key={i} value = {ele.year}>{ele.year}</option>
//                 )
//               })}
//        </select>
//         <div className='col-md-8 mb-3 mt-3'>
//              <Line
//              data={{
//                     labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
//                     datasets: [
//                       {
//                         label: 'Orders',
//                         data:listOrders ,
//                         borderColor: 'green',
//                         backgroundColor: 'green',
//                       },
//                     ],
//                   }}

//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: {
//                         display : true,
//                         position : "right",  //dataset will come in right
//                         align : "center"
//                       },
//                       title: {
//                         display: true,
//                         text: 'Monthly Order Details',
//                         font : {size:25}
//                       },
//                     },
//                     scales : {
//                         x : {
//                             grid :{
//                                 display : false,
//                             },
//                             title : {
//                                 display : true,
//                                 text : "Months",
//                                 font : {size:20},
//                             }
//                         },
//                         y : {   
//                             grid : {
//                                 display: false,
//                             },
//                             title : {
//                                 display : true,
//                                 text : "No of Orders",
//                                 font : {size:20},
//                             }
//                         }
//                     }
//                   }}
//                   />
//         </div>
//         </div>

//     )
// }
// export default LineChart

import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { startGetOrderDates, startGetOrders } from '../actions/orderActions'
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement,Title,Tooltip,Legend)

const LineChart=(props)=>{
const [dates,setDates] = useState('')
 const dispatch = useDispatch()

 useEffect(()=>{
    dispatch(startGetOrders())
    dispatch(startGetOrderDates())
 },[dispatch])

 const handleChange = (e)=>{
  const input = e.target.value
  setDates(input)
}

console.log('dates',dates)
 const orderDetails = useSelector((state)=>{
    return state.order.monthData
 })

let months = ["1","2","3","4","5","6","7","8","9","10","11","12"]

const yearOrders = orderDetails.filter((ele)=>{
  return ele.year === dates
}) 

let monthlyOrders
if(dates){
  monthlyOrders = months.map((ele)=>{
    return {
      month : ele,
      orders : yearOrders.reduce((pv,cv)=>{
        if(cv.month == ele){
            return cv.orderCount
          }else{
            return pv
          }
      },0)
    }
  })
}else{
  monthlyOrders = months.map((ele)=>{
    return {
      month : ele,
      orders : orderDetails.reduce((pv,cv)=>{
          if(cv.month === Number(ele)){
            return cv.orderCount
          }else{
            return pv
          }
      },0)
    }
  })
}
  
const listOrders = monthlyOrders.map((ele)=>{
  return ele.orders
})

//[month, order:{orderCount: 0, year:2023, }]

    return( 
        <div className='container-fluid'>
       <select
        className="col-md-4 shadow mb-5 bg-body-tertiary rounded"
        value={dates}
        onChange={handleChange}>
              <option value="">Select Year</option>
              {orderDetails.map((ele,i)=>{
                return(
                  <option key={i} value = {ele.year}>{ele.year}</option>
                )
              })}
       </select>
        <div className='col-md-8 mb-3 mt-3'>
             <Line
             data={{
                    labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
                    datasets: [
                      {
                        label: 'Orders',
                        data:listOrders ,
                        borderColor: 'green',
                        backgroundColor: 'green',
                      },
                    ],
                  }}

                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display : true,
                        position : "right",  //dataset will come in right
                        align : "center"
                      },
                      title: {
                        display: true,
                        text: 'Monthly Order Details',
                        font : {size:25}
                      },
                    },
                    scales : {
                        x : {
                            grid :{
                                display : false,
                            },
                            title : {
                                display : true,
                                text : "Months",
                                font : {size:20},
                            }
                        },
                        y : {   
                            grid : {
                                display: false,
                            },
                            title : {
                                display : true,
                                text : "No of Orders",
                                font : {size:20},
                            }
                        }
                    }
                  }}
                  />
        </div>
        </div>

    )
}
export default LineChart