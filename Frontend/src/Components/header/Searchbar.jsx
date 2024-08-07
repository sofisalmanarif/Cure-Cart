import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from 'react-loader-spinner'
import { CiSearch } from "react-icons/ci";
import { useLazyGetSearchedProductsQuery } from "../../redux/api/productsAPI";
import { IoBag } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import femaleUserImage from '../../../public/pictures/girlprofile.png';
import maleUserImage from '../../../public/pictures/boyprofile.png';

const Searchbar = () => {
  const { user } = useSelector((state) => state.userReducer);
  const {cartItems } = useSelector((state)=>state.cartReducer)
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trigger] = useLazyGetSearchedProductsQuery();

  useEffect(() => {
    if (name.trim() !== "") {
      setIsLoading(true); // Set loading state before fetching data
      trigger(name)
        .unwrap()
        .then((data) => {
          setIsLoading(false); // Turn off loading state when data fetching is complete
          setResults(data.product);
          setNoResults(data.product.length === 0);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false); // Ensure loading state is turned off in case of error
          setResults([]);
          setNoResults(true);
        });
    } else {
      setResults([]);
      setNoResults(false);
    }
  }, [name, trigger]);

  const handleSearch = (e) => {
    setName(e.target.value);
  };

  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
    setName(""); // Clear the search input after navigating
  };

  return (
    <div className="navbar-elements flex items-center justify-between py-1 px-1 md:flex  md:justify-between md:items-center md:w-full md:px-5">
      {/* Logo */}
      <div className="logo px-0 w-[170px]  md:w-[170px] md:px-8  md:mr-10">
        <Link to="/">
          <img
            src="../../../pictures/smalllogo.png"
            
            className="w-full"
            alt="LOGO"
            style={{ mixBlendMode: "multiply" }}
          />
        </Link>
      </div>

      {/* Search Bar */}
     <div className="search-bar  relative flex items-center md:mx-0 mx-4 w-[600px] p-1 md:p-2 rounded-md">
  <input
    type="text"
    placeholder="Search products..."
    value={name}
    onChange={handleSearch}
    className="border border-zinc-200  outline-none flex-grow py-0 md:py-2 rounded-l-full bg-white px-2 md:px-4 placeholder-gray-500 placeholder-opacity-100 placeholder-italic md:placeholder:text-[16px] placeholder:text-xs w-[35px] md:w-[full] focus:border focus:border-blue-700"
  />
  <button className=" bg-[#0071BC] hover:bg-[#0071bcda] text-gray-600 px-2 md:px-4 py-1 md:py-2 rounded-r-full">
    <CiSearch className="text-md md:text-2xl text-white" />
  </button>
  
  
</div>
{/* Conditionally render the result-div */}
{name && (
    <div className="absolute z-30 top-12 md:top-20 sm:top-20 right-5 md:right-[31%]  w-[90%] md:w-[40%] mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Bars
            height="50"
            width="70"
            color="#0071BC"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          {results.length > 0 ? (
            results.map((result) => (
              <div
                key={result._id}
                onClick={() => handleItemClick(result._id)}
                className=" px-4  py-2 border-b flex w-full justify-between hover:text-[#0071BC] hover:bg-gray-100 cursor-pointer"
              >
                {result.name} <CiSearch className="text-md md:text-2xl text-[#0071BC]" />
              </div>
            ))
          ) : (
            noResults && (
              <div className="px-4 py-2 text-gray-500 h-20 flex items-center justify-center">No product found</div>
            )
          )}
        </>
      )}
    </div>
  )}

      {/* Icons */}
      <div className="icons flex gap-[1px] md:gap-2">
        
        <div className=" hidden md:mr-3 md:flex md:items-center md:gap-1"><BiSolidPhoneCall className="text-2xl text-green-600 "/><section className="flex flex-col">
          <span className="leading-none text-sm font-bold text-zinc-400">Call Us</span> 
         <a href="tel:+917006622199" className="leading-none text-sm text-zinc-600 font-semibold">
        +91 7006622199
      </a> </section></div>

        <div className="cart cursor-pointer relative rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center  ">
        {cartItems.length > 0 && (
  <span className="absolute top-1 right-0 text-[9.5px] flex items-center justify-center px-[3.5px] bg-red-500 text-white rounded-full font-semibold">
    {cartItems.length}
  </span>
)}
          <Link to="/cart">
            <IoBag className=" text-lg md:text-xl hover:text-gray-700" />
          </Link>
        </div>
        <div className="profile cursor-pointer rounded-full w-8  h-8 flex items-center justify-center md:w-10 md:h-10 ">
          {!user ? (
            <Link to="/login">
              <FaUser className="text-xl" />
            </Link>
          ) : (
            <div className="h-7 w-7 md:h-9 md:w-9 rounded-full flex items-center justify-center">
              <Link to="/myprofile">
              <img
              src={user?.gender === "female" ? femaleUserImage : maleUserImage}
              alt="Profile"
              className="w-7 h-7 md:w-9 md:h-9 mix-blend-multiply rounded-full"
  />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
