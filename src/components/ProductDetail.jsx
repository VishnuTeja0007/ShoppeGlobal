import { StarIcon } from "lucide-react"
import useFetch from "../utils/useFetch"
import { useParams } from "react-router-dom"
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const {id}=useParams()
  console.log(id)
  const[data,loading,error]=useFetch(`https://dummyjson.com/products/${id}`)
  console.log(data)
  console.log(error)
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm uppercase tracking-wide text-rose-500 font-semibold">
        {data.catagory}
      </span>

      <h1 className="text-3xl font-bold text-gray-800">
        {data.title}
      </h1>

      <p className="text-gray-600 leading-relaxed">
        {data.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={
                classNames(
                  "h-4 w-4",
                  i < Math.round(data.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300",
                )
              }
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {data.rating} / 5
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-gray-800">
          ${data.price * (1 - data.discountPercentage / 100)}
        </span>
        <span className="text-sm line-through text-gray-400">
          ${data.price}
        </span>
        <span className="text-sm text-green-600 font-medium">
          {data.discountPercentage}% OFF
        </span>
      </div>

      {/* Stock & Brand */}
      <div className="flex gap-6 text-sm text-gray-600">
        <span>
          <strong>Brand:</strong> {data.brand}
        </span>
        <span>
          <strong>Stock:</strong> {data.stock} available
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <button type="button" className="rounded-xl bg-rose-500 hover:bg-rose-600 px-4 py-2 text-white">
          Add to Cart
        </button>
        <button type="button" className="rounded-xl border border-rose-500 text-rose-500 hover:bg-rose-50 px-4 py-2">
          Buy Now
        </button>
      </div>
    </div>
  )
}