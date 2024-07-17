"use client";

import type { Speakers2023 } from "@/db/schema";
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
  ArrowLeft,
  EditIcon,
  PlusCircleIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { add, remove, update } from "./actions";
import Link from "next/link";

const EditForm = ({
  form,
  data,
}: {
  form: FormInstance;
  data?: typeof Speakers2023.$inferInsert;
}) => (
  <Form<typeof Speakers2023.$inferInsert>
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    initialValues={{ ...data, image: undefined }}
  >
    <Form.Item<typeof Speakers2023.$inferInsert>
      name="name"
      label="Name"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers2023.$inferInsert>
      name="university"
      label="University"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers2023.$inferInsert>
      name="image"
      label="Image"
      rules={[{ required: !!data ? false : true }]}
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

export default function Speakers2023Table({
  data,
}: {
  data: (typeof Speakers2023.$inferSelect)[];
}) {
  const [modal, context] = Modal.useModal();
  const [form] = Form.useForm();

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
                  title: "Add speaker",
                  closable: true,
                  maskClosable: true,
                  width: 800,
                  centered: true,
                  okButtonProps: { style: { boxShadow: "none" } },
                  icon: null,
                  onOk: async () => {
                    try {
                      const val: typeof Speakers2023.$inferInsert & {
                        image: any;
                      } = await form.validateFields();
                      const formData = new FormData();
                      formData.append("name", val.name);
                      formData.append("university", val.university);
                      formData.append("image", val.image[0].originFileObj);
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
            title: "Actions",
            width: 200,
            render: (_, x: typeof Speakers2023.$inferSelect) => (
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
                      title: "Edit speaker",
                      closable: true,
                      maskClosable: true,
                      width: 800,
                      centered: true,
                      icon: null,
                      okButtonProps: { style: { boxShadow: "none" } },
                      content: <EditForm form={form} data={x} />,
                      onOk: async (_) => {
                        try {
                          const val: typeof Speakers2023.$inferInsert & {
                            image: any;
                          } = await form.validateFields();
                          const formData = new FormData();
                          formData.append("name", val.name);
                          formData.append("university", val.university);
                          val.image &&
                            formData.append(
                              "image",
                              val.image[0].originFileObj,
                            );
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
              </Space>
            ),
          },
          { title: "Name", dataIndex: "name" },
          { title: "University", dataIndex: "university" },
          {
            title: "Image",
            dataIndex: "image",
            render: (_, x) => <Image src={`/images/${x.image}`} width={100} />,
          },
        ]}
      />
    </>
  );
}
