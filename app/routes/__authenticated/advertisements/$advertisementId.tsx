import { useCallback } from "react";

import {
  HomeIcon,
  MoonIcon,
  PuzzlePieceIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";

import { Criteria } from "~/components/criteria";
import { Energy } from "~/components/energy";
import { LikeButton } from "~/components/like-button";
import { Modal, ModalContent, ModalHeader } from "~/components/modal";
import {
  getAdvertisementById,
  removeAdvertisement,
} from "~/models/advertisement.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  if (!params.advertisementId) throw new Response(null, { status: 400 });
  if (params.advertisementId === "clau2warl00041dytg4zoa0d1") {
    throw json({ error: { message: "oh non" } }, 500);
  }
  const advertisement = await getAdvertisementById(
    userId,
    params.advertisementId
  );
  return json({ advertisement });
}

export async function action({ params }: ActionArgs) {
  const { advertisementId } = params;
  await removeAdvertisement(advertisementId as string);
  return redirect("/advertisements");
}

export default function AdvertisementPage() {
  const { advertisement } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <Modal>
      <ModalHeader
        img={advertisement.image}
        closeButton={
          <div className="flex items-center justify-center space-x-3">
            <LikeButton
              isFavorite={advertisement.isFavorite}
              id={advertisement.id}
            />
            <Form method="post">
              <button
                type="submit"
                title="Delete advertisement"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100"
              >
                <TrashIcon className="w-5 text-slate-700" />
              </button>
            </Form>
            <button
              onClick={goBack}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100"
            >
              <XMarkIcon className="w-5 text-slate-700" />
            </button>
          </div>
        }
      />
      <ModalContent>
        <div className="mb-5 flex items-start justify-between border-b border-slate-200 pb-5">
          <div className="flex flex-col">
            <div className="text-lg font-bold text-slate-800">
              {advertisement.type}
            </div>
            <div className="text-xs text-slate-400">
              {advertisement.localization}
            </div>
          </div>
          <p className="text-lg font-bold text-violet-500">
            {new Intl.NumberFormat(undefined, {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "EUR",
            }).format(Number(advertisement.price))}
          </p>
        </div>
        <div className="flex flex-col space-y-8 pb-8">
          <div className="flex flex-col space-y-3">
            <p className="text-base font-bold text-slate-700">Description</p>
            <p className="text-sm leading-6 text-slate-500">
              {advertisement.description}
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-base font-bold text-slate-700">L'essentiel</p>
            <div className="flex flex-wrap items-center space-x-3 lg:space-x-20">
              <Criteria
                icon={<HomeIcon />}
                label="Surface"
                value={`${advertisement.surface} m2`}
              />
              <Criteria
                icon={<PuzzlePieceIcon />}
                label="Pièces"
                value={advertisement.rooms}
              />
              <Criteria
                icon={<MoonIcon />}
                label="Chambres"
                value={advertisement.bedrooms}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-base font-bold text-slate-700">
              Bilan énergétique
            </p>
            <div className="flex flex-wrap items-start space-x-10">
              <div className="flex flex-col flex-wrap justify-start space-y-3 ">
                <p className="text-sm font-medium text-slate-500">
                  Consommation énergétique
                </p>
                {advertisement.energyDPE !== "DPE vierge" ? (
                  <ul className="m-0 flex items-center space-x-1">
                    <Energy value={advertisement.energyDPE} type="DPE" />
                  </ul>
                ) : (
                  <p>{advertisement.energyDPE}</p>
                )}
              </div>
              <div className="flex flex-col flex-wrap justify-start space-y-3 ">
                <p className="text-sm font-medium text-slate-500">
                  Emission de gaz
                </p>
                {advertisement.energyGES ? (
                  <ul className="m-0 flex items-center space-x-1">
                    <Energy value={advertisement.energyGES} type="GES" />
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

export const CatchBoundary = () => {
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);
  return (
    <Modal>
      <ModalHeader
        img="https://res.cloudinary.com/dabwjor9a/image/upload/v1666471855/pasteque-erreur_ziml7y.jpg"
        closeButton={
          <button
            onClick={goBack}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100"
          >
            <XMarkIcon className="w-5 text-slate-700" />
          </button>
        }
      />
      <ModalContent>
        <div className="text-2xl text-red-500">
          Oh non ! Une erreur est survenue ... ou pas <br />
          c'était juste pour vous montrez mon sublime chat
        </div>
      </ModalContent>
    </Modal>
  );
};
