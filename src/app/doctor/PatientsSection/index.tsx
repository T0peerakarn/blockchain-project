import { useEffect, useState } from "react";

import Select from "react-select";
import Table from "@/components/Table";

interface ICase extends Record<string, string> {
  id: string;
  title: string;
  status: string;
}

const PatientsSection = () => {
  const [patients, setPatients] = useState<{ value: string; label: string }[]>(
    []
  );
  const [patientId, setPatientId] = useState<string>("");
  const [cases, setCases] = useState<ICase[]>([]);

  const caseColumns = [
    { key: "id", title: "Case ID" },
    { key: "title", title: "Case Name" },
    { key: "status", title: "Status" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/patients");
      const { patients } = await res.json();

      setPatients(
        patients.map((p: Record<string, string>) => ({
          value: p.id,
          label: `${p.first_name} ${p.last_name}`,
        }))
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/patients/${patientId}`);
      const { cases } = await res.json();

      setCases(
        cases.map((c: Record<string, string>) => ({
          id: c.id.substring(0, 8),
          title: c.title,
          status: c.status,
        }))
      );
    };

    if (patientId !== "") {
      fetchData();
    }
  }, [patientId]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <Select
          options={patients}
          onChange={(newValue) => setPatientId(newValue!.value)}
        />

        <Table title="Patient's cases" columns={caseColumns} data={cases} />
      </div>
    </>
  );
};

export default PatientsSection;
