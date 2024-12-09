const Student = require("../../models/training_model/student_model");

// Generate next registration number
const generateRegistrationNo = async () => {
  const lastStudent = await Student.findOne().sort({ createdAt: -1 });
  if (!lastStudent) return "IE/EDU/001";

  const lastRegNo = lastStudent.registrationNo;
  const [prefix, count] = lastRegNo.split("/").slice(-2);
  const newCount = String(parseInt(count) + 1).padStart(3, "0");
  return `IE/EDU/${newCount}`;
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    req.body.registrationNo = await generateRegistrationNo();
    // Create and save the new student
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({
      success: true,
      data: newStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get the latest registration number
exports.getLatestRegistration = async (req, res) => {
  try {
    const latestStudent = await Student.findOne().sort({ createdAt: -1 });
    const latest = latestStudent ? latestStudent.registrationNo : "IE/EDU/001";
    res.status(200).json({ success: true, latest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get students with pagination
exports.getStudents = async (req, res) => {
  const { page = 1, search = "", limit = 10 } = req.query;
  // const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const query = search
      ? {
          $or: [
            { studentName: { $regex: search, $options: "i" } },
            { emailId: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const students = await Student.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      students,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching students." });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting student." });
  }
};
