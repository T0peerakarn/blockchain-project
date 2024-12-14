import { useEffect, useState } from "react";

import Table from "@/components/Table";
import CaseInfo from "./CaseInfo";
import CreateCase from "./CreateCase";

interface ICase extends Record<string, string> {
  id: string;
  title: string;
  patient: string;
  status: string;
}

const CasesSection = () => {
  const [cases, setCases] = useState<ICase[]>([]);
  const [caseId, setCaseId] = useState<string>("");

  const caseColumns = [
    { key: "title", title: "Case Name" },
    { key: "patient", title: "Patient" },
    { key: "status", title: "Status" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/cases");
      const { cases } = await res.json();

      setCases(
        cases.map((c: Record<string, any>) => ({
          id: c.id,
          title: c.title,
          patient: `${c.patient_info.first_name} ${c.patient_info.last_name}`,
          status: c.status,
        }))
      );
    };

    fetchData();
  }, []);

  if (caseId !== "") {
    return (
      <CaseInfo caseId={caseId} setCaseId={(id: string) => setCaseId(id)} />
    );
  }

  return (
    <>
      <Table
        title="Your Cases"
        columns={caseColumns}
        data={cases}
        onClickRow={(id: string) => setCaseId(id)}
      />

      <div className="mb-8" />

      <CreateCase />
    </>
  );
};

export default CasesSection;
