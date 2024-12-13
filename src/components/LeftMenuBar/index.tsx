"use client";

import { useState } from "react";

import LeftMenuButton from "@/components/LeftMenuButton";
import Button from "../Button";

import { logoutAction } from "@/app/auth/actions";

interface LeftMenuBarProps {
  name: string;
  menuItems: { title: string; onClick: () => void }[];
  defaultItem?: string;
}

const LeftMenuBar = ({ name, menuItems, defaultItem }: LeftMenuBarProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(
    defaultItem ?? menuItems[0].title
  );

  return (
    <div className="sticky top-0 left-0 h-screen flex flex-col w-[20%] bg-[#709FEB] p-4">
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
      <div className="mt-auto flex justify-center">
        <Button title="Logout" onClick={logoutAction} />
      </div>
    </div>
  );
};

export default LeftMenuBar;
