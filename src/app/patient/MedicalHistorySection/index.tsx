import Table from "@/components/Table";
import { formatDate } from "@/utils/datetime";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IRecord extends Record<string, string> {
  id: string;
  purpose: string;
  comment: string;
  createdAt: string;
}

const MedicalHistory = () => {
  const [records, setRecords] = useState<IRecord[]>([]);

  const recordColumns = [
    { key: "purpose", title: "Purpose of visit" },
    { key: "createdAt", title: "Created at" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/records");
      const { records } = await res.json();

      setRecords(
        records.map((r: Record<string, any>) => ({
          id: r.id,
          purpose: `${r.cases.title}: ${r.appointments.detail}`,
          comment: r.detail,
          createdAt: formatDate(new Date(r.created_at)),
        }))
      );
    };

    fetchData();
  }, []);

  return (
    <Table
      title="Your Medical Records"
      columns={recordColumns}
      data={records}
      onClickRow={(row) =>
        Swal.fire({
          title: "Note from doctor",
          text: row.comment,
          icon: "info",
        })
      }
    />
  );
};

export default MedicalHistory;
