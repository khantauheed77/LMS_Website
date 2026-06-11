import React from "react";
import { assets } from "../../assets/assets";
import Searchbar from "./Searchbar";
const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70 ">
      <h1 className="md:text-home-leading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto ">
        Empower your future with the courses designed to{" "}
        <span className="text-blue-600"> your choice.</span>
        <img
          src={assets.sketch}
          alt=""
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>
      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        We Bring together World Class Instructors, Interactive Content, and a
        supportive community to help you achieve your proffessional goal{" "}
      </p>
      <p className="md:hidden hidden text-gray-500 max-w-sm mx-auto">
        we Bring together World Class Instructors, Interactive Content, and a
        supportive community to help you achieve your proffessional goal{" "}
      </p>
      <Searchbar/>
    </div>
  );
};

export default Hero;
