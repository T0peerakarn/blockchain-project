"use client";

import { useEffect, useState } from "react";

import LeftMenuBar from "@/components/LeftMenuBar";
import AppointmentsSection from "./AppointmentsSection";
import PatientsSection from "./PatientsSection";
import CasesSection from "./CasesSection";
import ValidateSection from "./ValidateSection";

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
}

type SectionType = "Appointments" | "Cases" | "Patients" | "Validate";

const DoctorLandingPage = () => {
  const [user, setUser] = useState<IUser>();
  const [currentSection, setCurrentSection] =
    useState<SectionType>("Appointments");

  const menuItems = [
    { title: "Appointments", onClick: () => setCurrentSection("Appointments") },
    { title: "Cases", onClick: () => setCurrentSection("Cases") },
    { title: "Patients", onClick: () => setCurrentSection("Patients") },
    { title: "Validate Records", onClick: () => setCurrentSection("Validate") },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "Appointments":
        return <AppointmentsSection />;
      case "Patients":
        return <PatientsSection />;
      case "Cases":
        return <CasesSection />;
      case "Validate":
        return <ValidateSection />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/personal-info");
      const { user } = await res.json();

      setUser(user);
    };

    fetchData();
  }, []);

  return (
    user && (
      <div className="flex">
        <LeftMenuBar name={user.first_name} menuItems={menuItems} />
        <div className="w-[80%] p-8">{renderSection()}</div>
      </div>
    )
  );
};

export default DoctorLandingPage;
