import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.rol_rol.createMany({
    data: [{ rol_name: "READ" }, { rol_name: "EDITOR" }, { rol_name: "ADMIN" }],
    skipDuplicates: true,
  });

  await prisma.stt_status_task.createMany({
    data: [
      { stt_name: "BACKLOG" },
      { stt_name: "TODO" },
      { stt_name: "IN_PROGRESS" },
      { stt_name: "BLOCKED" },
      { stt_name: "IN_REVIEW" },
      { stt_name: "DONE" },
    ],
    skipDuplicates: true,
  });

  await prisma.prt_priority_task.createMany({
    data: [
      { prt_name: "LOW" },
      { prt_name: "MEDIUM" },
      { prt_name: "HIGH" },
      { prt_name: "URGENT" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
