"use client";

import type { News } from "@/db/schema";
import {
  Button,
  Form,
  FormInstance,
  Image,
  Input,
  Modal,
  Popconfirm,
  Select,
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
  data?: typeof News.$inferInsert;
}) => (
  <Form<typeof News.$inferInsert>
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    initialValues={{
      ...data,
      image: undefined,
    }}
  >
    <Form.Item<typeof News.$inferInsert>
      name="title"
      label="Title"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof News.$inferInsert>
      name="href"
      label="Link"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof News.$inferInsert>
      name="image"
      label="Image"
      valuePropName="fileList"
      getValueFromEvent={(e) => e.fileList}
    >
      <Upload
        listType="picture"
        maxCount={1}
        beforeUpload={() => false}
        accept="image/*"
      >
        <Button icon={<UploadIcon />}>Upload</Button>
      </Upload>
    </Form.Item>
  </Form>
);

export default function NewsTable({
  data,
}: {
  data: (typeof News.$inferSelect)[];
}) {
  const [modal, context] = Modal.useModal();
  const [form] = Form.useForm<typeof News.$inferInsert>();

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
                  title: "Add News",
                  content: <EditForm form={form} />,
                  onOk: async () => {
                    modal.confirm({
                      title: "Add News",
                      closable: true,
                      maskClosable: true,
                      width: 800,
                      centered: true,
                      okButtonProps: { style: { boxShadow: "none" } },
                      icon: null,
                      content: <EditForm form={form} />,
                      onOk: async () => {
                        try {
                          const val: typeof News.$inferInsert & {
                            image: any;
                          } = await form.validateFields();
                          const formData = new FormData();
                          formData.append("title", val.title);
                          formData.append("href", val.href);
                          formData.append("image", val.image[0].originFileObj);
                          return await add(formData).then(() =>
                            form.resetFields(),
                          );
                        } catch (e) {
                          return Promise.reject(e);
                        }
                      },
                    });
                  },
                });
              }}
            >
              Add News
            </Button>
          </Space>
        )}
        columns={[
          {
            title: "Actions",
            width: 200,
            render: (_, x) => (
              <Space>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => remove(x.id)}
                >
                  <Button danger icon={<Trash2Icon />} />
                </Popconfirm>
                <Button
                  type="primary"
                  icon={<EditIcon />}
                  onClick={() =>
                    modal.confirm({
                      title: "Edit News",
                      closable: true,
                      maskClosable: true,
                      width: 800,
                      centered: true,
                      okButtonProps: { style: { boxShadow: "none" } },
                      icon: null,
                      content: <EditForm form={form} data={x} />,
                      onOk: async () => {
                        try {
                          const val: typeof News.$inferInsert & {
                            image: any;
                          } = await form.validateFields();
                          const formData = new FormData();
                          formData.append("title", val.title);
                          formData.append("href", val.href);
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
          {
            title: "Link",
            dataIndex: "href",
            render: (x) => (
              <Link href={x} target="_blank">
                Link
              </Link>
            ),
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Image",
            dataIndex: "image",
            render: (x) => <Image src={`/images/${x}`} width={100} />,
          },
        ]}
      />
    </>
  );
}
