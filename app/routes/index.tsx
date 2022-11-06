import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { getUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/advertisements");
  return redirect("/login");
};

export default function Index() {
  return null;
}
