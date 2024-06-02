//AdminRoute.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import RouteandSchedule from "./pages/RouteandSchedule/RouteandSchedule";
import AnnouncementandDelayReportsAdmin from "./pages/AnnouncementandDelayReportsAdmin/AnnouncementandDelayReportsAdmin";
import Employees from "./pages/Employees/Employees";
import Package from "./pages/Package/Package";
import DashboardElement from "./pages/Dashboard/Dashboard";
import LayoutAdmin from "./LayoutAdmin";
import RouteManagement from "./pages/RouteManagement/RouteManagement";
import BusManagement from "./pages/BusManagement/BusManagement";
import FormBus from "./pages/FormBus/FormBus";
import FormRoute from "./pages/FormRoute/FormRoute";
import FormAddEmployee from "./pages/FormAddEmployee/FormAddEmployee";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import axios from "axios";
import { useState,useEffect } from "react";

function AdminRoutes() {
  console.log("Rendering LayoutAdmin");
  const [profileInfo, setProfileInfo] = useState({});

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileInfo(response.data);
    } catch (error) {
      console.log("Error Fetching admin profile information: ", error);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);
  return (
    <>
      <LayoutAdmin></LayoutAdmin>
      <div style={{ marginLeft: "16%", marginTop: "6%" }}>
        <Routes>
          <Route index element={<DashboardElement />} />
          <Route path="routeschedule">
            <Route index element={<RouteandSchedule />} />
            <Route path="routemanagement">
              <Route index element={<RouteManagement />} />
              <Route path="addroute" element={<FormRoute />} />
            </Route>
            <Route path="busmanagement">
              <Route index element={<BusManagement />} />
              <Route path="addbus" element={<FormBus />} />
            </Route>
            <Route path="employees"></Route>
          </Route>
          <Route
            path="announcementanddelayreports"
            element={<AnnouncementandDelayReportsAdmin />}
          />
          <Route path="employees">
            <Route index element={<Employees />} />
            <Route path="addemployee" element={<FormAddEmployee />} />
          </Route>

          <Route path="packagetransfer" element={<Package />} />

          <Route path="ProfileForm" element={<ProfileForm profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>}/>
        </Routes>
      </div>
    </>
  );
}

export default AdminRoutes;
