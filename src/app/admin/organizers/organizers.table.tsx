"use client";

import type { Organizers } from "@/db/schema";
import {
  Button,
  Form,
  FormInstance,
  Image,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Upload,
} from "antd";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  EditIcon,
  PlusCircleIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { add, remove, update } from "./actions";
import Link from "next/link";
import { useMemo } from "react";

const EditForm = ({
  form,
  data,
}: {
  form: FormInstance;
  data?: typeof Organizers.$inferInsert;
}) => (
  <Form<typeof Organizers.$inferInsert>
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    initialValues={{
      ...data,
      image: undefined,
    }}
  >
    <Form.Item<typeof Organizers.$inferInsert>
      name="name"
      label="Name"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Organizers.$inferInsert>
      name="email"
      label="Email"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Organizers.$inferInsert>
      name="position"
      label="Position"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Organizers.$inferInsert>
      name="image"
      label="Image"
      rules={[{ required: !data }]}
      valuePropName="fileList"
      getValueFromEvent={(e) => e.fileList}
    >
      <Upload
        listType="picture"
        beforeUpload={() => false}
        maxCount={1}
        accept="image/*"
      >
        <Button icon={<UploadIcon />}>Upload</Button>
      </Upload>
    </Form.Item>
  </Form>
);

export default function OrganizersTable({
  data,
}: {
  data: (typeof Organizers.$inferSelect)[];
}) {
  const [modal, context] = Modal.useModal();
  const [form] = Form.useForm<typeof Organizers.$inferInsert>();
  const [minOrder, maxOrder] = useMemo(() => {
    const order = data.map((x) => x.order);
    return [Math.min(...order), Math.max(...order)];
  }, [data]);

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
              onClick={() => {
                modal.confirm({
                  title: "Add organizer",
                  closable: true,
                  maskClosable: true,
                  width: 800,
                  centered: true,
                  okButtonProps: { style: { boxShadow: "none" } },
                  icon: null,
                  onOk: async () => {
                    try {
                      const val: typeof Organizers.$inferInsert & {
                        image: any;
                      } = await form.validateFields();

                      const formData = new FormData();

                      Object.entries(val).forEach(([key, value]) => {
                        if (!value) return;
                        if (key === "image")
                          formData.append(key, value[0].originFileObj);
                        else formData.append(key, value);
                      });

                      return await add(formData).then(() => form.resetFields());
                    } catch (e) {
                      return Promise.reject(e);
                    }
                  },
                  content: <EditForm form={form} />,
                });
              }}
            />
          </Space>
        )}
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: "Order",
            dataIndex: "order",
            sorter: (a, b) => a.order - b.order,
            sortOrder: "ascend",
            showSorterTooltip: false,
            sortIcon: () => null,
            hidden: true,
          },
          {
            title: "Actions",
            width: 200,
            render: (_, x: typeof Organizers.$inferSelect) => (
              <Space>
                <Popconfirm
                  onConfirm={() => remove(x.id)}
                  title="Are you sure?"
                >
                  <Button danger icon={<Trash2Icon />} />
                </Popconfirm>
                <Button
                  type="primary"
                  icon={<EditIcon />}
                  onClick={() =>
                    modal.confirm({
                      title: "Edit organizer",
                      closable: true,
                      maskClosable: true,
                      width: 800,
                      centered: true,
                      icon: null,
                      okButtonProps: { style: { boxShadow: "none" } },
                      content: <EditForm form={form} data={x} />,
                      onOk: async (_) => {
                        try {
                          const val: typeof Organizers.$inferInsert & {
                            image: any;
                          } = await form.validateFields();
                          const formData = new FormData();

                          Object.entries(val).forEach(([key, value]) => {
                            if (!value) return;
                            if (key === "image")
                              formData.append(key, value[0].originFileObj);
                            else formData.append(key, value);
                          });
                          return await update(x.id, formData).then(() =>
                            form.resetFields(),
                          );
                        } catch (e) {
                          return Promise.reject(e);
                        }
                      },
                    })
                  }
                />
                <Button
                  icon={<ArrowUp />}
                  disabled={x.order === minOrder}
                  onClick={async () => {
                    const formData = new FormData();
                    Object.entries(x).forEach(([key, value]) => {
                      if (!value || key === "order") return;
                      formData.append(key, String(value));
                    });
                    formData.append("order", `${x.order - 1}`);

                    await update(x.id, formData);
                  }}
                />
                <Button
                  icon={<ArrowDown />}
                  disabled={x.order === maxOrder}
                  onClick={async () => {
                    const formData = new FormData();
                    Object.entries(x).forEach(([key, value]) => {
                      if (!value || key === "order") return;
                      formData.append(key, String(value));
                    });
                    formData.append("order", `${x.order + 1}`);
                    await update(x.id, formData);
                  }}
                />
              </Space>
            ),
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Position",
            dataIndex: "position",
          },
          {
            title: "Image",
            render: (_, x: typeof Organizers.$inferSelect) => (
              <Image width={100} src={`/images/${x.image}`} alt={x.name} />
            ),
          },
        ]}
      />
      ;
    </>
  );
}
