import { cloneElement } from "react";

import {
  BriefcaseIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, NavLink, useLoaderData, Form } from "@remix-run/react";
import { twMerge } from "tailwind-merge";

import { getFavoritesAdvertisement } from "~/models/advertisement.server";
import { requireUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  return json({ favorites: await getFavoritesAdvertisement(userId) });
}

export default function AuthenticatedLayout() {
  const { favorites } = useLoaderData<typeof loader>();
  const user = useOptionalUser();
  return (
    <div className="h-full">
      <div className="lg:fixed lg:flex lg:h-full lg:w-80 lg:flex-col lg:border-r-2 lg:border-zinc-100 lg:bg-white lg:pl-4 lg:pt-9 lg:pb-8">
        <div className="flex h-full flex-col">
          <nav>
            <ul className="space-y-6">
              <li>
                <NavLink to="/" className="mb-16 flex items-center space-x-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700">
                    <HomeIcon className="h-5 w-5 text-white" />
                  </span>
                  <span className="text-xl font-bold">Athena</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="advertisements"
                  className="group flex items-center"
                >
                  {({ isActive }) => (
                    <>
                      {cloneElement(<BriefcaseIcon />, {
                        className: twMerge(
                          "mr-3 h-5 w-5 shrink-0 stroke-2 text-slate-400 group-hover:text-indigo-700 lg:h-6 lg:w-6",
                          isActive
                            ? "text-indigo-700"
                            : " hover:text-indigo-700"
                        ),
                      })}
                      <span
                        className={twMerge(
                          "text-base font-medium text-slate-400 focus:outline-none group-hover:font-bold group-hover:text-slate-700",
                          isActive
                            ? "font-bold text-slate-800"
                            : " hover:font-bold "
                        )}
                      >
                        Annonces
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="favorites" className="group flex items-center">
                  {({ isActive }) => (
                    <>
                      {cloneElement(<Squares2X2Icon />, {
                        className: twMerge(
                          "mr-3 h-5 w-5 shrink-0 stroke-2 text-slate-400 group-hover:text-indigo-700 lg:h-6 lg:w-6",
                          isActive ? "text-indigo-700" : ""
                        ),
                      })}
                      <span
                        className={twMerge(
                          "text-base font-medium text-slate-400 focus:outline-none group-hover:font-bold group-hover:text-slate-700",
                          isActive
                            ? "font-bold text-slate-800"
                            : " hover:font-bold hover:text-slate-700"
                        )}
                      >
                        Mes favoris
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="settings" className="group flex items-center">
                  {({ isActive }) => (
                    <>
                      {cloneElement(<Cog6ToothIcon />, {
                        className: twMerge(
                          "mr-3 h-5 w-5 shrink-0 stroke-2 text-slate-400 group-hover:text-indigo-700 lg:h-6 lg:w-6",
                          isActive
                            ? "text-indigo-700"
                            : " hover:text-indigo-700 "
                        ),
                      })}
                      <span
                        className={twMerge(
                          "text-base font-medium text-slate-400 focus:outline-none group-hover:font-bold group-hover:text-slate-700",
                          isActive
                            ? "font-bold text-slate-800"
                            : "hover:font-bold hover:text-slate-700"
                        )}
                      >
                        Paramètres
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex h-full flex-col lg:bg-slate-50 lg:pl-80">
        <div className="flex h-14 w-screen items-center justify-between p-2 py-2 lg:relative lg:h-24 lg:w-auto lg:px-16 lg:py-6 ">
          <div className="flex items-center">
            <NavLink to="/favorites" className="relative">
              <HeartIcon className="mr-3 h-7 w-7 shrink-0 stroke-2 text-red-500" />
              {favorites.length ? (
                <span className="absolute bottom-2/3 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-300 text-xs text-white">
                  {favorites.length}
                </span>
              ) : null}
            </NavLink>
            <div className="ml-3 font-bold text-slate-900">
              Hi, {user?.email}
            </div>
          </div>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="py-2 px-4 text-violet-500 underline"
            >
              Se déconnecter
            </button>
          </Form>
        </div>
        <main className="flex h-full min-h-screen flex-col px-8 pt-20 lg:min-h-[calc(100vh_-_96px)] lg:overflow-hidden lg:px-16 lg:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
