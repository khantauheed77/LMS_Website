import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/react";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  
  const isCourseListPage = location.pathname.includes("/course-list");
  const {navigate,isEducator} = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-200 py-4 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />
      {/* Desktop Layout - Hidden on mobile and tablet */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 flex-1 justify-center">
        {user && (
          <>
            <button
              onClick={() => navigate("/educator")}
              className="font-medium flex items-center gap-5 hover:text-gray-800 transition cursor-pointer"
            >
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
            <span className="h-5 w-[1px] bg-gray-300"></span>
            <Link
              to="/my-enrollments"
              className="font-medium hover:text-gray-800 transition"
            >
              My Enrollments
            </Link>{" "}
          </>
        )}
      </div>
      {user ? (
        <div className="hidden md:flex">
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn()}
          className="bg-blue-600 text-white px-7 py-2 rounded-full font-medium hover:bg-blue-700 transition whitespace-nowrap hidden md:block"
        >
          Create Account
        </button>
      )}

      {/* Mobile Layout - Visible on screens smaller than md (768px) */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-2 sm:gap-5 text-xs">
          <button onClick={() => navigate("/educator")}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
          <Link to="/my-enrollments">My Enrollments</Link>
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="user_icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
