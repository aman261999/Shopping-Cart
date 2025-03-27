import ProductCard from "../FilteredProducts/ProductCard";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { filterProduct } from "../../features/slices/productsSlice";
import { useDispatch } from "react-redux";

const FilteredProducts = ({ products }) => {
  const navigate = useNavigate();
  const { type } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const genderOptions = ["male", "female"];
  const colorOptions = [
    "red", "green", "purple", "yellow", "orange", "blue", "black", "brown", "gray"
  ];
  const sizeOptions = ["S", "M", "L", "XL"];

  const [selectedGender, setSelectedGender] = useState(queryParams.get("gender") || "Select Gender");
  const [selectedColor, setSelectedColor] = useState(queryParams.get("color") || "Select a color");
  const [selectedSize, setSelectedSize] = useState(queryParams.get("size") || "Select a size");

  const updateFilters = (filterName, value) => {
    const newParams = new URLSearchParams(location.search);
    if (value.includes("Select")) {
      newParams.delete(filterName);
    } else {
      newParams.set(filterName, value);
    }
    navigate(`/filteredproducts/${type}?${newParams.toString()}`);
  };

  useEffect(() => {
    setSelectedGender(queryParams.get("gender") || "Select Gender");
    setSelectedColor(queryParams.get("color") || "Select a color");
    setSelectedSize(queryParams.get("size") || "Select a size");
  }, [queryParams]);

  return (
    <div className="py-6">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Menu>
          <MenuHandler>
            <Button
              color="gray"
              size="sm"
              variant="outlined"
              ripple={true}
              className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
            >
              {selectedGender}
            </Button>
          </MenuHandler>
          <MenuList>
            {genderOptions.map((item, index) => (
              <MenuItem key={index} onClick={() => updateFilters("gender", item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Menu>
          <MenuHandler>
            <Button
              color="gray"
              size="sm"
              variant="outlined"
              ripple={true}
              className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
            >
              {selectedColor}
            </Button>
          </MenuHandler>
          <MenuList>
            {colorOptions.map((item, index) => (
              <MenuItem style={{ color: item }} key={index} onClick={() => updateFilters("color", item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Menu>
          <MenuHandler>
            <Button
              disabled={type === "Shoes"}
              color="gray"
              size="sm"
              variant="outlined"
              ripple={true}
              className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
            >
              {selectedSize}
            </Button>
          </MenuHandler>
          <MenuList>
            {sizeOptions.map((item, index) => (
              <MenuItem key={index} onClick={() => updateFilters("size", item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Button
          color="gray"
          size="sm"
          variant="outlined"
          ripple={true}
          className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
          onClick={() => {
            navigate(`/filteredproducts/${type}`)
            fetch("http://localhost:3000/getFilteredProducts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ type }),
            })
              .then((response) => response.json())
              .then((data) => {
                dispatch(filterProduct(data)); // Reset to products of that type
              })
              .catch((error) => console.error("Error resetting products", error));
          }}
        >
          Clear Filter
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            text={product.text}
            price={product.price}
            colors={product.color}
            img={product.img}
          />
        ))}
      </div>
    </div>
  );
};

FilteredProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default FilteredProducts;
