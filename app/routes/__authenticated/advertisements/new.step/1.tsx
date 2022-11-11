import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import type { WizardSession } from "~/sessions/wizard-session.server";
import { getMaybeWizardSession } from "~/sessions/wizard-session.server";
import { commitWizardSession } from "~/sessions/wizard-session.server";

import type { OnboardingWizardHandle } from "../new.step";

export const handle: OnboardingWizardHandle = {
  title: "Informations générales",
  stepNumber: 1,
  submitButton: (
    <button
      type="submit"
      form="step-1"
      className="rounded bg-violet-500 py-2 px-4 text-white active:bg-violet-600"
    >
      Suivant
    </button>
  ),
};

export function meta() {
  return {
    title: `Etape ${handle.stepNumber} | ${handle.title}}`,
  };
}

export async function loader({ request }: LoaderArgs) {
  const onboardingWizardSession = await getMaybeWizardSession<WizardSession>(
    request
  );

  return json(onboardingWizardSession);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const type = formData.get("type") as string;
  const price = Number(formData.get("price"));
  const image = formData.get("image") as string;
  const localization = formData.get("localization") as string;
  const surface = Number(formData.get("surface"));
  const rooms = Number(formData.get("rooms"));
  const bedrooms = Number(formData.get("bedrooms"));
  const description = formData.get("description") as string;
  const nextStep = formData.get("nextStep");

  const errors = {
    type: type ? null : "Type is required",
    price: price ? null : "Price is required",
    image: image ? null : "Image is required",
    localization: localization ? null : "Localization is required",
    surface: surface ? null : "Surface is required",
    rooms: rooms ? null : "Rooms is required",
    bedrooms: bedrooms ? null : "Bedrooms is required",
    description: description ? null : "Description is required",
  };
  const hasErrors = Object.values(errors).some(Boolean);
  if (hasErrors) {
    return json(errors);
  }
  return redirect(`advertisements/new/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, {
        type,
        image,
        price,
        localization,
        surface,
        rooms,
        bedrooms,
        description,
      }),
    },
  });
}

export default function WizardStep1Screen() {
  const data = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();
  return (
    <Form
      id="step-1"
      method="post"
      className="flex w-96 flex-col space-y-2 p-1"
    >
      <label className="block text-sm font-medium text-gray-700">
        Type
        <select
          name="type"
          defaultValue={data?.type}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        >
          <option value="Maison">Maison</option>
          <option value="Appartement">Appartement</option>
        </select>
        {errors?.type ? <em className=" text-red-600">{errors.type}</em> : null}
      </label>

      <label className="block text-sm font-medium text-gray-700">
        Image
        <input
          type="text"
          name="image"
          defaultValue={data?.image}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
        {errors?.image ? (
          <em className=" text-red-600">{errors.image}</em>
        ) : null}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Prix
        <input
          type="number"
          name="price"
          defaultValue={data?.price}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
        {errors?.price ? (
          <em className=" text-red-600">{errors.price}</em>
        ) : null}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Localisation
        <input
          type="text"
          name="localization"
          defaultValue={data?.localization}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
        {errors?.localization ? (
          <em className=" text-red-600">{errors.localization}</em>
        ) : null}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Surface
        <input
          type="number"
          name="surface"
          defaultValue={data?.surface}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
        {errors?.surface ? (
          <em className=" text-red-600">{errors.surface}</em>
        ) : null}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Pièces
        <input
          type="number"
          name="rooms"
          defaultValue={data?.rooms}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
        {errors?.rooms ? (
          <em className=" text-red-600">{errors.rooms}</em>
        ) : null}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Chambres
        <input
          type="number"
          name="bedrooms"
          defaultValue={data?.bedrooms}
          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
        {errors?.bedrooms ? (
          <em className=" text-red-600">{errors.bedrooms}</em>
        ) : null}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Description
        <textarea
          name="description"
          rows={3}
          defaultValue={data?.description}
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
        />
        {errors?.description ? (
          <em className=" text-red-600">{errors.description}</em>
        ) : null}
      </label>
      <input type="hidden" name="nextStep" value="2" />
    </Form>
  );
}
