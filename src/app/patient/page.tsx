"use client";

import { useState, useEffect } from "react";

import LeftMenuBar from "@/components/LeftMenuBar";
import AppointmentsSection from "./AppointmentsSection";
import MedicalHistory from "./MedicalHistorySection";

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
}

type SectionType = "Appointments" | "MedicalHistory";

const PatientLandingPage = () => {
  const [user, setUser] = useState<IUser>();
  const [currentSection, setCurrentSection] =
    useState<SectionType>("Appointments");

  const menuItems = [
    {
      title: "Appointments",
      onClick: () => setCurrentSection("Appointments"),
    },
    {
      title: "Medical History",
      onClick: () => setCurrentSection("MedicalHistory"),
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "Appointments":
        return <AppointmentsSection />;
      case "MedicalHistory":
        return <MedicalHistory />;
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
      <div className="flex h-screen">
        <LeftMenuBar name={user.first_name} menuItems={menuItems} />

        <div className="w-[80%] p-8">{renderSection()}</div>
      </div>
    )
  );
};

export default PatientLandingPage;
