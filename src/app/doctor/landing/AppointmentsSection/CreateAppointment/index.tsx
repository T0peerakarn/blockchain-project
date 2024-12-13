import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TextInput from "@/components/TextInput";

import Select from "react-select";
import Button from "@/components/Button";

import { submitAppointment } from "../actions";

import Swal from "sweetalert2";

const CreateAppointment = () => {
  const [patientId, setPatientId] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const [patients, setPatients] = useState<{ value: string; label: string }[]>(
    []
  );

  const [data, action, isPending] = useActionState(
    submitAppointment,
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/patients");
      const { patients } = await res.json();

      setPatients(
        patients.map((p: Record<string, string>) => ({
          label: `${p.first_name} ${p.last_name}`,
          value: p.id,
        }))
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isPending && data && data.ok) {
      Swal.fire({
        title: "Success!",
        text: "The appointment has been recorded",
        icon: "success",
        willClose: () => location.reload(),
      });
    }
  }, [data]);

  return (
    <div>
      <h2 className="josefin-sans text-xl mb-4 text-[#585858]">
        Create Appointment
      </h2>

      <form action={action} className="flex flex-col gap-4 w-1/2">
        <div className="flex items-center gap-4">
          <h3 className="josefin-sans text-l text-[#585858]">Patient:</h3>
          <Select
            options={patients}
            onChange={(newValue) => setPatientId(newValue?.value as string)}
            className="w-full"
            name="patient_id"
          />
        </div>

        <div className="flex items-center gap-4">
          <h3 className="josefin-sans text-l text-[#585858] whitespace-nowrap">
            Purpose of visit:
          </h3>
          <TextInput
            label={""}
            value={purpose}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPurpose(e.target.value)
            }
            name="detail"
          />
        </div>

        <div className="flex items-center gap-4">
          <h3 className="josefin-sans text-l text-[#585858] whitespace-nowrap">
            Start:
          </h3>
          <input
            type="datetime-local"
            className="w-full text-center bg-[#F1F1F1] border-[1.5px] border-[#929292] rounded-lg p-2 gap-1 focus-within:bg-white focus-within:border-blue-500 transition-all duration-150"
            value={start}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStart(e.target.value)
            }
            name="start"
          />
        </div>

        <div className="flex items-center gap-4">
          <h3 className="josefin-sans text-l text-[#585858] whitespace-nowrap">
            End:
          </h3>
          <input
            type="datetime-local"
            className="w-full text-center bg-[#F1F1F1] border-[1.5px] border-[#929292] rounded-lg p-2 gap-1 focus-within:bg-white focus-within:border-blue-500 transition-all duration-150"
            value={end}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEnd(e.target.value)
            }
            name="end"
          />
        </div>

        {data?.error && (
          <span className="josefin-sans text-red-500 text-center">
            {" "}
            {data?.error}{" "}
          </span>
        )}

        <div className="flex w-full justify-center">
          <Button title="Submit" disabled={isPending} />
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
