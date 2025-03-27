import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigateButtons = ({ activeTab }) => {
  const navigate = useNavigate();
  const tabs = [
    { id: 1, name: "All Products" },
    { id: 2, name: "T-Shirts" },
    { id: 3, name: "Jeans" },
    { id: 4, name: "Hoodies" },
    { id: 5, name: "Shoes" },
    { id: 6, name: "Suits" }
  ];


  return (
    <div className="flex items-center justify-center py-4 border-b">
      {tabs.map((tab) => {
        const path = tab.name === "All Products" ? "/" : `/filteredproducts/${tab.name}`;
        return (
          <button
            key={tab.id}
            className={`mr-4 pb-2 cursor-pointer text-lg font-semibold ${
              activeTab === tab.name ? "border-b-2 border-red-500 text-red-500" : "text-gray-700"
            }`}
            role="tab"
            tabIndex="0"
            onClick={() => navigate(path)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};

NavigateButtons.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default NavigateButtons;