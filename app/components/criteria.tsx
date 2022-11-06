import { cloneElement } from "react";

import { twMerge } from "tailwind-merge";

type ElementWithClassName = React.ReactElement<{ className?: string }>;

export function Criteria({
  icon,
  label,
  value,
}: {
  icon: ElementWithClassName;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex space-x-2">
      <div className="flex items-center">
        {icon
          ? cloneElement(icon, {
              className: twMerge(
                "mr-1",
                "h-4 w-4 shrink-0 text-slate-400",
                "stroke-2"
              ),
            })
          : null}
        <span className="text-xs font-medium text-slate-400">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-700">{value}</span>
    </div>
  );
}
