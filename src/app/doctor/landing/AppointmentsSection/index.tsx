import { useEffect, useState } from "react";

import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import CreateAppointment from "./CreateAppointment";

import { formatDateRange } from "@/utils/datetime";

interface Appointment {
  id: string;
  patient: string;
  time: string;
  purpose: string;
}

const AppointmentsSection = () => {
  const [appointments, setAppointments] = useState<
    Record<string, keyof Appointment>[]
  >([]);

  const appointmentColumns = [
    { key: "patient", title: "Patient name" },
    { key: "time", title: "Appointment time" },
    { key: "purpose", title: "Purpose of visit" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/appointments");
      const { appointments } = await res.json();

      setAppointments(
        appointments
          .sort(
            (a: Record<string, any>, b: Record<string, any>) =>
              new Date(a.start_datetime).getTime() -
              new Date(b.start_datetime).getTime()
          )
          .map((a: Record<string, any>) => ({
            id: a.id,
            patient: `${a.patient_info.first_name} ${a.patient_info.last_name}`,
            time: formatDateRange(
              new Date(a.start_datetime),
              new Date(a.end_datetime)
            ),
            purpose: a.detail,
          }))
      );
    };

    fetchData();
  }, []);

  return (
    <>
      <Table
        title="Today's Appointment Summary"
        columns={appointmentColumns}
        data={appointments}
      />

      <div className="mb-8" />

      <CreateAppointment />
    </>
  );
};

export default AppointmentsSection;
