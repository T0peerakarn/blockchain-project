"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { ethers } from "ethers";
import contractAddress from "@/lib/contracts/HelloWorld/contractAddress.json";
import contractAbi from "@/lib/contracts/HelloWorld/contractAbi.json";

const Page = () => {
  const [name, setName] = useState<string>("World");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.HARDHAT_URL
      );
      const contract = new ethers.Contract(
        contractAddress.address,
        contractAbi.abi,
        provider
      );

      const message = await contract.greeting(name);
      setMessage(message);
    };

    fetchData();
  }, [name]);

  return (
    <div>
      <h1>{message}</h1>
      <input
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
    </div>
  );
};

export default Page;
