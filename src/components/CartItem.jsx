
const CartItem = ({item}) => {
    
    return (
    <div className='h-screen w-auto'>
        <h1>{item.title}</h1>
        <h2>{item.price}</h2>
    </div>
  )
}

export default CartItem
