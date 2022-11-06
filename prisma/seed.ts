import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const advertisements = [
  {
    type: "Maison",
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdXNlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    price: 459000,
    localization: "Bordeaux",
    details: {
      surface: 76,
      rooms: 3,
      bedrooms: 2,
    },
    description:
      "Un air de campagne au coeur de la ville... Au pied des commerces et des transports en commun, venez découvrir cette charmante maison d''environ 76m2 de plain-pied rénovée avec goût, sans travaux à prévoir. Au coeur de son joli jardin arboré, cette maison dispose d'une belle pièce de vie exposée SUD, semi ouverte sur une grande cuisine équipée avec des fournitures de qualité. Côté nuit vous profitez de deux chambre de bonne taille avec placards intégrés, d'un WC indépendant et d'une salle d'eau lumineuse.",
    categories: [
      { name: "Extérieur", value: "Balcon" },
      { name: "Cuisine", value: "Cuisine séparée" },
      { name: "Cadre & situation", value: "Exposition Nord" },
      { name: "Hygiène", value: "Salle de bain (Baignoire)" },
    ],
    energyDPE: "C",
    energyGES: "E",
  },
  {
    type: "Appartement",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: 305000,
    localization: "Bordeaux",
    details: {
      surface: 88,
      rooms: 5,
      bedrooms: 3,
    },
    description:
      "BORDEAUX CAUDERAN / LES ORANGERS A 5 minutes seulement du Parc Bordelais et à proximité immédiate des commerces, écoles et transports en commun, venez découvrir ce charmant appartement T5 de 88 m2 , situé dans une petite copropriété au parc arboré. Entièrement rénové avec goût en 2022, vous serez séduit par son séjour double très lumineux, sa cuisine indépendante aménagée ainsi que ses 3 chambres, sa salle d'eau et son WC indépendant.",
    categories: [
      { name: "Extérieur", value: "Balcon" },
      { name: "Cuisine", value: "Cuisine séparée" },
      { name: "Cadre & situation", value: "Exposition Sud" },
      { name: "Hygiène", value: "Salle de bain (Douche)" },
    ],
    energyDPE: "DPE vierge",
    energyGES: null,
  },
  {
    type: "Maison",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzh8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: 404700,
    localization: "Mérignac",
    details: {
      surface: 88,
      rooms: 4,
      bedrooms: 3,
    },
    description:
      "MERIGNAC CAPEYRON Proximité toutes commodités (commerces, supermarché, écoles bus...etc.). Nous vous proposons à la vente cette maison de plain pied à rafraichir. Maison des années 60, elle se compose d'une entrée, un grand salon avec cheminée, une belle salle à manger donnant sur un jardin paysagé d'environ 500m2, un dégagement dessert trois chambres, une salle de bain",
    categories: [
      { name: "Extérieur", value: "Terrasse" },
      { name: "Extérieur", value: "Garage" },
      { name: "Cuisine", value: "Cuisine équipée" },
      { name: "Cadre & situation", value: "Exposition Sud" },
      { name: "Autres", value: "Construction en briques" },
    ],
    energyDPE: "E",
    energyGES: "G",
  },
  {
    type: "Appartement",
    image:
      "https://images.unsplash.com/photo-1539922631499-09155cc609a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGFwYXJ0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    price: 524000,
    localization: "Bordeaux",
    details: {
      surface: 100,
      rooms: 4,
      bedrooms: 3,
    },
    description:
      "BORDEAUX CHARTRONS Proche quais Appartement en parfait état, composé d'un séjour avec cuisine ouverte et terrasse, trois chambres, une salle de bain, une salle d'eau ainsi que deux WC. Le bien dispose d'une place de parking et le tout à deux pas des quais et des trams",
    categories: [
      { name: "Extérieur", value: "Terrasse" },
      { name: "Extérieur", value: "Place de parking" },
      { name: "Cuisine", value: "Cuisine équipée" },
      { name: "Cadre & situation", value: null },
      { name: "Autres", value: "Situé au 4ème étage" },
    ],
    energyDPE: "B",
    energyGES: "C",
  },
];

const prisma = new PrismaClient();

async function seed() {
  const email = "athena@remix.run";
  const id = "athena.divine";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("athenavousaime", 10);

  await prisma.user.create({
    data: {
      email,
      id,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await Promise.all(
    advertisements.map((advertisement) =>
      prisma.advertisement.create({
        data: {
          type: advertisement.type,
          image: advertisement.image,
          price: advertisement.price,
          localization: advertisement.localization,
          surface: advertisement.details.surface,
          rooms: advertisement.details.rooms,
          bedrooms: advertisement.details.bedrooms,
          description: advertisement.description,
          categories: { create: advertisement.categories },
          energyDPE: advertisement.energyDPE,
          energyGES: advertisement.energyGES,
        },
      })
    )
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
