import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { createAdvertisement } from "~/models/advertisement.server";
import type { WizardSession } from "~/sessions/wizard-session.server";
import { destroyWizardSession } from "~/sessions/wizard-session.server";
import { getWizardSession } from "~/sessions/wizard-session.server";
import { assertReferer } from "~/utils/assert-referer.server";

import type { OnboardingWizardHandle } from "../new.step";

export const handle: OnboardingWizardHandle = {
  title: "Récapitulatif de votre annonce",
  stepNumber: 3,
  submitButton: (
    <button
      type="submit"
      form="step-3"
      className="rounded bg-violet-500 py-2 px-4 text-white active:bg-violet-600"
    >
      Créer mon annonce
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

  const onboardingWizardSession = await getWizardSession<WizardSession>(
    request
  );

  return json(onboardingWizardSession);
}

export async function action({ request }: ActionArgs) {
  const onboardingWizardSession = await getWizardSession<WizardSession>(
    request
  );
  await createAdvertisement(onboardingWizardSession);
  return destroyWizardSession(request);
}

export default function WizardStep3Screen() {
  const data = useLoaderData<typeof loader>();
  return (
    <Form
      id="step-3"
      method="post"
      className="flex w-96 flex-col space-y-2 p-1"
    >
      <label className="block text-sm font-medium text-gray-700">
        Type
        <select
          disabled
          name="type"
          defaultValue={data?.type}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        >
          <option value="Maison">Maison</option>
          <option value="Appartement">Appartement</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-gray-700">
        Image
        <input
          type="text"
          name="image"
          readOnly
          defaultValue={data?.image}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Prix
        <input
          type="number"
          name="price"
          readOnly
          defaultValue={data?.price}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Localisation
        <input
          type="text"
          name="localization"
          readOnly
          defaultValue={data?.localization}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Surface
        <input
          type="number"
          name="surface"
          readOnly
          defaultValue={data?.surface}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Pièces
        <input
          type="number"
          name="rooms"
          readOnly
          defaultValue={data?.rooms}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Chambres
        <input
          type="number"
          name="bedrooms"
          readOnly
          defaultValue={data?.bedrooms}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Description
        <textarea
          name="description"
          rows={3}
          readOnly
          defaultValue={data?.description}
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Consommation énergétique
        <select
          name="energyDPE"
          disabled
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
          disabled
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
    </Form>
  );
}
