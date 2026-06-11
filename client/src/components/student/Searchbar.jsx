import { useNavigate } from "react-router-dom";
import React from "react";
import { assets } from "../../assets/assets";
const Searchbar = ({data}) => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState(data ? data : "");

  const onSearchHeandler = (e) => {
    e.preventDefault();
    navigate(`/course-list/${input}`);
  };

  return (
    <form
      onSubmit={onSearchHeandler}
      action=""
      className="max-w-xl  w-full  md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded "
    >
      <img src={assets.search_icon} alt="" className="md:w-auto w-10 px-3" />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search Courses"
        className="outline-none md:w-[400px] w-10/12 text-gray-500/80"
      />
      <button className="bg-blue-600 rounded text-white  md:px-10 px-7  md:py-3 py-2 mx-1">
        Search
      </button>
    </form>
  );
};

export default Searchbar;
