import { useActionState, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import Button from "@/components/Button";
import Select from "react-select";

import { transferCase } from "../action";

import { formatDate } from "@/utils/datetime";
import Table from "@/components/Table";
import Swal from "sweetalert2";

interface CaseInfoProps {
  caseId: string;
  setCaseId: (id: string) => void;
}

interface ICase {
  id: string;
  title: string;
  patient: string;
  status: string;
}

interface IRecord extends Record<string, string> {
  id: string;
  detail: string;
  createdAt: string;
}

const CaseInfo = ({ caseId, setCaseId }: CaseInfoProps) => {
  const [medicalCase, setMedicalCase] = useState<ICase>();
  const [doctors, setDoctors] = useState<{ value: string; label: string }[]>(
    []
  );
  const [doctorId, setDoctorId] = useState<string>("");
  const [records, setRecords] = useState<IRecord[]>([]);

  const [data, action, isPending] = useActionState(transferCase, undefined);

  const recordColumns = [
    { key: "id", title: "Record ID" },
    { key: "detail", title: "Detail" },
    { key: "createdAt", title: "Created At" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/cases/${caseId}`);
      const { cases } = await res.json();

      setMedicalCase({
        id: cases.id,
        title: cases.title,
        patient: `${cases.patient_info.first_name} ${cases.patient_info.last_name}`,
        status: cases.status,
      });

      setDoctorId(cases.doctor_id);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/doctors");
      const { doctors } = await res.json();

      setDoctors(
        doctors.map((d: Record<string, string>) => ({
          value: d.id,
          label: `${d.first_name} ${d.last_name}`,
        }))
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/records/${caseId}`);
      const { records } = await res.json();

      setRecords(
        records.map((r: Record<string, string>) => ({
          id: r.id.substring(0, 8),
          detail: r.detail,
          createdAt: formatDate(new Date(r.created_at)),
        }))
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isPending && data && data.ok) {
      Swal.fire({
        title: "Success!",
        text: "The case has been transferred",
        icon: "success",
        willClose: () => location.reload(),
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <FaArrowLeftLong
          size="2em"
          className="cursor-pointer hover:text-[#709FEB] transition-all duration-150"
          onClick={() => setCaseId("")}
        />
        <h1 className="josefin-sans text-3xl font-medium">
          Case: {caseId.substring(0, 8)}
        </h1>
      </div>

      {medicalCase && (
        <>
          <div className="flex mb-16">
            <div className="grid grid-cols-2 w-1/2 gap-y-4 py-4">
              <h3 className="josefin-sans text-xl">Case name:</h3>
              <h3 className="josefin-sans text-xl font-medium">
                {medicalCase.title}
              </h3>

              <h3 className="josefin-sans text-xl">Patient:</h3>
              <h3 className="josefin-sans text-xl font-medium">
                {medicalCase.patient}
              </h3>

              <h3 className="josefin-sans text-xl">Status:</h3>
              <h3 className="josefin-sans text-xl font-medium">
                {medicalCase.status}
              </h3>
            </div>

            <div className="border-l-[1.5px] border-[#A0A0A0] items-stretch w-0 mr-8" />

            <form action={action}>
              <div className="flex flex-col gap-y-4 py-4 items-center">
                <h2 className="josefin-sans text-2xl font-medium">
                  Transfer the case
                </h2>

                <Select
                  options={doctors.filter((d) => d.value !== doctorId)}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  className="w-96"
                  name="doctor_id"
                />

                <span className="josefin-sans text-red-500 text-center">
                  {data?.error} &nbsp;
                </span>

                <div>
                  <Button
                    title="Transfer"
                    disabled={isPending}
                    type={isPending ? "button" : "submit"}
                  />
                </div>

                <input type="hidden" name="case_id" value={caseId} />
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="josefin-sans text-2xl font-medium">
              Medical records for this case
            </h2>

            <Table title="" columns={recordColumns} data={records} />
          </div>
        </>
      )}
    </>
  );
};

export default CaseInfo;
