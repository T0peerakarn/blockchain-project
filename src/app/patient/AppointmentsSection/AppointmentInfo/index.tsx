import { formatDateRange } from "@/utils/datetime";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

interface AppointmentInfoProps {
  appointmentId: string;
  setAppointmentId: (id: string) => void;
}

interface IAppointment {
  id: string;
  doctor: string;
  detail: string;
  datetime: string;
}

const AppointmentInfo = ({
  appointmentId,
  setAppointmentId,
}: AppointmentInfoProps) => {
  const [appointment, setAppointment] = useState<IAppointment>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/appointments/${appointmentId}`);
      const { appointments } = await res.json();

      setAppointment({
        id: appointments.id,
        doctor: `${appointments.doctor_info.first_name} ${appointments.doctor_info.last_name}`,
        detail: `${appointments.cases.title}: ${appointments.detail}`,
        datetime: formatDateRange(
          new Date(appointments.start_datetime),
          new Date(appointments.end_datetime)
        ),
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <FaArrowLeftLong
          size="2em"
          className="cursor-pointer hover:text-[#709FEB] transition-all duration-150"
          onClick={() => setAppointmentId("")}
        />
        <h1 className="josefin-sans text-3xl font-medium">
          Appointment: {appointmentId.substring(0, 8)}
        </h1>
      </div>

      {appointment && (
        <div className="flex mb-16">
          <div className="grid grid-cols-2 w-2/3 gap-y-4 py-4">
            <h3 className="josefin-sans text-xl">Appointment Name:</h3>
            <h3 className="josefin-sans text-xl font-medium">
              {appointment.detail}
            </h3>

            <h3 className="josefin-sans text-xl">Doctor:</h3>
            <h3 className="josefin-sans text-xl font-medium">
              {appointment.doctor}
            </h3>

            <h3 className="josefin-sans text-xl">Datetime:</h3>
            <h3 className="josefin-sans text-xl font-medium">
              {appointment.datetime}
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentInfo;
