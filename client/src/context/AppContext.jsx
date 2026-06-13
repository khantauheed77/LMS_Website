import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEducator, setEducator] = useState(true);

  //for authorization
  const {getToken} = useAuth();
  const {user} = useUser();
  //Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
    setEnrolledCourses(dummyCourses);
  };

  //function to calculate average rating of course
  const calculateRating = (course) => {
    let rating = 0;
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };
  //function to caclulate Course Duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    if (!course || !Array.isArray(course.courseContent)) return "0m";

    course.courseContent.forEach((ch) =>
      ch.chapterContent.forEach((lecture) => (time += lecture.lectureDuration)),
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };
  //function to calculate no of Lectures in the course

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    if (!course || !Array.isArray(course.courseContent)) return 0;

    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const logToken = async()=>{
    console.log(await getToken());
  }

  // For Token 
useEffect(()=>{
  if (user){
    logToken()
  }
},[user])
  const value = {
    currency,
    allCourses,
    enrolledCourses,
    navigate,
    calculateRating,
    isEducator,
    setEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
