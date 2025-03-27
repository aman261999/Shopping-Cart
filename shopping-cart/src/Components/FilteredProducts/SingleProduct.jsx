import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Tooltip, Button} from "@material-tailwind/react";
import { addToCart } from '../../features/slices/cartSlice';
import { singleProduct } from '../../features/slices/productsSlice';
import Navbar from '../Navbar/Navbar';

const SingleProduct = () => {
  const [error, setError] = useState("");
  const item = useSelector((state) => state.products.singleProduct);
  const colors = item.color;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/getSingleProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    }).then((res) => res.json()).then((data) => {
      dispatch(singleProduct(data));
    }).catch((err) => {
      setError("Invalid product id!!")
      console.log(err);
    })
  }, [id])

  useEffect(() => {
    if (error) {
      navigate('/');
    }
  }, [error]);

  return (
    <div>
      <Navbar />
      <hr />
      <div className="container mx-auto py-6 px-10">
        <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8">
          {/* Left side - Image constrained to reasonable size */}
          <div className="w-2/5">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-auto max-h-64 sm:max-h-72 md:max-h-80 lg:max-h-96 object-contain rounded-lg"
            />
          </div>
          
          {/* Right side - Product details */}
          <div className="w-3/5">
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-normal leading-none mb-2 sm:mb-2">
              {item.name}
            </p>
            <p className="text-blue-700 text-xs sm:text-sm md:text-lg font-bold tracking-normal leading-none mb-2">
              10% OFF
            </p>
            <p className="text-gray-600 text-xs sm:text-sm md:text-lg tracking-normal leading-none mb-2">
              {item.text}
            </p>
            <p className="text-red-600 text-xs sm:text-sm md:text-lg font-bold tracking-normal leading-none mb-2">
              <span className='text-gray-600'>Price: </span>${item.price}
            </p>
            
            {/* Colors */}
            <div className="flex items-center mb-2">
              <span className="text-xs sm:text-sm md:text-base font-bold mr-2">Colors:</span>
              {colors?.length ? (
                <div className="flex">
                  {colors.map((color) => (
                    <i
                      key={color}
                      className="fas fa-map-marker-alt fa-sm rounded-full p-1 mr-1"
                      style={{ backgroundColor: color }}
                    ></i>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 text-xs sm:text-sm">No colors available</span>
              )}
            </div>
            
            {/* Button */}
            <div>
              <Tooltip content="Add to cart" placement="bottom">
                <Button
                  color="gray"
                  size="sm"
                  variant="outlined"
                  className="text-xs sm:text-sm"
                  onClick={() => dispatch(addToCart({
                    id: item.id,
                    price: item.price,
                    img: item.img,
                    name: item.name,
                    quantity: 1,
                    totalPrice: item.price
                  }))}
                >
                  Add to Cart
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct