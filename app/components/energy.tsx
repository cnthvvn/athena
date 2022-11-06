import { twMerge } from "tailwind-merge";

const optionsDPE = [
  {
    color: "bg-green-800",
    value: "A",
  },
  {
    color: "bg-green-700",
    value: "B",
  },
  {
    color: "bg-green-600",
    value: "C",
  },
  {
    color: "bg-yellow-500",
    value: "D",
  },
  {
    color: "bg-orange-400",
    value: "E",
  },
  {
    color: "bg-orange-500",
    value: "F",
  },
  {
    color: "bg-red-500",
    value: "G",
  },
];

const optionsGES = [
  {
    color: "bg-[#99d5f7]",
    value: "A",
  },
  {
    color: "bg-[#80abcd]",
    value: "B",
  },
  {
    color: "bg-[#6d87a8]",
    value: "C",
  },
  {
    color: "bg-[#546384]",
    value: "D",
  },
  {
    color: "bg-[#444665]",
    value: "E",
  },
  {
    color: "bg-[#332d47]",
    value: "F",
  },
  {
    color: "bg-[#241a2f]",
    value: "G",
  },
];

type EnergyType = "DPE" | "GES";

export function Energy({
  value,
  type,
}: {
  value: string | null;
  type: EnergyType;
}) {
  const options = type === "DPE" ? optionsDPE : optionsGES;
  return (
    <ul className="m-0 flex items-center space-x-1">
      {options.map((option) => (
        <li
          key={option.value}
          className={twMerge(
            `relative flex h-9 w-9 items-center justify-center rounded-lg ${option.color} text-lg text-white`,
            value === option.value ? "h-12" : ""
          )}
        >
          {option.value}
        </li>
      ))}
    </ul>
  );
}
