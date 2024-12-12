"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import LeftMenuBar from "@/components/LeftMenuBar";
import QuickMenuButton from "@/components/QuickMenuButton";

interface Appointment {
  id: string;
  name: string;
  date: string;
}

const PatientLandingPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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
      {/* Left Menu Panel */}
      <LeftMenuBar />

      <div className="w-[80%] p-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar placeholder="Search..." />
        </div>

        {/* Quick Menu */}
        <h1 className="josefin-sans text-xl mb-4 text-[#585858] font-medium">Quick Menu</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <QuickMenuButton title="Make an Appointment" onClick={() => console.log("Make an Appointment clicked")} />
          <QuickMenuButton title="Change Personal Information" onClick={() => console.log("Change Personal Information clicked")} />
          <QuickMenuButton title="View Medical History" onClick={() => console.log("View Medical History clicked")} />
        </div>

        {/* Appointment Summary */}
        <div>
          <h2 className="josefin-sans text-xl mb-4 text-[#585858] font-medium">Your Appointment Summary</h2>
          <table className="w-full bg-[#F7F7F7] shadow-md rounded-lg">
            <thead className="josefin-sans font-light text-left bg-[#EBEBEB]">
              <tr>
                <th className="p-4 border-b font-medium rounded-tl-lg">Appointment ID</th>
                <th className="p-4 border-b font-medium">Appointment Name</th>
                <th className="p-4 border-b font-medium rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="josefin-sans">
                  <td className="p-4 border-b font-light">{appointment.id}</td>
                  <td className="p-4 border-b font-light">{appointment.name}</td>
                  <td className="p-4 border-b font-light">{appointment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientLandingPage;