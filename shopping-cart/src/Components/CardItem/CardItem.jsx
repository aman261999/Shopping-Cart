import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { singleProduct } from '../../features/slices/productsSlice';
import { addToCart, addToWishList, removeFromWishList } from '../../features/slices/cartSlice';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import useFetch from '../../CustomHook/FetchData';


const CardItem = ({ id, name, text, price, colors, img, linkPath }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.cart.wishList);
  const isInWishlist = wishList.some((item) => item.id === id);
  const [wishlisted, setWishlisted] = useState(isInWishlist);



  const handleWishlistToggle = () => {
    if (wishlisted) {
      dispatch(removeFromWishList({id}));
    } else {
      dispatch(addToWishList({
        id,
        price,
        img,
        name,
        quantity: 1,
        totalPrice: price
      }));
    }
    setWishlisted(!wishlisted);
  };

  return (
    <Card className="w-75">
      <Link to={linkPath} onClick={() => { dispatch(singleProduct(id)) }}>
        <CardHeader color="blue" className="relative h-65 mt-4">
          <img src={img} alt={name} className="h-full w-full" />
        </CardHeader>
        <CardBody className="p-4 text-center">
          <Typography variant="h5" className="mb-1">{name}</Typography>
          <Typography>{text}</Typography>
        </CardBody>
      </Link>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography className="font-bold" variant="small">${price}</Typography>
        <Typography variant="small" color="gray" className="flex">
          {colors?.map((color) => (
            <i
              key={color}
              className="fas fa-map-marker-alt fa-sm mt-[3px] rounded-full p-2 mr-1"
              style={{ backgroundColor: color }}
            ></i>
          ))}
        </Typography>
        <Button
          style={{ cursor: 'pointer' }}
          color="gray"
          variant="outlined"
          onClick={() => dispatch(addToCart({
            id,
            price,
            img,
            name,
            quantity: 1,
            totalPrice: price
          }))}
        >
          Add to Cart
        </Button>
        <svg onClick={handleWishlistToggle} xmlns="http://www.w3.org/2000/svg" fill={wishlisted ? "red" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" className="size-6 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </CardFooter>
    </Card>
  );
};

CardItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),  // colors array is optional
  img: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
};

export default CardItem;
