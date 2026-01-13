import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlicer";
// import image from "../assets/image.png"
export function ProductItem(props) {
  const dispatch=useDispatch()
  function addItemToCart(item){
    dispatch(addToCart({...item,["noOfItems"]:0}))
  }
  function stars(rating) {
    const totalStars = 5;

    return (
      <span>
        {[...Array(totalStars)].map((_, index) => (
          <span key={index}>
            {index < rating ? "⭐" : "☆"}
          </span>
        ))}
      </span>
    );
  }
//  

  console.log(props)

  return <div className="
      p-4 bg-white border border-gray-200
      hover:bg-gray-200
      hover:border-teal-400
      hover:shadow-teal-400
      rounded-lg shadow shadow-black/10
      max-w-80
      flex flex-col
      hover:-translate-y-1 transition duration-300
    ">
    {/* Image */}
    <img
      className="rounded-md h-40 w-full object-cover"
      src={props.images[0]}
      alt={props.title}
    />

    {/* Title */}
    <h2 className="text-gray-900 text-xl font-semibold mx-2 my-4
        line-clamp-2 min-h-[3rem]">
      {props.title}
    </h2>

    {/* Description */}
    <p className="text-gray-800 text-sm mx-2 mb-4
        line-clamp-3 min-h-[4.5rem]">
      {props.description.slice(0,100)} <Link to={`/products/${props.id}`} className="text-cyan-400" >...more</Link>
    </p>

    {/* Info section */}
    <div className="text-sm text-gray-900 mx-2 min-h-[4.5rem]">
      <p>
        <b>Rating&nbsp;:</b>&nbsp;{stars(props.rating)}
      </p>
      <p>
        <b>Category&nbsp;:</b>&nbsp;{props.category}
      </p>
      <p>
        <b>Price&nbsp;:</b>&nbsp;₹{props.price}
      </p>
    </div>

    {/* Button (always bottom aligned) */}
    <div className="mt-2 ">
<Link to={`/products/${props.id}`}>
    <button
      type="button"
      className="
          bg-cyan-400 hover:bg-cyan-800
          w-full  mt-auto mb-3
          px-4 py-2 font-medium text-center
          rounded-md text-white text-sm
          transition text-nowrap
        "
    >
      Details
    </button>
    </Link>
    {/* {add to cart} */}
    {/* <Link to={`/cart/`}> */}

    <button
      type="button"
      onClick={()=>{addItemToCart(props)}}
      className="
          bg-cyan-400 hover:bg-cyan-800
          w-full mt-auto mb-3
          px-4 py-2 font-medium text-center
          rounded-md text-white text-sm
          transition text-nowrap
        "
    >
     Add to Cart
    </button>
    {/* </Link> */}
    </div>
    
    
  </div>

}




