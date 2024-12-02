import { Image } from "antd";
import Link from "next/link";

interface Props {
  path?: string;
}

export default function BrandLogo({ path = "/" }: Props) {
  return (
    <Link href={path}>
      <Image alt="logo" src={"s"} width="100" />
    </Link>
  );
}
