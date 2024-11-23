import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with predefined data...");

  // Création d'une famille
  const family = await prisma.family.create({
    data: {
      label: "Apiaceae", // Exemple : Famille pour carotte et coriandre
    },
  });

  // Création de genuses liés à la famille
  const genuses = await Promise.all([
    prisma.genus.create({
      data: {
        label: "Daucus", // Exemple pour la carotte
        familyId: family.id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Coriandrum", // Exemple pour la coriandre
        familyId: family.id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Solanum", // Exemple pour tomate et poivron
        familyId: family.id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Raphanus", // Exemple pour le radis
        familyId: family.id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Brassica", // Exemple pour chou romanesco
        familyId: family.id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Fragaria", // Exemple pour le fraisier
        familyId: family.id,
      },
    }),
  ]);

  // Création des catégories de plantes
  const plantCategories = await Promise.all([
    prisma.plantCategory.create({ data: { label: "Légumes" } }),
    prisma.plantCategory.create({ data: { label: "Fruits" } }),
    prisma.plantCategory.create({ data: { label: "Herbes aromatiques" } }),
  ]);

  // Création des plantes
  const plants = await Promise.all([
    prisma.plant.create({
      data: {
        taxonomicName: "Daucus carota", // Nom scientifique
        commonName: "Carotte",
        genusId: genuses[0].id, // Associé au genus "Daucus"
        plantCategoryId: plantCategories[0].id, // Catégorie "Légumes"
        coldHardiness: 5,
        soils: { set: ["LOAMY", "SANDY"] },
        lifeCycle: "BISANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "MODERATE",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Coriandrum sativum",
        commonName: "Coriandre",
        genusId: genuses[1].id, // Associé au genus "Coriandrum"
        plantCategoryId: plantCategories[2].id, // Catégorie "Herbes aromatiques"
        coldHardiness: 6,
        soils: { set: ["LOAMY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["PARTIAL_SHADE", "FULL_SUN"] },
        waterNeed: "MODERATE",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Solanum lycopersicum",
        commonName: "Tomate",
        genusId: genuses[2].id, // Associé au genus "Solanum"
        plantCategoryId: plantCategories[0].id, // Catégorie "Légumes"
        coldHardiness: 7,
        soils: { set: ["LOAMY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "HIGH",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Capsicum annuum",
        commonName: "Poivron",
        genusId: genuses[2].id, // Associé au genus "Solanum"
        plantCategoryId: plantCategories[0].id, // Catégorie "Légumes"
        coldHardiness: 8,
        soils: { set: ["LOAMY", "SANDY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "MODERATE",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Raphanus sativus",
        commonName: "Radis",
        genusId: genuses[3].id, // Associé au genus "Raphanus"
        plantCategoryId: plantCategories[0].id, // Catégorie "Légumes"
        coldHardiness: 5,
        soils: { set: ["SANDY", "LOAMY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "MODERATE",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Brassica oleracea",
        commonName: "Chou Romanesco",
        genusId: genuses[4].id, // Associé au genus "Brassica"
        plantCategoryId: plantCategories[0].id, // Catégorie "Légumes"
        coldHardiness: 6,
        soils: { set: ["LOAMY", "CLAY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["PARTIAL_SHADE", "FULL_SUN"] },
        waterNeed: "MODERATE",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Fragaria × ananassa",
        commonName: "Fraisier",
        genusId: genuses[5].id, // Associé au genus "Fragaria"
        plantCategoryId: plantCategories[1].id, // Catégorie "Fruits"
        coldHardiness: 4,
        soils: { set: ["HUMUS", "LOAMY"] },
        lifeCycle: "PERENNIAL",
        sunExposures: { set: ["PARTIAL_SHADE", "FULL_SUN"] },
        waterNeed: "HIGH",
        published: true,
      },
    }),
  ]);

  console.log(`Created ${plants.length} plants.`);
  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Error during seeding: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
