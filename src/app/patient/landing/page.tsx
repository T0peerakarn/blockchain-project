"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import LeftMenuBar from "@/components/LeftMenuBar";
import QuickMenuButton from "@/components/QuickMenuButton";
import Table from "@/components/Table";

interface Appointment {
  id: string;
  name: string;
  date: string;
}

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
}

const PatientLandingPage = () => {
  const [user, setUser] = useState<IUser>();
  const [appointments, setAppointments] = useState<
    Record<string, keyof Appointment>[]
  >([]);

  const menuItems = [
    {
      title: "Appointments",
      onClick: () => console.log("Appointments clicked"),
    },
    {
      title: "Medical History",
      onClick: () => console.log("Medical History clicked"),
    },
    { title: "Lab Results", onClick: () => console.log("Lab Results clicked") },
    { title: "Reports", onClick: () => console.log("Reports clicked") },
    { title: "Settings", onClick: () => console.log("Settings clicked") },
  ];

  const appointmentColumns = [
    { key: "id", title: "Appointment ID" },
    { key: "name", title: "Appointment Name" },
    { key: "date", title: "Date" },
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/personal-info");
      const { user } = await res.json();

      console.log(user);

      setUser(user);
    };

    fetchData();
  }, []);

  return (
    user && (
      <div className="flex h-screen">
        {/* Left Menu Panel */}
        <LeftMenuBar name={user.first_name} menuItems={menuItems} />

        <div className="w-[80%] p-8">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar placeholder="Search..." />
          </div>

          {/* Quick Menu */}
          <h1 className="josefin-sans text-xl mb-4 text-[#585858]">
            Quick Menu
          </h1>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <QuickMenuButton
              title="Make an Appointment"
              onClick={() => console.log("Make an Appointment clicked")}
            />
            <QuickMenuButton
              title="Change Personal Information"
              onClick={() => console.log("Change Personal Information clicked")}
            />
            <QuickMenuButton
              title="View Medical History"
              onClick={() => console.log("View Medical History clicked")}
            />
          </div>

          {/* Appointment Summary */}
          <Table
            title="Your Appointment Summary"
            columns={appointmentColumns}
            data={appointments}
          />
        </div>
      </div>
    )
  );
};

export default PatientLandingPage;
