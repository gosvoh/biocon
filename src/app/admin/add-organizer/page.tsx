"use client";

import { useFetch, checkToken } from "@/lib/utils";
import type { Organizers } from "@prisma/client/biocon";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useAsync, useSessionStorageValue } from "@react-hookz/web";
import {
  Form,
  Input,
  Upload,
  Button,
  ConfigProvider,
  theme,
  Spin,
  Table,
  Image,
  Tooltip,
  Popconfirm,
  Modal,
} from "antd";
import React, { useEffect, useReducer, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          {children}
        </ConfigProvider>
      </div>
    </>
  );
};

export default function AddOrginizer() {
  const [form] = Form.useForm();
  const token = useSessionStorageValue("token", {
    defaultValue: "",
    initializeWithValue: false,
  });
  type TokenData = {
    loading: boolean;
    isValid: boolean;
  };
  const [tokenData, setTokenData] = useReducer(
    (state: TokenData, newState: Partial<TokenData>) => ({
      ...state,
      ...newState,
    }),
    { loading: false, isValid: false }
  );
  const [loading, setLoading] = useState(false);
  const [speakersState, speakersAction] = useAsync<Organizers[]>(
    async () => fetch("/api/organizers").then((res) => res.json()),
    []
  );
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<Organizers>();

  const HTTP = useFetch(token.value);

  useEffect(() => {
    setLoading(true);
    speakersAction.execute().then(() => setLoading(false));
  }, [speakersAction]);

  useEffect(() => {
    if (!token.value || token.value === "" || tokenData.isValid) return;

    setTokenData({ loading: true });
    checkToken(token.value)
      .then((isValid) => setTokenData({ isValid }))
      .finally(() => setTokenData({ loading: false }));
  }, [token.value, tokenData.isValid]);

  if (token.value === undefined) {
    return (
      <Layout>
        <Spin size="large" />
      </Layout>
    );
  }

  if (!tokenData.isValid) {
    return (
      <Layout>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="border border-input rounded-md p-4 min-w-[50%] bg-primary-foreground"
          onFinish={(values) => token.set(values.token)}
        >
          <Form.Item name="token" label="Token" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              loading={tokenData.loading}
              type="primary"
              htmlType="submit"
              className="bg-[#1668dc]"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    );
  }

  return (
    <Layout>
      <Modal
        open={editOpen}
        okButtonProps={{ className: "bg-[#1668dc]", loading }}
        okText="Submit"
        cancelText="Cancel"
        onOk={form.submit}
        onCancel={() => {
          setEditOpen(false);
          setEditData(undefined);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="border border-input rounded-md p-4 min-w-[50%] bg-primary-foreground"
          onFinish={(values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("position", values.position);
            formData.append("email", values.email);
            if (values.image)
              formData.append("image", values.image[0].originFileObj);
            setLoading(true);
            let req: Promise<Response>;
            if (editData)
              req = HTTP.PATCH(`/api/organizers/${editData.id}`, formData);
            else req = HTTP.POST("/api/organizers", formData);
            req
              .then((res) => {
                if (res.status === 200) {
                  form.resetFields();
                  setEditData(undefined);
                  setEditOpen(false);
                  speakersAction.execute();
                }
              })
              .finally(() => setLoading(false));
          }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
            rules={[{ required: editData ? false : true }]}
          >
            <Upload beforeUpload={() => false} accept="image/*" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        tableLayout="fixed"
        bordered
        className="w-full self-start"
        pagination={false}
        loading={speakersState.status === "loading"}
        footer={() => (
          <Button
            type="primary"
            className="bg-[#1668dc]"
            onClick={() => setEditOpen(true)}
          >
            Add Organizer
          </Button>
        )}
        columns={[
          {
            title: "Image",
            dataIndex: "image",
            render: (url: string) => (
              <Image
                width={75}
                height={75}
                className="object-cover"
                src={`/images/${url}.webp`}
                alt="Orginizer image"
              />
            ),
          },
          { title: "Name", dataIndex: "name" },
          { title: "Position", dataIndex: "position" },
          { title: "Email", dataIndex: "email" },
          {
            title: "Actions",
            render: (_, record) => (
              <>
                <Tooltip title="Edit">
                  <Button
                    className="mr-2"
                    type="dashed"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditData(record);
                      setEditOpen(true);
                      form.setFieldValue("name", record.name);
                      form.setFieldValue("position", record.position);
                      form.setFieldValue("email", record.email);
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  title="Are you sure to delete this organizer?"
                  onConfirm={() => {
                    setLoading(true);
                    HTTP.DELETE(`/api/organizers/${record.id}`)
                      .then((res) => {
                        speakersAction.execute().then(() => setLoading(false));
                        return res.json();
                      })
                      .then(console.log);
                  }}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ className: "bg-[#1668dc]" }}
                >
                  <Button
                    type="dashed"
                    danger
                    icon={<DeleteOutlined />}
                    loading={loading}
                  />
                </Popconfirm>
              </>
            ),
          },
        ]}
        dataSource={speakersState.result}
        rowKey="id"
      />
    </Layout>
  );
}
