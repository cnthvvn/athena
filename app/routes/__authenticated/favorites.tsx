import {
  HomeIcon,
  PuzzlePieceIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { twMerge } from "tailwind-merge";

import { Criteria } from "~/components/criteria";
import { getFavoritesAdvertisement } from "~/models/advertisement.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => ({
  title: "Favorites",
  description: "Favorites",
});

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  return json({
    advertisements: await getFavoritesAdvertisement(userId),
  });
}

export default function FavoritesPage() {
  const { advertisements } = useLoaderData<typeof loader>();
  const location = useLocation();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="pb-6 text-2xl font-medium text-slate-900">
          Mes favoris
        </h1>
      </div>

      {advertisements.length > 0 ? (
        <div className="flex flex-wrap lg:flex-nowrap lg:overflow-y-auto ">
          <ul className="flex w-full flex-col space-y-3 pb-8 ">
            {advertisements.map(({ advertisement }) => {
              const to = `/favorites/${advertisement.id}`;
              return (
                <li
                  key={advertisement.id}
                  className={twMerge(
                    "relative flex flex-wrap justify-between space-x-2 rounded-lg border-2 border-slate-100 bg-white p-5  hover:border-2 hover:border-indigo-700",
                    location.pathname === to
                      ? "border-2 border-indigo-700"
                      : " "
                  )}
                >
                  <NavLink
                    className="flex flex-1 flex-wrap lg:gap-x-3"
                    to={to}
                    prefetch="render"
                  >
                    <div className="h-60 w-full lg:h-24 lg:w-24">
                      <img
                        src={advertisement.image}
                        alt=""
                        className="h-full w-full rounded"
                      />
                    </div>
                    <div className="flex flex-auto flex-col justify-between  space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-violet-700">
                            {new Intl.NumberFormat(undefined, {
                              maximumFractionDigits: 0,
                              style: "currency",
                              currency: "EUR",
                            }).format(Number(advertisement.price))}
                          </span>
                          <span className="text-xs text-slate-400">
                            {advertisement.localization}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center space-x-3 border-t border-slate-100 pt-3 lg:space-x-20">
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
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Outlet />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 pt-8">
          <p className="text-2xl font-bold text-slate-800">
            Vous n’avez pas encore d’annonce sauvegardée
          </p>
          <Link
            to="/"
            className="rounded-md bg-violet-700 px-4 py-2 font-medium text-white"
          >
            Aller aux annonces
          </Link>
        </div>
      )}
    </>
  );
}
