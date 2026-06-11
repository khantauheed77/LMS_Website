import React from "react";
import { assets } from "../../assets/assets";

const FooterEdu = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 py-6 border-t gap-6">
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="hidden md:block text-sm text-gray-600">
          Copyright 2026 All Rights Reserved
        </p>
      </div>
      <div className="flex items-center gap-5">
        <a href="#" className="hover:opacity-70 transition">
          <img src={assets.facebook_icon} alt="Facebook" />
        </a>
        <a href="#" className="hover:opacity-70 transition">
          <img src={assets.twitter_icon} alt="Twitter" />
        </a>
        <a href="#" className="hover:opacity-70 transition">
          <img src={assets.instagram_icon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default FooterEdu;
