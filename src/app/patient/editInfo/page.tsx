"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LeftMenuBar from "@/components/LeftMenuBar";
import Button from "@/components/Button";

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

const EditInfoPage = () => {
  const [formValues, setFormValues] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
    maritalStatus: "",
    religion: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetch("/personalInfo.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setFormValues(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // LOGIC GOES HERE, FIX HEREEEEEEE
    console.log("Form submitted:", formValues);
    router.push("/patient/personalInfo");
  };

  return (
    <div className="flex h-screen">
      <LeftMenuBar />

      <div className="w-[80%] p-8">
        <h1 className="josefin-sans text-xl mb-4 text-[#585858] font-medium">Edit Personal Information</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <label className="text-lg font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              pattern="[0]{1}[0-9]{9}"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={formValues.birthdate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">Marital Status</label>
            <input
              type="text"
              name="maritalStatus"
              value={formValues.maritalStatus}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">Religion</label>
            <input
              type="text"
              name="religion"
              value={formValues.religion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <Button title="Save" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditInfoPage;