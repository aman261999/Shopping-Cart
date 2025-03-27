import CardItem from '../CardItem/CardItem';
import PropTypes from 'prop-types';

const ProductListItem = ({ id, name, text, img, price, colors }) => {
  return (
    <CardItem 
      id={id} 
      name={name} 
      text={text} 
      price={price} 
      colors={colors} 
      img={img} 
      linkPath={`/${id}`} 
    />
  );
};

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),  // colors array is optional
  img: PropTypes.string.isRequired,
};

export default ProductListItem;
