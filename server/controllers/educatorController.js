import { clerkClient, getAuth } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/course.js";
import purchase from "../models/purchase.js";
import User from "../models/users.js";

//update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res.json({ success: true, message: "You can publish a course now!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Adding New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;

    const educatorId = getAuth(req).userId;
    if (!imageFile) {
      return res.json({
        success: false,
        message: "Thumbnail Not Attached ",
      });
    }
    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({
      success: true,
      message: "Course Added Successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get educator Courses

export const getEducatorCourses = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const courses = await Course.find({ educator: userId });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Getting Educator Dashboard Data ie Tot Earning, Enrolled Students , No. of Courses

export const educatorDashboardData = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const courses = await Course.find({ educator: userId });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });
    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    const enrolledStudentsData = [];

    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        "name imageUrl",
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }
    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// to get enroll students data with purachase Info

export const getEnrolledStudentsData = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const courses = await Course.find({ educator: userId });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    }).populate("userId", "name imageUrl").populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
        student: purchase.userId,
        courseTitle: purchase.courseId.courseTitle,
        purchaseDate: purchase.createdAt
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
