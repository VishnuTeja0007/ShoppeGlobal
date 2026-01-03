import { useNavigate } from "react-router-dom"

// import image from "../assets/image.png"
export function ProductItem(props) {
  const navigate=useNavigate()
      
        // return <div key={props.id} className="group relative">
        //       <img
        //         alt={props.title}
        //         src={props.images[0]}
        //         className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        //       />
        //       <div className="mt-4 flex justify-between">
        //         <div>
        //           <h3 className="text-sm text-gray-700">
        //             <a href={props.href}>
        //               <span aria-hidden="true" className="absolute top-0 left-0" />
        //               {props.title}
        //             </a>
        //           </h3>
        //           <p className="mt-1 text-sm text-gray-500">{props.catagory}</p>
        //         </div>
        //        
        //         <button type="button" onClick={ ()=>{return navigate(`/product/${props.id}`)}} className="rounded-2xl bg-blue-500 text-white px-3 ">get details</button>
              
        //       </div>
        //       {/* <button onClick={()=>{return navigate(`/product/${props.id}`)}} >View Details</button> */}
        //     </div>

        return  (
            <div className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80">
            <img className="rounded-md max-h-40 w-full object-cover" src={props.images[0]} alt={props.title} />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
              <a href={props.href}>
                       <span aria-hidden="true" className="absolute top-0 left-0" />
                       {props.title}
                     </a>
            </p>
             <div>
                   <h3 className="text-sm text-gray-700">
                     
                   </h3>
                   <p className="mt-1 text-sm text-gray-500">{props.catagory}</p>
                    <p className="text-sm font-medium text-gray-900">{props.price}</p>
            </div>
            
            <button type="button"  onClick={ ()=>{return navigate(`/product/${props.id}`)}} className="bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded-md text-white text-sm">
                Details
            </button>
        </div>
        )
      }


