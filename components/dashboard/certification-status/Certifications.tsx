import React from "react";

export type Certification = {
  id: number;
  name: string;
  issuedDate: string;
  status: string;
};

interface Props {
  setModalData: (data: Certification | null) => void;
}

const Certifications: React.FC<Props> = ({ setModalData }) => {
  const certifications = [
    {
      id: 1,
      name: "Certificate A",
      issuedDate: "2023-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Certificate B",
      issuedDate: "2021-06-10",
      status: "Expired",
    },
  ];

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-700">
        Your Certifications
      </h2>
      <ul className="mt-4 space-y-4">
        {certifications.map((cert) => (
          <li
            key={cert.id}
            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => setModalData(cert)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-800 font-medium">{cert.name}</p>
                <p className="text-gray-600 text-sm">
                  Issued: {cert.issuedDate}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  cert.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {cert.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certifications;
