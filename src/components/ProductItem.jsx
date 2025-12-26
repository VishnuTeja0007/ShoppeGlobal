// import image from "../assets/image.png"
export function ProductItem(props) {
        return <div key={props.id} className="group relative">
              <img
                alt={props.title}
                src={props.images[0]}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={props.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {props.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{props.catagory}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{props.price}</p>
              </div>
            </div>
}