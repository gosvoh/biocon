import { PrismaClient as BioconClient } from ".prisma/client/biocon";
// import { PrismaClient as WorldClient } from "@prisma/client/world";

export let biocon: BioconClient;
// export let world: WorldClient;

if (process.env.NODE_ENV === "production") biocon = new BioconClient();
else {
  if (!(global as any).biocon) (global as any).biocon = new BioconClient();
  biocon = (global as any).biocon;
}

// if (process.env.NODE_ENV === "production") world = new WorldClient();
// else {
//   if (!(global as any).world) (global as any).world = new WorldClient();
//   world = (global as any).world;
// }
