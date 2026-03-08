import Student from "../../model/StudentSchema.js";
import Guide from "../../model/GuidSchema.js"
import Group from "../../../Student/Models/GroupSchema.js";
import mongoose from "mongoose";
// Middleware to check admin access
const requireAdmin = (req, res) => {


  const { role } = req.user.id;
  if (role !== "admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return false;
  }
  return true;
};

// ----------------- ADD STUDENT -----------------
export const addStudent = async (req, res) => {
  if (!requireAdmin(req, res)) return;

  const { name, email, username, department, rollNo, status, academicYear } = req.body;



  // Basic validation
  if (!name || !email || !username || !rollNo) {
    return res.status(400).json({ message: "Name, email, username, and roll number are required." });
  }

  try {
    // Check for duplicates
    const exists = await Student.findOne({ $or: [{ email }, { username }, { rollNo }] });
    if (exists) {


      return res.status(400).json({ message: "Email, username, or roll number already exists." });
    }
    const Guideexists = await Guide.findOne({ $or: [{ email }, { username }, { rollNo }] });
    if (Guideexists) {


      return res.status(400).json({ message: "Email, username, or roll number already exists." });
    }


    const student = new Student({ name, email, username, department, rollNo, status, academicYear });
    const savedStudent = await student.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Add Student Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// ----------------- EDIT STUDENT -----------------
export const editStudent = async (req, res) => {
  if (!requireAdmin(req, res)) return;


  const { id } = req.params;
  const { name, email, username, department, rollNo, status, academicYear } = req.body;

  try {

    // ✅ Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const updateFields = {};

    // ✅ Name validation
    if (name !== undefined) {
      if (name.trim().length < 3) {


        return res.status(400).json({ message: "Name must be at least 3 characters." });
      }
      updateFields.name = name.trim();
    }

    // ✅ Email validation
    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {


        return res.status(400).json({ message: "Invalid email format." });
      }
      updateFields.email = email.toLowerCase();
    }

    // ✅ Username validation
    if (username !== undefined) {
      if (username.length < 4) {


        return res.status(400).json({ message: "Username must be at least 4 characters." });
      }
      updateFields.username = username;
    }

    // ✅ Roll number validation
    if (rollNo !== undefined) {

      updateFields.rollNo = rollNo;
    }

    // ✅ Department validation
    if (department !== undefined) {
      updateFields.department = department;
    }

    // ✅ Academic Year
    if (academicYear !== undefined) {
      updateFields.academicYear = academicYear;
    }

    // ✅ Status validation
    if (status !== undefined) {
      const allowedStatus = ["Active", "Inactive", "Graduated"];
      if (!allowedStatus.includes(status)) {


        return res.status(400).json({ message: "Invalid status value." });
      }
      updateFields.status = status;
    }

    // ✅ Check if nothing to update
    if (Object.keys(updateFields).length === 0) {


      return res.status(400).json({ message: "No fields provided to update." });
    }

    // ✅ Check duplicate email / username
    if (email || username) {
      const existing = await Student.findOne({
        _id: { $ne: id },
        $or: [
          email ? { email } : null,
          username ? { username } : null
        ].filter(Boolean)
      });

      if (existing) {

        console.log("existung stu");

        return res.status(400).json({
          message: "Email or username already exists."
        });
      }
    }

    if (email || username) {
      const existing = await Guide.findOne({
        _id: { $ne: id },   // exclude current guide while updating
        $or: [
          email ? { email: email.toLowerCase() } : null,
          username ? { username } : null
        ].filter(Boolean)
      });

      if (existing) {
        // console.log("existing guide");

        return res.status(400).json({
          success: false,
          message: "Guide email or username already exists."
        });
      }
    }

    // ✅ Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json(updatedStudent);

  } catch (error) {
    console.error("Edit Student Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
// ----------------- DELETE STUDENT -----------------
export const deleteStudent = async (req, res) => {
  if (!requireAdmin(req, res)) return;

  const { id } = req.params;



  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ message: "Student deleted successfully." });
  } catch (error) {
    console.error("Delete Student Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// ----------------- GET ALL STUDENTS -----------------
export const getStudents = async (req, res) => {
  try {
    let students;
    const { department, role, id } = req.user.id



    // ✅ If user logged in → fetch only that student
    // ✅ If user logged in → fetch only that student
    // if (role === "Student" && id) {
    //   const student = await Student.find().lean();

    //   if (!student) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "Student not found"
    //     });
    //   }

    //   // ⭐ CHECK if student already in any group
    //   const existingGroup = await Group.findOne({
    //     "selectedMembers._id": id
    //   });

    //   if (existingGroup) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Student already assigned to a group",
    //       groupName: existingGroup.groupName
    //     });
    //   }

    //   // ✅ If not in any group → send student
    //   return res.status(200).json({
    //     success: true,
    //     data: student,
    //     department: department,
    //     studentId: id
    //   });
    // }


    // ✅ If no user id → fetch all students
    students = await Student.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
      department: department,
      studentId: id
    });

  } catch (error) {
    console.error("Get Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


export const getSudentProfile = async (req, res) => {
  try {
    // ✅ Logged-in guide ID from JWT middleware
    const studentId = req.user.id?.id;



    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID not found in request"
      });
    }

    // ✅ Fetch guide details
    const student = await Student.findById(studentId)
      .select("-password") // hide password field
      .lean();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error("Error fetching Student profile:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching Student profile"
    });
  }
};


export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id?.id;
    console.log(studentId, "student");
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID not found",
      });
    }

    // ✅ Extract text fields from FormData
    const {
      name,
      email,
      username,
      department,
      dob,
      phone,
      place,
      address,
      registerNumber,
    } = req.body;

    console.log(req.body, "bodd");

    const updateData = {};

    // ✅ Basic profile fields
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (department) updateData.department = department;

    // ✅ Extra profile fields
    if (dob) updateData.dob = dob;
    if (phone) updateData.phone = phone;
    if (place) updateData.place = place;
    if (address) updateData.address = address;
    if (registerNumber) updateData.rollNo = registerNumber;

    // ✅ Handle uploaded image
    // console.log(req.file, "file");

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    // ✅ Update in DB
    const updatedGuide = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGuide) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedGuide,
    });

  } catch (error) {
    console.error("Update Student Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};