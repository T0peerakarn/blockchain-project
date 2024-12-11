"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import LeftMenuBar from "@/components/LeftMenuBar";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthdate: string;
  maritalStatus: string;
  religion: string;
}

const PersonalInfoPage = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    fetch("/personalInfo.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPersonalInfo(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  if (!personalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Left Menu Panel */}
      <LeftMenuBar />

      <div className="w-[80%] p-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar placeholder="Search..." />
        </div>

        {/* Personal Information */}
        <h1 className="josefin-sans text-xl mb-4 text-[#585858]">Personal Information</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Full Name</h2>
            <p>{`${personalInfo.firstName} ${personalInfo.lastName}`}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Address</h2>
            <p>{personalInfo.address}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Contact Info</h2>
            <p>Phone: {personalInfo.phoneNumber}</p>
            <p>Email: {personalInfo.email}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Other Details</h2>
            <p>Birthdate: {personalInfo.birthdate}</p>
            <p>Marital Status: {personalInfo.maritalStatus}</p>
            <p>Religion: {personalInfo.religion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;