import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { formatDateRange } from "@/utils/datetime";
import Button from "@/components/Button";
import { rescheduleAppointment, createRecord } from "../actions";
import Swal from "sweetalert2";

interface AppointmentInfoProps {
  appointmentId: string;
  setAppointmentId: (id: string) => void;
}

interface IAppointment {
  id: string;
  patient: string;
  detail: string;
  datetime: string;
}

const AppointmentInfo = ({
  appointmentId,
  setAppointmentId,
}: AppointmentInfoProps) => {
  const [appointment, setAppointment] = useState<IAppointment>();
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [record, setRecord] = useState<string>("");
  const [isRecorded, setIsRecorded] = useState<boolean>(false);

  const [doctorId, setDoctorId] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");

  const [dataReschedule, actionReschedule, isPendingReschedule] =
    useActionState(rescheduleAppointment, undefined);
  const [dataRecord, actionRecord, isPendingRecord] = useActionState(
    createRecord,
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/appointments/${appointmentId}`);
      const { appointments } = await res.json();

      setAppointment({
        id: appointments.id,
        patient: `${appointments.patient_info.first_name} ${appointments.patient_info.last_name}`,
        detail: appointments.detail,
        datetime: formatDateRange(
          new Date(appointments.start_datetime),
          new Date(appointments.end_datetime)
        ),
      });

      if (appointments.medical_records.length > 0) {
        setIsRecorded(true);
        setRecord(appointments.medical_records[0].detail);
      }

      setDoctorId(appointments.doctor_id);
      setPatientId(appointments.patient_id);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isPendingReschedule && dataReschedule && dataReschedule.ok) {
      Swal.fire({
        title: "Success!",
        text: "The appointment has been recorded",
        icon: "success",
        willClose: () => location.reload(),
      });
    }
  }, [dataReschedule]);

  useEffect(() => {
    if (!isPendingRecord && dataRecord && dataRecord.ok) {
      Swal.fire({
        title: "Success!",
        text: "The record has been submitted",
        icon: "success",
        willClose: () => location.reload(),
      });
    }
  }, [dataRecord]);

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
        <>
          <div className="flex mb-16">
            <div className="grid grid-cols-2 w-1/2 gap-y-4 py-4">
              <h3 className="josefin-sans text-xl">Name:</h3>
              <h3 className="josefin-sans text-xl font-medium">
                {appointment.patient}
              </h3>

              <h3 className="josefin-sans text-xl">Purpose of visit:</h3>
              <h3 className="josefin-sans text-xl font-medium">
                {appointment.detail}
              </h3>

              <h3 className="josefin-sans text-xl">Datetime:</h3>
              <h3 className="josefin-sans text-xl font-medium">
                {appointment.datetime}
              </h3>
            </div>

            <div className="border-l-[1.5px] border-[#A0A0A0] items-stretch w-0 mr-8" />

            <form action={actionReschedule}>
              <div className="flex flex-col gap-y-4 py-4 items-center">
                <h2 className="josefin-sans text-2xl font-medium">
                  Reschedule the appointment
                </h2>

                <div className="flex items-center gap-x-4">
                  <input
                    type="datetime-local"
                    className="text-center bg-[#F1F1F1] border-[1.5px] border-[#929292] rounded-lg p-2 gap-1 focus-within:bg-white focus-within:border-blue-500 transition-all duration-150"
                    value={start}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setStart(e.target.value)
                    }
                    name="start"
                    disabled={isRecorded}
                  />
                  <span>to</span>
                  <input
                    type="datetime-local"
                    className="text-center bg-[#F1F1F1] border-[1.5px] border-[#929292] rounded-lg p-2 gap-1 focus-within:bg-white focus-within:border-blue-500 transition-all duration-150"
                    value={end}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEnd(e.target.value)
                    }
                    name="end"
                    disabled={isRecorded}
                  />
                </div>

                <span className="josefin-sans text-red-500 text-center">
                  {dataReschedule?.error} &nbsp;
                </span>

                <div>
                  <Button
                    title="Reschedule"
                    disabled={isPendingReschedule || isRecorded}
                    type={
                      isPendingReschedule || isRecorded ? "button" : "submit"
                    }
                  />
                </div>

                <input type="hidden" name="id" value={appointmentId} />
              </div>
            </form>
          </div>

          <form action={actionRecord}>
            <div className="flex flex-col gap-4">
              <h2 className="josefin-sans text-2xl font-medium">
                Medical treatment record
              </h2>

              <textarea
                value={record}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setRecord(e.target.value)
                }
                className="w-full h-64 resize-none bg-[#F1F1F1] border-[1.5px] border-[#929292] rounded-lg p-2 gap-1 focus-within:bg-white focus-within:border-blue-500 transition-all duration-150"
                name="record"
                disabled={isRecorded}
              />

              <span className="josefin-sans text-red-500 text-center">
                {dataRecord?.error} &nbsp;
              </span>

              <div className="flex justify-center">
                <Button
                  title="Submit"
                  disabled={isPendingRecord || isRecorded}
                  type={isPendingRecord || isRecorded ? "button" : "submit"}
                />
              </div>

              <input type="hidden" name="doctor_id" value={doctorId} />
              <input type="hidden" name="patient_id" value={patientId} />
              <input
                type="hidden"
                name="appointment_id"
                value={appointmentId}
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AppointmentInfo;
