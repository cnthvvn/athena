import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
  title: "Settings",
  description: "Settings",
});

export default function SettingsPage() {
  return (
    <h1 className="pb-6 text-2xl font-medium text-slate-900">Paramètres</h1>
  );
}
