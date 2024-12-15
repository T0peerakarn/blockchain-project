"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Table from "@/components/Table";

import { ethers } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import contractAddress from "@/lib/contracts/MedicalRecordValidator/contractAddress.json";
import contractAbi from "@/lib/contracts/MedicalRecordValidator/contractAbi.json";
import Swal from "sweetalert2";
import { formatDate } from "@/utils/datetime";

interface IValidation extends Record<string, string> {
  id: string;
  doctor: string;
  createdAt: string;
  result: "SUCCESS" | "FAILED";
}

const ValidateSection = () => {
  const [validations, setValidations] = useState<IValidation[]>([]);
  const validationColumns = [
    { key: "doctor", title: "Validate by" },
    { key: "createdAt", title: "Validate on" },
    { key: "result", title: "Result" },
  ];

  const validate = async () => {
    const resPersonalInfo = await fetch("/api/personal-info");
    const {
      user: { id },
    } = await resPersonalInfo.json();

    const resRecords = await fetch("/api/records");
    const { records: jsonRecords } = await resRecords.json();
    const records = jsonRecords.map((r: Record<string, any>) => ({
      id: r.id,
      patientId: Buffer.from(r.patient_id.replaceAll("-", ""), "hex"),
      doctorId: Buffer.from(r.doctor_id.replaceAll("-", ""), "hex"),
      detail: r.detail,
      createdAt: r.created_at,
    }));

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.HARDHAT_URL
    );
    const signer = new ethers.Wallet(
      keccak256(Buffer.from(id.replaceAll("-", ""), "hex")),
      provider
    );
    const contract = new ethers.Contract(
      contractAddress.address,
      contractAbi.abi,
      signer
    );

    const result = await contract.validateRecords(records);

    const willCloseHandler = async (result: boolean) => {
      await fetch("/api/validations", {
        method: "POST",
        body: JSON.stringify({
          doctor_id: id,
          result: result ? "SUCCESS" : "FAILED",
        }),
      });

      location.reload();
    };

    Swal.fire({
      title: result ? "Success" : "Fail",
      text: result
        ? "the records are looking good!"
        : "Something went wrong with the records",
      icon: result ? "success" : "error",
      willClose: async () => willCloseHandler(result),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/validations");
      const { validations } = await res.json();

      setValidations(
        validations.map((v: Record<string, any>) => ({
          id: v.id,
          doctor: `${v.doctor_info.first_name} ${v.doctor_info.last_name}`,
          createdAt: formatDate(new Date(v.created_at)),
          result: v.result,
        }))
      );
    };

    fetchData();
  }, []);

  return (
    <>
      <Table
        title="Previous Validation Results"
        columns={validationColumns}
        data={validations}
      />
      <div className="flex justify-center mt-8">
        <Button title="Run validate" onClick={validate} />
      </div>
    </>
  );
};

export default ValidateSection;
