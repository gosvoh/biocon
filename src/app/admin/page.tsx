import { Button, Space } from "antd";
import {
  ContactIcon,
  Mic2Icon,
  MicIcon,
  NewspaperIcon,
  TicketCheckIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";

export default function Admin() {
  return (
    <Space className="wrapper py-20">
      <Link href="/admin/registrations">
        <Button icon={<TicketCheckIcon />}>Registrations</Button>
      </Link>
      <Link href="/admin/speakers2023">
        <Button icon={<Mic2Icon />}>Speakers 2023</Button>
      </Link>
      <Link href="/admin/speakers2024">
        <Button icon={<MicIcon />}>Speakers 2024</Button>
      </Link>
      <Link href="/admin/speakers">
        <Button icon={<MicIcon />}>Speakers</Button>
      </Link>
      <Link href="/admin/news">
        <Button icon={<NewspaperIcon />}>News</Button>
      </Link>
      <Link href="/admin/organizers">
        <Button icon={<ContactIcon />}>Organizers</Button>
      </Link>
      <Link href="/admin/mediaAboutUs">
        <Button icon={<VideoIcon />}>Media about us</Button>
      </Link>
      <Link href="/admin/mediaAboutUs2024">
        <Button icon={<VideoIcon />}>Media about us 2024</Button>
      </Link>
    </Space>
  );
}
