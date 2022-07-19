import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../globals";
import Logo from "../logothl.png";

export default function ReportPdf() {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [sites, setSites] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [siteid, setSiteid] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const doc = new jsPDF();

  const getData = async (date) => {
    if (siteid !== "" && selectedQuarter !== "") {
      try {
        const res = await Axios.get(
          `${API_URL}/admin/ac/${date}/${siteid}/${selectedQuarter}`
        );
        setData(res.data);
        console.log(res.data);
        setDataCount(res.data.length);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    } else {
      setIsError(true);
      alert("Please select a site and quarter");
      return;
    }
  };

  const getQuarters = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/quarters`);
      setQuarters(res.data);
      console.log(res.data);
    } catch (err) {
      setIsError(true);
    }
  };

  const getSites = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/sites`);
      setSites(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSiteid(e.target.value);
  };

  const handleQChange = (e) => {
    e.preventDefault();
    setSelectedQuarter(e.target.value);
  };

  useEffect(() => {
    getSites();
    getQuarters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generatePdf = (e) => {
    e.preventDefault();
    console.log("QUARTERS" + JSON.stringify(quarters));
    if (date !== "") {
      getData(date);
    } else {
      return;
    }

    doc.autoTable({
      html: "#report-table",
      margin: { top: 80 },
      styles: { cellPadding: 0.5, fontSize: 8 },
      didDrawCell: (data) => {
        if (data.column.index === 0) {
          doc.setFont("helvetica", "bold");
        }
      },
    });
  };

  const downloadPdf = (e) => {
    e.preventDefault();
    if (date !== "") {
      getData(date);
    } else {
      return;
    }

    doc.addImage(Logo, "png", 85, 25, 40, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 78, 115);
    doc.text(
      "Telecom. ICT. Mechanical. Electrical. Security Systems",
      105,
      50,
      "center"
    );
    doc.text(
      "Pundamilia/ Nahodharasmi Junction, Sinza 'E' Street, Ubungo District",
      105,
      55,
      "center"
    );
    doc.text(
      "P.O.Box 333, Tel: +255 739 777 797 Dar es Salaam",
      105,
      60,
      "center"
    );
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Site Name: " + data[0].site_name, 15, 70, "left");
    // doc.text("#201", 185, 70, "left");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("AIR CONDITION SERVICE REPORT", 105, 75, "center");
    doc.autoTable({
      html: "#report-table",
      margin: { top: 80 },
      styles: { cellPadding: 0.5, fontSize: 8 },
      didDrawCell: (data) => {
        if (data.column.index === 0) {
          doc.setFont("helvetica", "bold");
        }
      },
    });
    const posY = 240;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(207, 33, 33);
    doc.text("Serviced by: ", 15, posY + 10, "left");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Name: ..........................................",
      15,
      posY + 15,
      "left"
    );
    doc.text(
      "Designation: ...................................",
      15,
      posY + 20,
      "left"
    );
    doc.text(
      "Signature: .......................................",
      15,
      posY + 25,
      "left"
    );
    doc.text("Date: " + data[0].date_done.split("T")[0], 15, posY + 30, "left");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(207, 33, 33);
    doc.text("Approved by: ", 130, posY + 10, "left");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Name: ............................................ ",
      130,
      posY + 15,
      "left"
    );
    doc.text(
      "Designation: .................................... ",
      130,
      posY + 20,
      "left"
    );
    doc.text(
      "Organization: ....................................",
      130,
      posY + 25,
      "left"
    );
    doc.text(
      "Signature: .......................................",
      130,
      posY + 30,
      "left"
    );
    doc.text(
      "Date: ..........................................",
      130,
      posY + 35,
      "left"
    );
    doc.save(`AC Maintenance Report [${data[0].site_name} - ${date}].pdf`);
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  return (
    <div className="p-12">
      <input
        onChange={handleDateChange}
        className="p-2"
        type="date"
        id="date"
        name="date"
      />
      <select id="site" className="p-2 text-gray-900" onChange={handleChange}>
        <option key="0" value="" selected>
          Select Site
        </option>
        {sites.map((site) => (
          <option key={site.site_id} className="p-2" value={site.site_id}>
            {site.site_name}
          </option>
        ))}
      </select>
      <select
        id="quarter"
        className="p-2 text-gray-900"
        onChange={handleQChange}
      >
        <option value="" selected>
          Select Quarter
        </option>
        {quarters.map((quarter) => (
          <option key={quarter.quarter} value={quarter.quarter}>
            Quarter {quarter.quarter}
          </option>
        ))}
      </select>
      <button
        className="p-2 rounded-md ml-4 text-white bg-red-500 hover:bg-red-600"
        onClick={generatePdf}
      >
        Generate Report
      </button>
      <button
        className="p-2 rounded-md ml-4 text-white bg-red-500 hover:bg-red-600"
        onClick={downloadPdf}
      >
        Download Report
      </button>
      {dataCount < 1 ? (
        <p className="text-gray-800 text-2xl ml-2 mt-2">No reports found.</p>
      ) : null}
      <table
        id="report-table"
        className="text-sm text-left text-gray-700 mx-auto my-12"
      >
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 w-4/5 mx-auto">
          <tr>
            <th scope="col" className="p-4">
              AC ID
            </th>
            <th scope="col" className="px-4 py-2">
              AC Brand/ Type
            </th>
            <th scope="col" className="px-4 py-2">
              Location
            </th>
            <th scope="col" className="px-4 py-2">
              Spare Part Replaced
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td className="p-2">{item.id}</td>
              <td className="p-2">
                {item.brand_name + " - " + item.type_name + " - " + item.btu}
              </td>
              <td className="p-2">{item.room_name.slice(0, -8)}</td>
              <td className="p-2">{item.replaced}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
