"use client";

import { useFetch, checkToken } from "@/lib/utils";
import { Speaker } from "@/app/data";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useAsync, useSessionStorageValue } from "@react-hookz/web";
import {
  ConfigProvider,
  Form,
  Input,
  Upload,
  theme,
  Button,
  Spin,
  InputNumber,
  Modal,
  Table,
  Image,
  Tooltip,
  Popconfirm,
} from "antd";
import { useEffect, useReducer, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div></div>
      <div className="flex items-center justify-center p-4">
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          {children}
        </ConfigProvider>
      </div>
    </>
  );
};

export default function AddSpeaker() {
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
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<Speaker>();
  const [organizersState, organizersAction] = useAsync<Speaker[]>(
    async () => fetch("/api/speakers").then((res) => res.json()),
    []
  );

  const HTTP = useFetch(token.value);

  useEffect(() => {
    setLoading(true);
    organizersAction.execute().then(() => setLoading(false));
  }, [organizersAction]);

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
        onOk={() => form.submit()}
        onCancel={() => {
          setEditData(undefined);
          setEditOpen(false);
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
            formData.append("university", values.university);
            formData.append("topic", values.topic);
            values.description &&
              formData.append("description", values.description);
            values.thunder && formData.append("thunder", values.thunder);
            formData.append("hIndex", values.hIndex);
            if (values.image)
              formData.append("image", values.image[0].originFileObj);
            setLoading(true);
            let req: Promise<Response>;
            if (editData)
              req = HTTP.PATCH(`/api/speakers/${editData.id}`, formData);
            else req = HTTP.POST("/api/speakers", formData);
            req
              .then((res) => {
                if (res.status === 200) {
                  form.resetFields();
                  setEditData(undefined);
                  setEditOpen(false);
                  organizersAction.execute();
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
            getValueFromEvent={(e) => e && e.fileList}
            rules={[{ required: editData ? false : true }]}
          >
            <Upload beforeUpload={() => false} accept="image/*" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="hIndex" label="H-Index" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="university"
            label="University"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="thunder" label="Thunder">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        tableLayout="fixed"
        bordered
        className="w-full self-start"
        pagination={false}
        loading={organizersState.status === "loading"}
        footer={() => (
          <Button
            type="primary"
            className="bg-[#1668dc]"
            onClick={() => setEditOpen(true)}
          >
            Add Speaker
          </Button>
        )}
        dataSource={organizersState.result}
        rowKey="id"
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
                alt="Speaker image"
              />
            ),
          },
          { title: "Name", dataIndex: "name" },
          { title: "H-Index", dataIndex: "hIndex" },
          { title: "University", dataIndex: "university" },
          { title: "Topic", dataIndex: "topic" },
          { title: "Description", dataIndex: "description" },
          { title: "Thunder", dataIndex: "thunder" },
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
                      form.setFieldValue("hIndex", record.hIndex);
                      form.setFieldValue("university", record.university);
                      form.setFieldValue("topic", record.topic);
                      form.setFieldValue("description", record.description);
                      form.setFieldValue("thunder", record.thunder);
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  title="Are you sure to delete this speaker?"
                  onConfirm={() => {
                    setLoading(true);
                    HTTP.DELETE(`/api/speakers/${record.id}`).then(() => {
                      organizersAction.execute();
                      setLoading(false);
                    });
                  }}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ className: "bg-[#1668dc]" }}
                >
                  <Button
                    type="dashed"
                    icon={<DeleteOutlined />}
                    danger
                    loading={loading}
                  />
                </Popconfirm>
              </>
            ),
          },
        ]}
      />
    </Layout>
  );
}
