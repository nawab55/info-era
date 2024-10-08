import { useState, useEffect } from "react";
import api from "../../../config/api";

const StudentReports = () => {
  const [students, setStudents] = useState([]);

  // Fetch student data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/api/student/get-students");
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <section className="md:ml-60 bg-gray-50 px-4">
      <div className="bg-blue-700 p-4 text-center text-white text-2xl font-bold border-b-2 border-gray-700 shadow-md">
        View All Student Reports
      </div>

      <div className="p-4">
        <div className="overflow-x-auto pb-10">
          <table className="min-w-full text-center text-sm bg-white shadow-lg rounded-lg">
            <thead className="border-b border-gray-300 font-medium bg-gray-200">
              <tr className="text-gray-900 border font-bold text-lg">
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Sl. No</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Student Name</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">College Name</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Course</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Branch</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Registration No</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Year/Session</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Roll No</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Semester</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Mobile No</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Training Topic</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Email Id</th>
                <th className="px-2 py-3 border border-gray-300 whitespace-nowrap">Language</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={student._id}
                    className="bg-white text-sm font-medium border border-gray-300 hover:bg-gray-100 transition duration-150"
                  >
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.studentName}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.collegeName}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.course}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.branch}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.registrationNo}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.yearSession}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.rollNo}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.semester}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.mobileNo}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.trainingTopic}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.emailId}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {student.language}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center py-6 text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default StudentReports;
