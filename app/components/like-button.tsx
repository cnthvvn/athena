import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useFetcher } from "@remix-run/react";

export function LikeButton({
  isFavorite,
  id,
}: {
  isFavorite: boolean;
  id: string;
}) {
  const addFavoriteFetcher = useFetcher();
  const removeFavoriteFetcher = useFetcher();
  return (
    <>
      {isFavorite ? (
        <removeFavoriteFetcher.Form method="delete" action="/api/favorites">
          <button
            name="advertisementId"
            value={id}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-white"
          >
            <HeartSolid className="w-5 text-violet-700" />
          </button>
        </removeFavoriteFetcher.Form>
      ) : (
        <addFavoriteFetcher.Form method="post" action="/api/favorites">
          <button
            name="advertisementId"
            value={id}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-white"
          >
            <HeartIcon className="w-5 text-violet-700" />
          </button>
        </addFavoriteFetcher.Form>
      )}
    </>
  );
}
