import React, { useState } from "react";
import LeftMenuButton from "@/components/LeftMenuButton";

const menuItems = [
  { title: "Appointments", onClick: () => console.log("Appointments clicked") },
  { title: "Medical History", onClick: () => console.log("Medical History clicked") },
  { title: "Lab Results", onClick: () => console.log("Lab Results clicked") },
  { title: "Reports", onClick: () => console.log("Reports clicked") },
  { title: "Settings", onClick: () => console.log("Settings clicked") },
];

const LeftMenuBar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Appointments");
  const name = "Bhutas"

  return (
    <div className="w-[20%] bg-[#709FEB] p-4">
        <h1 className="ml-6 mt-6 mb-10 josefin-sans text-xl text-white">Hello, {name}!</h1>
      <ul className="flex flex-col gap-4 text-white">
        {menuItems.map((item, index) => (
          <li key={index}>
            <LeftMenuButton
              title={item.title}
              selected={selectedItem === item.title}
              onClick={() => {
                setSelectedItem(item.title);
                item.onClick();
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenuBar;