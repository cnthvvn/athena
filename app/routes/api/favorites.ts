import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { addToFavorite, removeToFavorite } from "~/models/advertisement.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const advertisementId = formData.get("advertisementId") as string;
  const userId = await requireUserId(request);
  if (!advertisementId) return json(null, 404);

  switch (request.method.toLowerCase()) {
    case "delete":
      await removeToFavorite(userId, advertisementId);
      break;
    case "post":
      await addToFavorite(userId, advertisementId);
      break;
    default:
      return json(
        {
          error: {
            message: `${request.method} is not supported`,
          },
          success: false,
        },
        405
      );
  }
  return json({ error: null, success: true });
}
