"use client";

import React, { useState } from "react";
import LeftMenuButton from "@/components/LeftMenuButton";

interface LeftMenuBarProps {
  menuItems: { title: string; onClick: () => void }[];
  defaultItem?: string;
}

const LeftMenuBar = ({ menuItems, defaultItem }: LeftMenuBarProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(
    defaultItem ?? menuItems[0].title
  );
  const name = "Bhutas";

  return (
    <div className="w-[20%] bg-[#709FEB] p-4">
      <h1 className="ml-6 mt-6 mb-10 josefin-sans text-xl text-white">
        Hello, {name}!
      </h1>
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
