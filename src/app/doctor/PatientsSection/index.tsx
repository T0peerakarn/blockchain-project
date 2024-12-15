import {useEffect, useState} from "react";
import {ethers} from "ethers";

import Select from "react-select";
import Table from "@/components/Table";

interface ICase extends Record<string, string> {
  id: string;
  title: string;
  status: string;
}

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
}

const uuidToHex = (uuid) => {
  const hex = uuid.replace(/-/g, ''); // Remove dashes from the UUID
  return '0x' + hex.slice(0, 32);
};

const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // Hardhat testnet on localhost
const abi = [
  {
    "inputs": [],
    "name": "getNumberOfInteractions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes16",
        "name": "patientId",
        "type": "bytes16"
      },
      {
        "internalType": "bytes16",
        "name": "doctorId",
        "type": "bytes16"
      },
      {
        "internalType": "string",
        "name": "action",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timestamp",
        "type": "string"
      }
    ],
    "name": "logInteraction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "interactionId",
        "type": "uint256"
      }
    ],
    "name": "getInteractionById",
    "outputs": [
      {
        "internalType": "struct PatientDataInteraction.InteractionRecord",
        "name": "",
        "type": "tuple",
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "bytes16",
            "name": "doctorId",
            "type": "bytes16"
          },
          {
            "internalType": "bytes16",
            "name": "patientId",
            "type": "bytes16"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "timestamp",
            "type": "string"
          }
        ]
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "interactionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes16",
        "name": "patientId",
        "type": "bytes16"
      },
      {
        "indexed": true,
        "internalType": "bytes16",
        "name": "doctorId",
        "type": "bytes16"
      },
      {
        "internalType": "string",
        "name": "action",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timestamp",
        "type": "string"
      }
    ],
    "name": "InteractionLogged",
    "type": "event"
  }
];

async function connectToProvider() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });  // Request user accounts
    return provider;
  } else {
    alert('Please install MetaMask to interact with this app.');
  }
}

async function getContract() {
  const provider = await connectToProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
}

async function logInteraction(patientId, doctorId, action, timestamp) {
  const contract = await getContract();

  try {

    // Listen for the emitted event and log it
    contract.on("InteractionLogged", (interactionId, emittedPatientId, emittedDoctorId, emittedAction, emittedTimestamp) => {
      console.log("InteractionLogged event received:");
      console.log("Interaction ID:", interactionId.toString());
      console.log("Patient ID:", emittedPatientId);
      console.log("Doctor ID:", emittedDoctorId);
      console.log("Action:", emittedAction);
      console.log("Timestamp:", emittedTimestamp);
    });


    const tx = await contract.logInteraction(patientId, doctorId, action, timestamp);
    console.log("Transaction sent:", tx);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Interaction logged successfully!");
  } catch (err) {
    console.error("Error logging interaction:", err);
  }
}

async function fetchNumberOfInteractions() {
  const contract = await getContract();
  const interactionCount = await contract.getNumberOfInteractions();
  console.log("Number of Interactions: ", interactionCount.toString());
  return interactionCount;
}

const PatientsSection = () => {
  const [patients, setPatients] = useState<{ value: string; label: string }[]>(
    []
  );
  const [patientId, setPatientId] = useState<string>("");
  const [cases, setCases] = useState<ICase[]>([]);
  const [user, setUser] = useState<IUser>();

  const caseColumns = [
    { key: "id", title: "Case ID" },
    { key: "title", title: "Case Name" },
    { key: "status", title: "Status" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/personal-info");
      const { user } = await res.json();

      setUser(user);
    };

    fetchData();
  }, []);

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

      await handleLogInteraction(uuidToHex(patientId), uuidToHex(user.id));

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

  const handleLogInteraction = async (patientId, doctorId) => {
    const action = "read";
    const timestamp = new Date().toISOString();

    await logInteraction(patientId, doctorId, action, timestamp);
    await fetchNumberOfInteractions();  // Refresh the interaction count
  };
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
