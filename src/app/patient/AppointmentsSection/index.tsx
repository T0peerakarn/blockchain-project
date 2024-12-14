import Table from "@/components/Table";
import { formatDateRange } from "@/utils/datetime";
import { useEffect, useState } from "react";
import AppointmentInfo from "./AppointmentInfo";

interface IAppointment extends Record<string, any> {
  id: string;
  shortId: string;
  name: string;
  datetime: string;
  isRecorded: boolean;
}

const AppointmentsSection = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [appointmentId, setAppointmentId] = useState<string>("");

  const appointmentColumns = [
    { key: "shortId", title: "Appointment ID" },
    { key: "name", title: "Appointment Name" },
    { key: "datetime", title: "Datetime" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/appointments");
      const { appointments } = await res.json();

      setAppointments(
        appointments.map((a: Record<string, any>) => ({
          id: a.id,
          shortId: a.id.substring(0, 8),
          name: `${a.cases.title}: ${a.detail}`,
          datetime: formatDateRange(
            new Date(a.start_datetime),
            new Date(a.end_datetime)
          ),
          isRecorded: a.medical_records.length > 0,
        }))
      );
    };

    fetchData();
  }, []);

  if (appointmentId !== "") {
    return (
      <AppointmentInfo
        appointmentId={appointmentId}
        setAppointmentId={(id: string) => setAppointmentId(id)}
      />
    );
  }

  return (
    <Table
      title="Today's Appointment Summary"
      columns={appointmentColumns}
      data={appointments.filter((a) => !a.isRecorded)}
      onClickRow={(row) => setAppointmentId(row.id)}
    />
  );
};

export default AppointmentsSection;
