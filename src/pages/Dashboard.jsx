import { useSelector } from "react-redux";

import CustomerDashboard from "../pages/Customer/CustomerDashboard";
import EmployeeDashboard from "./Employee/EmployeeDashboard";

const Dashboard = () => {

    const auth = useSelector((state) => state.auth.form)

    switch (auth?.role) {
        case "CUSTOMER":
            return <CustomerDashboard />;

        case "EMPLOYEE":
            return <EmployeeDashboard />;

        case "MANAGER":
            return <EmployeeDashboard />;

        // case "ADMIN":
        //     return <AdminDashboard />;

        default:
            return null;
    }
};

export default Dashboard;