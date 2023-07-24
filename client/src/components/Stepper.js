// import React, { useState } from 'react'
// import { Steps } from 'antd'
// import { useDispatch } from 'react-redux'
 
// const Stepper = (props) =>{
//     const { status } = props
//     const [current, setCurrent] = useState(0)

//     const dispatch = useDispatch()
  
//     console.log('status',status)
//     const description = 'This is a description.'
//     // const statusTitle = status?.map((ele)=>{
//     //     return {title:ele.toUpperCase(), description}
//     // })
    
//     const handleStep = () =>{
        
//     }

//     const statusTitle = [
//         {
//           title: 'Step 1',
//           description,
//         },
//         {
//           title: 'Step 2',
//           description,
//         },
//         {
//           title: 'Step 3',
//           description,
//         },
//       ]


//     console.log("statusTitle",statusTitle)

//     const onChange = (value) => {
//         setCurrent(value)
//     }

//     return (
//         <div className="m-auto">
//             Status 
//             <Steps
//                 current={current}
//                 onChange={onChange}
//                 direction="vertical"
//                 items={statusTitle}
//             />
//             <button onClick={handleStep}>Next</button>
//         </div>
//     )
// }

// export default Stepper


// /* 
// [
//           {
//             title: 'Step 1',
//             description,
//           },
//           {
//             title: 'Step 2',
//             description,
//           },
//           {
//             title: 'Step 3',
//             description,
//           },
//         ]*/