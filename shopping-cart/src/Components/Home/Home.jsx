import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import NavigateButtons from "../NavigateButtons/NavigateButtons";
import FilteredProducts from "../FilteredProducts/FilteredProducts";
import ProductList from "../ProductList/ProductList";
import { filterProduct, setCache } from "../../features/slices/productsSlice";

const Home = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const products = useSelector((state) => state.products.filteredProducts);
  const storeData = useSelector((state) => state.products.products.storeData);
  const cache = useSelector((state) => state.products.cache);

  const activeTab = type ? type.charAt(0).toUpperCase() + type.slice(1) : "All Products";

  // Parse query params from URL
  const queryParams = new URLSearchParams(location.search);
  const gender = queryParams.get("gender");
  const color = queryParams.get("color");
  const size = queryParams.get("size");

  useEffect(() => {
    if (!type) {
      navigate("/");
      return;
    }

    const filters = { type: activeTab, gender, color, size };

    if (activeTab === "All Products") {
      dispatch(filterProduct(storeData)); 
    }
    else if (cache[activeTab] && !gender && !color && !size) {
      dispatch(filterProduct(cache[activeTab]));
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/getFilteredProducts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch");
          }

          const data = await response.json();
          dispatch(setCache({ type: activeTab, data }));
          dispatch(filterProduct(data));
        } catch (error) {
          console.error("API Error:", error);
        }
      };

      fetchData();
    }
  }, [type, gender, color, size, dispatch]); // Removed `storeData`, `cache`, `activeTab` to prevent re-render loops.

  return (
    <>
      <Navbar />
      <Slider />
      <NavigateButtons activeTab={activeTab} />
      {activeTab === "All Products" ? (
        <ProductList />
      ) : (
        <FilteredProducts products={products} />
      )}
    </>
  );
};

export default Home;
