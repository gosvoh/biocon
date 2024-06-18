import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AntdRegistry>{children}</AntdRegistry>;
}
