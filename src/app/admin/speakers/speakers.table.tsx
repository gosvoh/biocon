"use client";

import type { Speakers } from "@/db/schema";
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
import { flags } from "@/app/speakers/country.flags";

const EditForm = ({
  form,
  data,
  countries,
}: {
  form: FormInstance;
  data?: typeof Speakers.$inferInsert;
  countries: string[];
}) => (
  <Form<typeof Speakers.$inferInsert>
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    initialValues={{
      ...data,
      image: undefined,
    }}
  >
    <Form.Item<typeof Speakers.$inferInsert>
      name="name"
      label="Name"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert>
      name="nameUrl"
      label="Name Url"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert>
      name="university"
      label="University"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert>
      name="universityUrl"
      label="University Url"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert>
      name="description"
      label="Description"
    >
      <Input.TextArea />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert> name="thunder" label="HCR">
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert> name="thunderUrl" label="HCR Url">
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert> name="hIndex" label="hIndex">
      <Input type="number" />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert>
      name="speakerType"
      label="Speaker Type"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert>
      name="country"
      label="Country"
      rules={[{ required: true }]}
    >
      <Select
        options={Object.keys(flags).map((x) => ({ label: x, value: x }))}
        showSearch
        filterSort={(a, b) => a.value.localeCompare(b.value)}
        filterOption={(input, option) =>
          !option
            ? false
            : option.value.toLowerCase().includes(input.toLowerCase())
        }
      />
    </Form.Item>
    <Form.Item<typeof Speakers.$inferInsert>
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

export default function SpeakersTable({
  data,
  countries,
}: {
  data: (typeof Speakers.$inferSelect)[];
  countries: string[];
}) {
  const [modal, context] = Modal.useModal();
  const [form] = Form.useForm<typeof Speakers.$inferInsert>();
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
                  title: "Add speaker",
                  closable: true,
                  maskClosable: true,
                  width: 800,
                  centered: true,
                  okButtonProps: { style: { boxShadow: "none" } },
                  icon: null,
                  onOk: async () => {
                    try {
                      const val: typeof Speakers.$inferInsert & {
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
                  content: <EditForm countries={countries} form={form} />,
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
            render: (_, x: typeof Speakers.$inferSelect) => (
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
                      content: (
                        <EditForm countries={countries} form={form} data={x} />
                      ),
                      onOk: async (_) => {
                        try {
                          const val: typeof Speakers.$inferInsert & {
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
            render: (_, x: typeof Speakers.$inferSelect) => (
              <Link target="_blank" href={x.nameUrl}>
                {x.name}
              </Link>
            ),
          },
          {
            title: "University",
            render: (_, x: typeof Speakers.$inferSelect) => (
              <Link target="_blank" href={x.universityUrl}>
                {x.university}
              </Link>
            ),
          },
          { title: "Description", dataIndex: "description" },
          {
            title: "HCR",
            render: (_, x: typeof Speakers.$inferSelect) =>
              x.thunderUrl && x.thunder ? (
                <Link target="_blank" href={x.thunderUrl}>
                  {x.thunder}
                </Link>
              ) : (
                <>{x.thunder}</>
              ),
          },
          { title: "hIndex", dataIndex: "hIndex" },
          { title: "Speaker Type", dataIndex: "speakerType" },
          { title: "Country", dataIndex: "country" },
          {
            title: "Image",
            render: (_, x: typeof Speakers.$inferSelect) => (
              <Image width={100} src={`/images/${x.image}`} alt={x.name} />
            ),
          },
        ]}
      />
      ;
    </>
  );
}
