"use client";

import { Button, Table } from "antd";
import { PlusCircle } from "lucide-react";
import { add, remove } from "./actions";
import dayjs from "dayjs";
import type { Registrations } from "@/db/schema";

export const dynamic = "force-dynamic";

export default function RegistrationsTable({
  data,
}: {
  data: (typeof Registrations.$inferSelect)[];
}) {
  return (
    <Table
      dataSource={data}
      rowKey={(x) => x.id}
      className="wrapper py-10"
      title={() => <Button icon={<PlusCircle />} onClick={() => add()} />}
      scroll={{ x: "max-content" }}
      columns={[
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        { title: "How to know", dataIndex: "howToKnow" },
        { title: "Mobile", dataIndex: "mobile" },
        { title: "Country", dataIndex: "country" },
        { title: "City", dataIndex: "city" },
        { title: "Affiliation", dataIndex: "affiliation" },
        { title: "Clothing size", dataIndex: "clothingSize" },
        { title: "Role", dataIndex: "role" },
        { title: "Participation type", dataIndex: "participationType" },
        { title: "Motivation letter", dataIndex: "motivationLetter" },
        { title: "Research interests", dataIndex: "researchInterests" },
        { title: "Tentative title", dataIndex: "tentativeTitle" },
        { title: "Resume", dataIndex: "resume" },
        { title: "Science profile", dataIndex: "scienceProfile" },
        { title: "Video", dataIndex: "video" },
        {
          title: "Registration date",
          dataIndex: "registrationDate",
          render: (x: Date) => dayjs(x).format("DD.MM.YYYY HH:mm:ss"),
        },
        {
          title: "Actions",
          render: (x: typeof Registrations.$inferSelect) => (
            <Button danger onClick={() => remove(x.id)}>
              Remove
            </Button>
          ),
        },
      ]}
    />
  );
}
