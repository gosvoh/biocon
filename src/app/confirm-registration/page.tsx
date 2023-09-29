"use client";

import { useFetch, checkToken } from "@/lib/utils";
import type { Organizers } from "@prisma/client/biocon";
import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
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
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import React, { useEffect, useReducer, useState } from "react";
import type { Dayjs } from "dayjs";

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

const participationTypeOptions = [
  "Plenary or invited speaker",
  "Attendee",
  "Contributed speaker or Science Slammer",
] as const;

type FormValues = {
  participationType: (typeof participationTypeOptions)[number];
  name: string;
  country: string;
  type: string;
  passportNo: string;
  nationality: string;
  dateOfBirth: Dayjs;
  placeOfBirth: string;
  dateOfIssue: Dayjs;
  dateOfExpiry: Dayjs;
  authority: string;
  photo: File;
  visaPlace: string;
  address?: string;
  travelStartPoint?: string;
  acceptedDates?: boolean;
  bankDetails?: string;
};

export default function ConfirmRegistration() {
  const [form] = Form.useForm<FormValues>();
  const selectedParticipationType = Form.useWatch("participationType", form);

  return (
    <Layout>
      <Form
        form={form}
        className="border border-input rounded-md p-4 min-w-[50%] bg-primary-foreground"
        onFinish={(values) => {}}
        layout="vertical"
        onValuesChange={(changedValues, values) => {
          //   console.log(changedValues, values.dateOfBirth.format("YYYY-MM-DD"));
        }}
      >
        <Form.Item<FormValues>
          name="participationType"
          label="Choose the type of your participation"
          rules={[{ required: true }]}
          initialValue={participationTypeOptions[0]}
        >
          <Select
            options={participationTypeOptions.map((x) => ({
              label: x,
              value: x,
            }))}
            defaultActiveFirstOption
            onChange={console.log}
          />
        </Form.Item>
        <Form.Item<FormValues>
          name="name"
          label="Full name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormValues>
          name="country"
          label="Country code"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormValues>
          name="type"
          label="Type"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormValues>
          name="passportNo"
          label="Passport No."
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormValues>
          name="nationality"
          label="Nationality"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormValues>
          name="dateOfBirth"
          label="Date of birth"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<FormValues>
          name="placeOfBirth"
          label="Place of birth"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormValues>
          name="dateOfIssue"
          label="Date of issue"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<FormValues>
          name="dateOfExpiry"
          label="Date of expiry"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<FormValues>
          name="authority"
          label="Authority"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Photo"
          rules={[{ required: true }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e && e.fileList;
          }}
        >
          <Upload.Dragger
            accept="image/*, .pdf"
            beforeUpload={() => false}
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item<FormValues>
          name="visaPlace"
          label="Visa place" // TODO
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        {selectedParticipationType === "Plenary or invited speaker" ? (
          <>
            <Form.Item<FormValues>
              name="travelStartPoint"
              label="Select the city of the nearest convenient airport from which you are ready to start your travel"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <p>
              Dear speakers, for your comfortable stay at the conference, we
              have chosen the dates:
            </p>
            <ol
              style={{
                listStyle: "revert",
                margin: "revert",
                padding: "revert",
              }}
            >
              <li>The start date of the travel is December 15 or 16</li>
              <li>The departure date from Almetyevsk is December 21</li>
            </ol>
            <Form.Item<FormValues>
              name="acceptedDates"
              rules={[{ required: true }]}
              valuePropName="checked"
            >
              <Checkbox>I’ve read and accept the dates</Checkbox>
            </Form.Item>
            <Form.Item<FormValues>
              name="bankDetails"
              label="Bank details for international transactions (Euro account only)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </>
        ) : (
          <Form.Item<FormValues>
            name="address"
            label="Specify your place of stay in Almetyevsk (address)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        )}
        <Button></Button>
      </Form>
    </Layout>
  );
}
