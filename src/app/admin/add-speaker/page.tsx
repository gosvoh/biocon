"use client";

import { useFetch, checkToken } from "@/lib/utils";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
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
  Select,
} from "antd";
import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import type { Speakers } from "@prisma/client/biocon";

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
  const [editData, setEditData] = useState<Speakers>();
  const [speakersState, speakersAction] = useAsync<Speakers[]>(
    async () =>
      fetch("/api/speakers", { cache: "no-cache" })
        .then((res) => res.json())
        .then((speakers: Speakers[]) =>
          speakers.sort((a, b) => a.order - b.order)
        ),
    []
  );
  const [countriesState, countriesAction] = useAsync<
    {
      id: number;
      name: string;
      iso2: string;
    }[]
  >(() => fetch("/api/countries").then((res) => res.json()), []);

  const HTTP = useFetch(token.value);

  useEffect(() => {
    setLoading(true);
    Promise.all([speakersAction.execute(), countriesAction.execute()]).then(
      () => setLoading(false)
    );
  }, [speakersAction, countriesAction]);

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

  const SpeakerFields = {
    name: true,
    nameUrl: true,
    image: true,
    university: true,
    universityUrl: true,
    topic: false,
    description: false,
    thunder: false,
    thunderUrl: false,
    hIndex: false,
    speakerType: true,
    country: true,
  };

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
            formData.append("nameUrl", values.nameUrl);
            formData.append("university", values.university);
            formData.append("universityUrl", values.universityUrl);
            values.topic && formData.append("topic", values.topic);
            values.description &&
              formData.append("description", values.description);
            values.thunder && formData.append("thunder", values.thunder);
            values.thunderUrl &&
              formData.append("thunderUrl", values.thunderUrl);
            values.hIndex && formData.append("hIndex", values.hIndex);
            formData.append("speakerType", values.speakerType);
            formData.append("country", values.country);
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
                  speakersAction.execute();
                }
              })
              .finally(() => setLoading(false));
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: SpeakerFields.name }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameUrl"
            label="Name URL"
            rules={[{ required: SpeakerFields.nameUrl, type: "url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[{ required: editData ? false : SpeakerFields.image }]}
          >
            <Upload beforeUpload={() => false} accept="image/*" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="hIndex"
            label="H-Index"
            rules={[{ required: SpeakerFields.hIndex }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="university"
            label="University"
            rules={[{ required: SpeakerFields.university }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="universityUrl"
            label="University URL"
            rules={[{ required: SpeakerFields.universityUrl, type: "url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="topic"
            label="Topic"
            rules={[{ required: SpeakerFields.topic }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: SpeakerFields.description }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="thunder"
            label="Thunder"
            rules={[{ required: SpeakerFields.thunder }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="thunderUrl"
            label="Thunder URL"
            rules={[{ required: SpeakerFields.thunderUrl, type: "url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="speakerType"
            label="Speaker Type"
            rules={[{ required: SpeakerFields.speakerType }]}
          >
            <Select
              options={[
                { label: "Planary", value: "plenary" },
                { label: "Invited", value: "invited" },
                { label: "Moderator", value: "moderator" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: SpeakerFields.country }]}
          >
            <Select
              showSearch
              options={countriesState.result?.map((country) => ({
                label: country.name,
                value: country.name,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        tableLayout="fixed"
        bordered
        size="small"
        className="w-full self-start"
        pagination={false}
        loading={speakersState.status === "loading"}
        footer={() => (
          <Button
            type="primary"
            className="bg-[#1668dc]"
            onClick={() => setEditOpen(true)}
          >
            Add Speaker
          </Button>
        )}
        dataSource={speakersState.result}
        rowKey={(speaker) => speaker.id}
        columns={[
          {
            title: "Image",
            dataIndex: "image",
            render: (url: string) => (
              <Image
                className="object-cover"
                src={`/images/${url}.webp`}
                alt="Speaker image"
                style={{ aspectRatio: "1/1", objectPosition: "center" }}
              />
            ),
            width: 100,
          },
          {
            title: "Name",
            render: (_, record) => (
              <Link href={record.nameUrl}>
                {record.name} <LinkOutlined />
              </Link>
            ),
          },
          { title: "Country", dataIndex: "country" },
          { title: "H-Index", dataIndex: "hIndex", width: 75 },
          {
            title: "University",
            render: (_, record) => (
              <Link href={record.universityUrl}>
                {record.university} <LinkOutlined />
              </Link>
            ),
          },
          { title: "Topic", dataIndex: "topic" },
          { title: "Description", dataIndex: "description", ellipsis: true },
          {
            title: "Thunder",
            render: (_, record) =>
              record.thunderUrl ? (
                <Link href={record.thunderUrl}>
                  {record.thunder} <LinkOutlined />
                </Link>
              ) : (
                <p>{record.thunder}</p>
              ),
          },
          { title: "Speaker Type", dataIndex: "speakerType" },
          {
            title: "Actions",
            sorter: (a, b) => a.order - b.order,
            sortOrder: "ascend",
            showSorterTooltip: false,
            render: (_, record, index) => (
              <div className="flex flex-wrap gap-2 justify-center">
                <Tooltip title="Edit">
                  <Button
                    type="dashed"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditData(record);
                      setEditOpen(true);
                      form.setFieldValue("name", record.name);
                      form.setFieldValue("nameUrl", record.nameUrl);
                      form.setFieldValue("university", record.university);
                      form.setFieldValue("universityUrl", record.universityUrl);
                      form.setFieldValue("topic", record.topic);
                      form.setFieldValue("description", record.description);
                      form.setFieldValue("thunder", record.thunder);
                      form.setFieldValue("thunderUrl", record.thunderUrl);
                      form.setFieldValue("hIndex", record.hIndex);
                      form.setFieldValue("speakerType", record.speakerType);
                      form.setFieldValue("country", record.country);
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  title="Are you sure to delete this speaker?"
                  onConfirm={() => {
                    setLoading(true);
                    HTTP.DELETE(`/api/speakers/${record.id}`).then(() => {
                      speakersAction.execute();
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
                <div className="inline-flex gap-2">
                  <Button
                    icon={<ArrowUpOutlined />}
                    disabled={record.order === 1}
                    onClick={() => {
                      setLoading(true);
                      HTTP.PATCH("/api/speakers", {
                        topId: speakersState.result[index - 1].id,
                        topOrder: speakersState.result[index - 1].order,
                        currentId: record.id,
                        currentOrder: record.order,
                      }).then(() => {
                        speakersAction.execute();
                        setLoading(false);
                      });
                    }}
                  />
                  <Button
                    icon={<ArrowDownOutlined />}
                    disabled={record.order === speakersState.result.length}
                    onClick={() => {
                      setLoading(true);
                      HTTP.PATCH("/api/speakers", {
                        bottomId: speakersState.result[index + 1].id,
                        bottomOrder: speakersState.result[index + 1].order,
                        currentId: record.id,
                        currentOrder: record.order,
                      }).then(() => {
                        speakersAction.execute();
                        setLoading(false);
                      });
                    }}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </Layout>
  );
}
