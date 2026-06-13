import { getAuth } from "@clerk/express";
import User from "../models/users.js";
import Course from "../models/course.js";
import purchase from "../models/purchase.js";
import Stripe from "stripe";

export const getUserData = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//to get users enrolled Courses with Lecture Links

export const userEnrolledCourses = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const userData = await User.findById(userId).populate("enrolledCourses");

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//to purchase Course

export const purchaseCourse = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const {origin} = req.headers; 
    const { courseId } = req.body;
    const userData = await User.findById(userId)
    const courseData = await Course.findById(courseId)

    if(!userData || ! courseData ){
        return res.json({
            success : false,
            message : 'User or Course not found'
        })
    }

    const purchasedData = {
        courseId : courseData._id,
        userId,
        amount : (courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2)
    }
    const newPurchase = await purchase.create(purchasedData)

    //Initializing Stripe Gateway
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
    const currency = process.env.CURRENCY.toLowerCase()

    //creating line items to for Stripe
    const line_items = [{
        price_data : {
            currency,
            unit_amount : Math.floor(purchasedData.amount) * 100,
            product_data : {
                name : courseData.courseTitle,
            }
        },
        quantity : 1
    }]

    const session = await stripeInstance.checkout.sessions.create({
        success_url : `${origin}/loading/my-enrollements`,
        cancel_url : `${origin}/`,
        payment_method_types : ['card'],
        mode : 'payment',
        line_items : line_items,
        metadata : {
            purchaseId : newPurchase._id.toString()
        }
    })
        
    res.json({success : true , session_url : session.url})
   
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}; 