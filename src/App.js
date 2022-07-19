import ReportTable from "./comps/ReportTable";
import Sidebar from "./comps/Sidebar";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import InsertRoom from "./comps/InsertRoom";
import InsertAC from "./comps/InsertAC";
import ReportPdf from "./comps/ReportPdf";
import AddUser from "./comps/AddUser";
import AddSiteAccess from "./comps/AddSiteAccess";
import CurrentQ from "./comps/CurrentQ";
import CurrentStats from "./comps/CurrentStats";
import { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "./globals";

export default function App() {
  Axios.get(`${API_URL}/admin/quarter`)
    .then((res) => {
      console.log(res);
      localStorage.setItem("current-quarter", res.data[0].quarter_name);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div class="flex">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ReportTable />} />
          <Route path="/report" element={<ReportPdf />} />
          <Route path="/new/access" element={<AddSiteAccess />} />
          <Route path="/new/room" element={<InsertRoom />} />
          <Route path="/new/ac" element={<InsertAC />} />
          <Route path="/report" element={<ReportPdf />} />
          <Route path="/new/user" element={<AddUser />} />
          <Route path="/update/quarter" element={<CurrentQ />} />
          <Route path="/stats" element={<CurrentStats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
