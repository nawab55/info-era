import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
// import Register from "./Components/Register";
import Home from "./Components/Home";
import AuthGuard from "./Components/AuthGuard";

// Employee Dashboard
import Layout from "./Components/Employee/Layout";
import WorkList from "./Components/Employee/sidebarComponent/WorkList";
import EmpHome from "./Components/Employee/EmpHome";
import Attendance from "./Components/Employee/sidebarComponent/Attendance";
import Salary from "./Components/Employee/sidebarComponent/Salary";
import LeaveHistory from "./Components/Employee/sidebarComponent/LeaveHistory";
import OfferLetter from "./Components/Employee/sidebarComponent/OfferLetter";
import IncrementLetter from "./Components/Employee/sidebarComponent/IncrementLetter";
import DailySheet from "./Components/Employee/sidebarComponent/DailySheet";

// Account Dashboard
import AccountLayout from "./Components/Account/AccountLayout";
import Dashboard from "./Components/Account/Dashboard";
import Profile from "./Components/Account/AccountSidebarComponent/Profile";
import AddCategory from "./Components/Account/Invoice/AddCategory";
import AddHsnCode from "./Components/Account/Invoice/AddHsnCode";
import Services from "./Components/Account/Invoice/Services";
import InvoiceForm from "./Components/Account/Invoice/InvoiceForm";
import InvoiceReports from "./Components/Account/Invoice/InvoiceReports";
import CustomerForm from "./Components/Account/Invoice/CustomerForm";
import CustomerUpdate from "./Components/Account/Invoice/CustomerUpdate"
import CustomerReports from "./Components/Account/Invoice/CustomerReports";

// HR Dashboard
import HRLayout from "./Components/HR/HRLayout"
import HRHome from "./Components/HR/HRHome";
import EmpRegistrationForm from "./Components/HR/Employee/EmpRegistrationForm";
import Worksheet from "./Components/HR/worksheet/Worksheet";
import HRAttendance from "./Components/HR/HRAttendance";
import AttendanceReport from "./Components/HR/Report/AttendanceReport";
import Project from "./Components/HR/Report/Project";
import Domain from "./Components/Account/AccountSidebarComponent/Domain";
import DomainReports from "./Components/Account/AccountSidebarComponent/DomainReports";
import EmpRegReports from "./Components/HR/Report/EmpRegReports";
import WorksheetReports from "./Components/HR/Report/WorksheetReports";
import EmployeeType from "./Components/HR/Employee/EmployeeType";

// Admin Dashboard
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHome from "./Components/Admin/AdminHome";
import AddCollege from "./Components/Admin/adminComponents/training/AddCollege";
import AddStudent from "./Components/Admin/adminComponents/training/AddStudent";
import Certificate from "./Components/Admin/adminComponents/training/Certificate";
import CollegeReports from "./Components/Admin/adminComponents/reports/CollegeReports";
import StudentReports from "./Components/Admin/adminComponents/reports/StudentReports";
import CertificateReports from "./Components/Admin/adminComponents/reports/CertificateReports";
import PrintCertificate from "./Components/Admin/adminComponents/training/PrintCertificate";
import PostJob from "./Components/Admin/adminComponents/jobs/PostJob";
import Activity from "./Components/Admin/adminComponents/activity/Activity";
import AddActivity from "./Components/Admin/adminComponents/activity/AddActivity";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home />} />

        <Route element={<AuthGuard />}>
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard_admin" element={<AdminHome />} />
            <Route path="add-college" element={<AddCollege />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="training-certificate" element={<Certificate />} />
            <Route path="print-certificate" element={<PrintCertificate />} />
            <Route path="college-reports" element={<CollegeReports />} />
            <Route path="student-reports" element={<StudentReports />} />
            <Route path="certificate-reports" element={<CertificateReports />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="activity" element={<Activity />} />
            <Route path="add-activity" element={<AddActivity />} />
          </Route>
      
          {/* HR Dashboard */}
          <Route path="/hr" element={<HRLayout />}>
            <Route index element={<HRHome />} />
            <Route path="register" element={<EmpRegistrationForm />} />
            <Route path="worksheet" element={<Worksheet />} />
            <Route path="attendance" element={<HRAttendance />} />
            <Route path="report/view_emp-registration" element={<EmpRegReports />} />
            <Route path="report/view_worksheet" element={<WorksheetReports />} />
            <Route path="report/view_attendance" element={<AttendanceReport />} />
            <Route path="report/view_project" element={<Project />} />
            <Route path="employee/type" element={<EmployeeType />} />
          </Route>
        </Route>

        <Route element={<AuthGuard />}>
          {/* Account Dashboard */}
          <Route path="/account" element={<AccountLayout />}>
            {/* <Route path="" element={<Dashboard />} /> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="product/addCategory" element={<AddCategory />} />
            <Route path="product/addHsnCode" element={<AddHsnCode />} />
            <Route path="product/services" element={<Services />} />
            <Route path="invoiceForm" element={<InvoiceForm />} />
            <Route path="invoiceReports" element={<InvoiceReports />} />
            <Route path="customer/addCustomer" element={<CustomerForm />} />
            <Route path="updateCustomer/:id" element={<CustomerUpdate />} />
            <Route path="customer/customerReport" element={<CustomerReports />} />
            <Route path="domain" element={<Domain />} />
            <Route path="domain/report" element={<DomainReports />} />
          </Route>

           {/* Employee Dashboard  */}
          <Route path="/employee" element={<Layout />}>
            <Route index element={<EmpHome />} />
            <Route path="worklist" element={<WorkList />} />
            <Route path="dailysheet" element={<DailySheet />} />
            <Route path="salary" element={<Salary />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<LeaveHistory />} />
            <Route path="hr/offer-letter" element={<OfferLetter />} />
            <Route path="hr/increment-letter" element={<IncrementLetter />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
