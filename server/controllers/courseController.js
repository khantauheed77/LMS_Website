import Course from "../models/course.js";

//to get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// to get courses by Id

export const getCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate({ path: "educator" });

    //removing the lectUrl if preview is Not Free
    courseData.courseContent.array.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreview) {
          lecture.lectureUrl = "";
        }
      });
    });
    res.json({ success: true, course });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
