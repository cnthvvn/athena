import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import type { WizardSession } from "~/sessions/wizard-session.server";
import {
  commitWizardSession,
  getMaybeWizardSession,
} from "~/sessions/wizard-session.server";
import { assertReferer } from "~/utils/assert-referer.server";

import type { OnboardingWizardHandle } from "../new.step";

export const handle: OnboardingWizardHandle = {
  title: "Définir les critères énergétiques",
  stepNumber: 2,
  submitButton: (
    <button
      type="submit"
      form="step-2"
      className="rounded bg-violet-500 py-2 px-4 text-white active:bg-violet-600"
    >
      Voir le récap
    </button>
  ),
};

export function meta() {
  return {
    title: `Etape ${handle.stepNumber} | ${handle.title}}`,
  };
}

export async function loader({ request }: LoaderArgs) {
  assertReferer(request, { redirectTo: "/advertisements/new" });

  const onboardingWizardSession = await getMaybeWizardSession<WizardSession>(
    request
  );
  return json(onboardingWizardSession);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const { energyDPE, energyGES, nextStep } = Object.fromEntries(
    formData
  ) as unknown as Pick<WizardSession, "energyDPE" | "energyGES"> & {
    nextStep: string;
  };

  return redirect(`advertisements/new/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, {
        energyDPE,
        energyGES,
      }),
    },
  });
}

export default function WizardStep2Screen() {
  const data = useLoaderData<typeof loader>();

  return (
    <Form id="step-2" method="post" className="flex flex-col space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Consommation énergétique
        <select
          name="energyDPE"
          defaultValue={data?.energyDPE || ""}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Emission de gaz
        <select
          name="energyGES"
          defaultValue={data?.energyGES || ""}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>
      </label>
      <input type="hidden" name="nextStep" value="3" />
    </Form>
  );
}
