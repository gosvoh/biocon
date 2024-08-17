"use client";

import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import {
  ArrowLeft,
  DownloadIcon,
  EditIcon,
  PlusCircleIcon,
} from "lucide-react";
import { add, remove, update } from "./actions";
import dayjs from "dayjs";
import type { Registrations } from "@/db/schema";
import Link from "next/link";
import { modalProps } from "@/components/ui/modal";

const EditForm = ({
  form,
  data,
}: {
  form: FormInstance;
  data?: typeof Registrations.$inferInsert;
}) => (
  <Form<typeof Registrations.$inferInsert>
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    initialValues={{ ...data, registrationDate: new Date() }}
  >
    <Form.Item<typeof Registrations.$inferInsert>
      name="name"
      label="Name"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="email"
      label="Email"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="howToKnow"
      label="How to know"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="mobile"
      label="Mobile"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="country"
      label="Country"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="city"
      label="City"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="affiliation"
      label="Affiliation"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="clothingSize"
      label="Clothing size"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="role"
      label="Role"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="participationType"
      label="Participation type"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="motivationLetter"
      label="Motivation letter"
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="researchInterests"
      label="Research interests"
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="tentativeTitle"
      label="Tentative title"
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert> name="resume" label="Resume">
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert>
      name="scienceProfile"
      label="Science profile"
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Registrations.$inferInsert> name="video" label="Video">
      <Input />
    </Form.Item>
  </Form>
);

export default function RegistrationsTable({
  data,
}: {
  data: (typeof Registrations.$inferSelect)[];
}) {
  const [form] = Form.useForm();
  const [modal, context] = Modal.useModal();

  return (
    <>
      {context}
      <Table
        dataSource={data}
        rowKey={(x) => x.id}
        className="wrapper py-10"
        title={() => (
          <Space>
            <Link href="/admin">
              <Button icon={<ArrowLeft />}>Back</Button>
            </Link>
            <Button
              icon={<PlusCircleIcon />}
              onClick={() =>
                modal.confirm({
                  ...modalProps,
                  content: <EditForm form={form} />,
                  title: "Add registration",
                  onOk: async () => {
                    try {
                      const values = await form.validateFields();
                      return add(values).then(() => form.resetFields());
                    } catch (e) {
                      return Promise.reject(e);
                    }
                  },
                })
              }
            />
            <Button
              icon={<DownloadIcon />}
              href="/admin/registrations/download"
            >
              Download
            </Button>
          </Space>
        )}
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: "Actions",
            render: (x: typeof Registrations.$inferSelect) => (
              <Popconfirm onConfirm={() => remove(x.id)} title="Are you sure?">
                <div className={"flex items-center"}>
                  <Button danger>Remove</Button>
                  <Button
                    icon={<EditIcon />}
                    onClick={() =>
                      modal.confirm({
                        ...modalProps,
                        content: <EditForm form={form} data={x} />,
                        title: "Edit registration",
                        onOk: async () => {
                          try {
                            const values = await form.validateFields();
                            return update(x.id, values).then(() =>
                              form.resetFields(),
                            );
                          } catch (e) {
                            return Promise.reject(e);
                          }
                        },
                      })
                    }
                  />
                </div>
              </Popconfirm>
            ),
          },
          {
            title: "Registration date",
            dataIndex: "registrationDate",
            render: (x: Date) => dayjs(x).format("DD.MM.YYYY HH:mm:ss"),
          },
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
        ]}
      />
    </>
  );
}
