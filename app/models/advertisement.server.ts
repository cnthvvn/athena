import type { Advertisement as AdvertisementModel } from "@prisma/client";

import { prisma } from "~/db.server";

export type Advertisement = AdvertisementModel & { isFavorite?: boolean };

export async function getAdvertisements(userId: string) {
  const [advertisements, favoritesAdvertisements] = await Promise.all([
    prisma.advertisement.findMany({
      orderBy: { id: "asc" },
    }),
    prisma.favoritesAdvertisements.findMany({ where: { userId } }),
  ]);

  return advertisements.map((advertisement) => ({
    ...advertisement,
    isFavorite: favoritesAdvertisements.some(
      (favoritesAdvertisement) =>
        favoritesAdvertisement.advertisementId === advertisement.id
    ),
  }));
}

export function getFavoritesAdvertisement(userId: string) {
  return prisma.favoritesAdvertisements.findMany({
    where: { userId },
    include: {
      advertisement: true,
    },
  });
}

export async function getAdvertisementById(userId: string, id: string) {
  const [advertisement, favoritesAdvertisements] = await Promise.all([
    prisma.advertisement.findUnique({ where: { id } }),
    prisma.favoritesAdvertisements.findFirst({
      select: { id: true },
      where: { userId, advertisementId: id },
    }),
  ]);

  if (!advertisement)
    throw new Response("advertissment not found", { status: 404 });

  return { ...advertisement, isFavorite: Boolean(favoritesAdvertisements?.id) };
}

export function getFavoritesAdvertisementByIds(ids: string[]) {
  return prisma.advertisement.findMany({ where: { id: { in: ids } } });
}

export function getFavoriteId(userId: string, advertisementId: string) {
  return prisma.favoritesAdvertisements.findFirst({
    where: { userId, advertisementId },
  });
}

export function addToFavorite(userId: string, advertisementId: string) {
  return prisma.favoritesAdvertisements
    .create({
      data: {
        userId,
        advertisementId,
      },
    })
    .catch(() => getFavoriteId(userId, advertisementId));
}

export function removeToFavorite(userId: string, advertisementId: string) {
  return prisma.favoritesAdvertisements.deleteMany({
    where: { userId, advertisementId },
  });
}

export function createAdvertisement(advertisement: Advertisement) {
  return prisma.advertisement.create({ data: advertisement });
}

export function removeAdvertisement(id: string) {
  return prisma.advertisement.delete({
    where: { id },
  });
}
