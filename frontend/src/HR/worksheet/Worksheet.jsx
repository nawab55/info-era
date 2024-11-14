// import { useState, useEffect } from "react";
// import api from "../../config/api";
// import { toast } from "react-toastify";
// import * as XLSX from "xlsx";
// import { HiX } from "react-icons/hi";

// const Worksheet = () => {
//   const [employeeTypes, setEmployeeTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [showExcelTable, setShowExcelTable] = useState(false); // State to control table visibility
//   const [formData, setFormData] = useState({
//     empId: "",
//     empName: "",
//     designation: "",
//     date: new Date().toISOString().split("T")[0], // Initialize with current date
//     projectName: "",
//     work: "",
//     file: null,
//   });
//   const [excelData, setExcelData] = useState([]); // State to store Excel data

//   useEffect(() => {
//     // Fetch employee types from the backend
//     const fetchEmployeeTypes = async () => {
//       try {
//         const response = await api.get("/api/type/employee-types");
//         setEmployeeTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching employee types:", error);
//       }
//     };

//     fetchEmployeeTypes();
//   }, []);

//   useEffect(() => {
//     // Fetch employees from the backend
//     const fetchEmployees = async () => {
//       try {
//         const response = await api.get("/api/user/all/getalluser");
//         setEmployees(response.data.users);
//         console.log(response.data);
//       } catch (error) {
//         console.log("Error fetching employees:", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     // Filter employees based on selected employee type
//     if (selectedType) {
//       console.log(selectedType);

//       setFilteredEmployees(
//         employees.filter((emp) => emp.empType === selectedType)
//       );
//     } else {
//       setFilteredEmployees([]);
//     }
//   }, [selectedType, employees]);

//   const handleEmployeeTypeChange = (e) => {
//     setSelectedType(e.target.value);
//     setFormData({
//       ...formData,
//       empId: "",
//       empName: "",
//       designation: "",
//       projectName: "",
//       work: "",
//       file: null,
//     });
//   };

//   const handleEmployeeChange = (e) => {
//     const empId = e.target.value;
//     console.log(empId);

//     const employee = filteredEmployees.find((emp) => emp.EmpId === empId);
//     console.log(employee);

//     if (employee) {
//       setFormData({
//         ...formData,
//         empId: employee.EmpId,
//         empName: employee.name,
//         designation: employee.designation,
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       file,
//     });
//   };

//   const handleViewFile = () => {
//     const fileReader = new FileReader();
//     fileReader.readAsArrayBuffer(formData.file);

//     fileReader.onload = (e) => {
//       const bufferArray = e.target.result;

//       const wb = XLSX.read(bufferArray, { type: "buffer" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];

//       const data = XLSX.utils.sheet_to_json(ws);
//       console.log(data);
//       setExcelData(data); // Set the extracted data to excelData state
//       setShowExcelTable(true); // Show the table
//     };

//     fileReader.onerror = (error) => {
//       console.error("Error reading file:", error);
//     };
//   };

//   const handleCloseTable = () => {
//     setShowExcelTable(false); // Hide the table
//     setExcelData([]); // Clear the data
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }
//     try {
//       // Submit form data to the backend
//       const response = await api.post("/api/worksheet/creatework", formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success(`Worksheet for ${formData.empName} is created successfully`);
//       console.log("Form submitted successfully:", response.data);
//       // Reset form after submission
//       setFormData({
//         empId: "",
//         empName: "",
//         designation: "",
//         date: new Date().toISOString().split("T")[0],
//         projectName: "",
//         work: "",
//         file: null,
//       });
//       setSelectedType("");
//       setFilteredEmployees([]);

//     } catch (error) {
//       console.log("Error submitting form:", error);
//     }
//   };

//   return (
//     <section className="bg-slate-50 h-full mt-16 md:ml-52">
//       <form className="bg-emerald-100 p-4 space-y-4" onSubmit={handleSubmit}>
//         <div className="p-4 text-center text-2xl bg-emerald-600 rounded-md shadow-lg shadow-emerald-500 text-white">
//           Worksheet Form
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">

//           {/* Employee Type */}
//           <div>
//             <label className="block font-semibold text-gray-900">Employee Type</label>
//             <select
//               name="employeeType"
//               value={selectedType}
//               onChange={handleEmployeeTypeChange}
//               className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
//             >
//               <option value="">Select Employee Type</option>
//               {employeeTypes.map((type) => (
//                 <option key={type._id} value={type.type}>
//                   {type.type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Employee ID */}
//           <div>
//             <label className="block font-semibold text-gray-900">Employee ID</label>
//             <select
//               name="empId"
//               value={formData.empId}
//               onChange={handleEmployeeChange}
//               className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
//               disabled={!selectedType}
//             >
//               <option value="">Select Employee</option>
//               {filteredEmployees.map((employee) => (
//                 <option key={employee.EmpId} value={employee.EmpId}>
//                   {employee.name} - {employee.EmpId}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Date */}
//           <div>
//             <label className="block font-semibold text-gray-900">Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Conditional Inputs */}
//           {selectedType === "Developer" && (
//             <>
//               {/* Project Name */}
//               <div>
//                 <label className="block font-semibold text-gray-900">Project Name</label>
//                 <input
//                   type="text"
//                   name="projectName"
//                   value={formData.projectName}
//                   onChange={handleInputChange}
//                   className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
//                 />
//               </div>

//               {/* Work */}
//               <div className="mb-12">
//                 <label className="block font-semibold text-gray-900">Work</label>
//                 <input
//                   type="text"
//                   name="work"
//                   value={formData.work}
//                   onChange={handleInputChange}
//                   className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
//                 />
//               </div>
//             </>
//           )}

//           {selectedType === "Telecaller" && (
//             <>
//               {/* Upload Excel */}
//               <div>
//                 <label className="block font-semibold text-gray-900">Upload Excel</label>
//                 <input
//                   type="file"
//                   accept=".xlsx, .xls"
//                   onChange={handleFileChange}
//                   className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
//                 />
//               </div>

//               {/* View Button */}
//               <div className="mt-6 flex items-center">
//                 <button
//                   type="button"
//                   onClick={handleViewFile}
//                   className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg shadow-emerald-500"
//                 >
//                   View File
//                 </button>
//               </div>
//             </>
//           )}

//         </div>

//         <div className="flex justify-center py-2">
//           <button
//             type="submit"
//             className="flex items-center justify-center bg-emerald-700 text-white px-4 py-2 rounded-md shadow-lg shadow-emerald-500"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//         {/* Excel Data Display */}
//       {showExcelTable && (
//         <div className="my-4 p-6 mx-4">
//           <div className="flex justify-between">
//             <h2 className="text-xl font-semibold mb-4">Excel Data</h2>
//             <button
//               onClick={handleCloseTable}
//               className=" text-gray-600 hover:text-red-700"
//               aria-label="Close"
//             >
//               <HiX size={24} />
//             </button>
//           </div>
//           <div className="overflow-x-auto rounded-md shadow-lg shadow-emerald-400">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead>
//                 <tr>
//                   {Object.keys(excelData[0]).map((key) => (
//                     <th key={key} className="border border-gray-300 bg-blue-400 px-4 py-2 text-left">{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {excelData.map((row, index) => (
//                   <tr key={index}>
//                     {Object.values(row).map((value, i) => (
//                       <td key={i} className="border border-gray-300 px-4 py-2">{value}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Worksheet;

// import { useState, useEffect } from "react";
// import api from "../../config/api";
// import { toast } from "react-toastify";
// import * as XLSX from "xlsx";
// import { HiX } from "react-icons/hi";
// import { motion } from "framer-motion";

// const Worksheet = () => {
//   const [employeeTypes, setEmployeeTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [showExcelTable, setShowExcelTable] = useState(false);
//   const [formData, setFormData] = useState({
//     empId: "",
//     empName: "",
//     designation: "",
//     date: new Date().toISOString().split("T")[0],
//     projectName: "",
//     work: "",
//     file: null,
//   });
//   const [excelData, setExcelData] = useState([]);

//   useEffect(() => {
//     const fetchEmployeeTypes = async () => {
//       try {
//         const response = await api.get("/api/type/employee-types");
//         setEmployeeTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching employee types:", error);
//       }
//     };
//     fetchEmployeeTypes();
//   }, []);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await api.get("/api/user/all/getalluser");
//         setEmployees(response.data.users);
//         console.log(response.data);
//       } catch (error) {
//         console.log("Error fetching employees:", error);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (selectedType) {
//       setFilteredEmployees(
//         employees.filter((emp) => emp.empType === selectedType)
//       );
//     } else {
//       setFilteredEmployees([]);
//     }
//   }, [selectedType, employees]);

//   const handleEmployeeTypeChange = (e) => {
//     setSelectedType(e.target.value);
//     setFormData({
//       ...formData,
//       empId: "",
//       empName: "",
//       designation: "",
//       projectName: "",
//       work: "",
//       file: null,
//     });
//   };

//   const handleEmployeeChange = (e) => {
//     const empId = e.target.value;
//     const employee = filteredEmployees.find((emp) => emp.EmpId === empId);
//     if (employee) {
//       setFormData({
//         ...formData,
//         empId: employee.EmpId,
//         empName: employee.name,
//         designation: employee.designation,
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       file,
//     });
//   };

//   const handleViewFile = () => {
//     const fileReader = new FileReader();
//     fileReader.readAsArrayBuffer(formData.file);

//     fileReader.onload = (e) => {
//       const bufferArray = e.target.result;
//       const wb = XLSX.read(bufferArray, { type: "buffer" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const data = XLSX.utils.sheet_to_json(ws);
//       setExcelData(data);
//       setShowExcelTable(true);
//     };

//     fileReader.onerror = (error) => {
//       console.error("Error reading file:", error);
//     };
//   };

//   const handleCloseTable = () => {
//     setShowExcelTable(false);
//     setExcelData([]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }
//     try {
//       await api.post("/api/worksheet/creatework", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success(
//         `Worksheet for ${formData.empName} is created successfully`
//       );
//       setFormData({
//         empId: "",
//         empName: "",
//         designation: "",
//         date: new Date().toISOString().split("T")[0],
//         projectName: "",
//         work: "",
//         file: null,
//       });
//       setSelectedType("");
//       setFilteredEmployees([]);
//     } catch (error) {
//       console.log("Error submitting form:", error);
//     }
//   };

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="bg-gradient-to-br from-teal-50 to-emerald-100 h-full mt-16 md:ml-52"
//     >
//       <form
//         className="bg-white p-6 space-y-6 rounded-lg shadow-xl"
//         onSubmit={handleSubmit}
//       >
//         <motion.div
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           transition={{ type: "spring", stiffness: 120 }}
//           className="p-4 text-center text-3xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 rounded-md text-white shadow-md shadow-emerald-500"
//         >
//           Worksheet Form
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
//           <div>
//             <label className="block font-semibold text-gray-900">
//               Employee Type
//             </label>
//             <select
//               name="employeeType"
//               value={selectedType}
//               onChange={handleEmployeeTypeChange}
//               className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               <option value="">Select Employee Type</option>
//               {employeeTypes.map((type) => (
//                 <option key={type._id} value={type.type}>
//                   {type.type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-900">
//               Employee ID
//             </label>
//             <select
//               name="empId"
//               value={formData.empId}
//               onChange={handleEmployeeChange}
//               className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//               disabled={!selectedType}
//             >
//               <option value="">Select Employee</option>
//               {filteredEmployees.map((employee) => (
//                 <option key={employee.EmpId} value={employee.EmpId}>
//                   {employee.name} - {employee.EmpId}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-900">Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//             />
//           </div>

//           {selectedType === "Developer" && (
//             <>
//               <div>
//                 <label className="block font-semibold text-gray-900">
//                   Project Name
//                 </label>
//                 <input
//                   type="text"
//                   name="projectName"
//                   value={formData.projectName}
//                   onChange={handleInputChange}
//                   className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//                 />
//               </div>

//               <div className="mb-12">
//                 <label className="block font-semibold text-gray-900">
//                   Work
//                 </label>
//                 <input
//                   type="text"
//                   name="work"
//                   value={formData.work}
//                   onChange={handleInputChange}
//                   className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//                 />
//               </div>
//             </>
//           )}

//           {selectedType === "Telecaller" && (
//             <>
//               <div>
//                 <label className="block font-semibold text-gray-900">
//                   Upload Excel
//                 </label>
//                 <input
//                   type="file"
//                   accept=".xlsx, .xls"
//                   onChange={handleFileChange}
//                   className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//                 />
//               </div>

//               <div className="mt-8 flex items-center justify-center">
//                 <button
//                   type="button"
//                   onClick={handleViewFile}
//                   className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
//                   disabled={!formData.file}
//                 >
//                   View File
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           className="flex justify-center mt-6"
//         >
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
//           >
//             Submit
//           </button>
//         </motion.div>
//       </form>

//       {showExcelTable && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-3xl max-h-[80vh] bg-white rounded-md shadow-xl p-4 md:p-6 relative overflow-y-auto">
//             <button
//               onClick={handleCloseTable}
//               className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-500 transition-transform duration-200"
//             >
//               <HiX />
//             </button>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-left border-collapse mt-4">
//                 <thead>
//                   <tr className="bg-teal-600 text-white text-sm md:text-lg font-semibold">
//                     {excelData.length > 0 &&
//                       Object.keys(excelData[0]).map((header) => (
//                         <th
//                           key={header}
//                           className="p-2 md:p-4 border-b border-teal-200"
//                         >
//                           {header}
//                         </th>
//                       ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {excelData.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className="hover:bg-teal-100 transition-colors"
//                     >
//                       {Object.values(row).map((cell, cellIdx) => (
//                         <td
//                           key={cellIdx}
//                           className="p-2 md:p-4 border-b border-teal-200 text-sm md:text-base"
//                         >
//                           {cell}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.section>
//   );
// };

// export default Worksheet;

import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { HiX } from "react-icons/hi";

const Worksheet = () => {
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showExcelTable, setShowExcelTable] = useState(false);
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    designation: "",
    date: new Date().toISOString().split("T")[0],
    projectName: "",
    work: "",
    file: null,
  });
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await api.get("/api/type/employee-types");
        setEmployeeTypes(response.data);
      } catch (error) {
        console.error("Error fetching employee types:", error);
      }
    };
    fetchEmployeeTypes();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/api/user/all/getalluser");
        setEmployees(response.data.users);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredEmployees(
        employees.filter((emp) => emp.empType === selectedType)
      );
    } else {
      setFilteredEmployees([]);
    }
  }, [selectedType, employees]);

  const handleEmployeeTypeChange = (e) => {
    setSelectedType(e.target.value);
    setFormData({
      ...formData,
      empId: "",
      empName: "",
      designation: "",
      projectName: "",
      work: "",
      file: null,
    });
  };

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    const employee = filteredEmployees.find((emp) => emp.EmpId === empId);
    if (employee) {
      setFormData({
        ...formData,
        empId: employee.EmpId,
        empName: employee.name,
        designation: employee.designation,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleViewFile = () => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(formData.file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setExcelData(data);
      setShowExcelTable(true);
    };

    fileReader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  const handleCloseTable = () => {
    setShowExcelTable(false);
    setExcelData([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      await api.post("/api/worksheet/creatework", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`Worksheet for ${formData.empName} created successfully`);
      setFormData({
        empId: "",
        empName: "",
        designation: "",
        date: new Date().toISOString().split("T")[0],
        projectName: "",
        work: "",
        file: null,
      });
      setSelectedType("");
      setFilteredEmployees([]);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <section className="bg-gradient-to-br flex-1 from-teal-50 to-emerald-100 h-full  p-4">
      <form
        className="bg-white p-6 space-y-6 rounded-lg shadow-xl transition-transform transform"
        onSubmit={handleSubmit}
      >
        <div className="p-4 text-center text-3xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 rounded-md text-white shadow-md">
          Worksheet Form
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div>
            <label className="block font-semibold text-gray-900">
              Employee Type
            </label>
            <select
              name="employeeType"
              value={selectedType}
              onChange={handleEmployeeTypeChange}
              className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 transition duration-300 transform hover:scale-105"
            >
              <option value="">Select Employee Type</option>
              {employeeTypes.map((type) => (
                <option key={type._id} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-900">
              Employee ID
            </label>
            <select
              name="empId"
              value={formData.empId}
              onChange={handleEmployeeChange}
              className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 transition duration-300 transform hover:scale-105"
              disabled={!selectedType}
            >
              <option value="">Select Employee</option>
              {filteredEmployees.map((employee) => (
                <option key={employee.EmpId} value={employee.EmpId}>
                  {employee.name} - {employee.EmpId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-900">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 transition duration-300 transform hover:scale-105"
            />
          </div>

          {selectedType === "Developer" && (
            <>
              <div>
                <label className="block font-semibold text-gray-900">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 transition duration-300 transform hover:scale-105"
                />
              </div>

              <div className="mb-12">
                <label className="block font-semibold text-gray-900">
                  Work
                </label>
                <input
                  type="text"
                  name="work"
                  value={formData.work}
                  onChange={handleInputChange}
                  className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 transition duration-300 transform hover:scale-105"
                />
              </div>
            </>
          )}

          {selectedType === "Telecaller" && (
            <>
              <div>
                <label className="block font-semibold text-gray-900">
                  Upload Excel
                </label>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="bg-teal-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-teal-500 transition duration-300 transform hover:scale-105"
                />
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleViewFile}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
                  disabled={!formData.file}
                >
                  View File
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-500 to-green-600 text-white px-6 py-2 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
          >
            Submit Worksheet
          </button>
        </div>
      </form>

      {showExcelTable && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">Excel Data</h3>
            <button
              className="bg-red-500 text-white rounded-full p-2 hover:bg-red-700 transition transform hover:scale-105"
              onClick={handleCloseTable}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
          <table className="table-auto w-full mt-4">
            <thead className="bg-gradient-to-r from-teal-400 to-green-500 text-white">
              <tr>
                {Object.keys(excelData[0] || {}).map((key) => (
                  <th key={key} className="px-4 py-2 text-left font-semibold">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-teal-50"
                >
                  {Object.values(row).map((value, cellIdx) => (
                    <td key={cellIdx} className="px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Worksheet;
