"use client";

import { useEffect, useState } from "react";

import LeftMenuBar from "@/components/LeftMenuBar";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";

interface Appointment {
  id: string;
  patient: string;
  time: string;
  purpose: string;
}

const DoctorLandingPage = () => {
  const [appointments, setAppointments] = useState<
    Record<string, keyof Appointment>[]
  >([]);

  const menuItems = [
    { title: "Patients", onClick: () => console.log("Patients") },
    { title: "Appointments", onClick: () => console.log("Appointments") },
    { title: "Billing", onClick: () => console.log("Billing") },
    { title: "Reports", onClick: () => console.log("Reports") },
    { title: "Settings", onClick: () => console.log("Settings") },
  ];

  const appointmentColumns = [
    { key: "patient", title: "Patient name" },
    { key: "time", title: "Appointment time" },
    { key: "name", title: "Purpose of visit" },
  ];

  useEffect(() => {
    fetch("/appointments.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div className="flex h-screen">
      <LeftMenuBar menuItems={menuItems} />

      <div className="w-[80%] p-8">
        <div className="mb-8">
          <SearchBar placeholder="Search..." />
        </div>

        <Table
          title="Today's Appointment Summary"
          columns={appointmentColumns}
          data={appointments}
        />
      </div>
    </div>
  );
};

export default DoctorLandingPage;
