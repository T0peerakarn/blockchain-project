import { useActionState, useEffect, useState } from "react";

import Select from "react-select";
import TextInput from "@/components/TextInput";
import { createCase } from "../action";
import Button from "@/components/Button";
import Swal from "sweetalert2";

const CreateCase = () => {
  const [patients, setPatients] = useState<{ label: string; value: string }[]>(
    []
  );

  const [data, action, isPending] = useActionState(createCase, undefined);

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
      <h2 className="josefin-sans text-xl mb-4 text-[#585858]">Create Case</h2>

      <form action={action} className="flex flex-col gap-4 w-1/2">
        <div className="flex items-center gap-4">
          <h3 className="josefin-sans text-l text-[#585858] whitespace-nowrap">
            Patient:
          </h3>
          <Select
            options={patients}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            className="w-full"
            name="patient_id"
          />
        </div>

        <div className="flex items-center gap-4">
          <h3 className="josefin-sans text-l text-[#585858] whitespace-nowrap">
            Case name:
          </h3>
          <TextInput label="" name="title" />
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

export default CreateCase;
