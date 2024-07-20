import { biocon } from "@/db/db";
import { Registrations } from "@/db/schema";
import XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await biocon.select().from(Registrations);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.ms-excel",
      "Content-Disposition": "attachment; filename=registrations.xlsx",
    },
  });
}
