import Link from "next/link";
import Logo from "../../../../public/images/logo.png";
import Image from "next/image";

interface Props {
  path?: string;
}

export default function BrandLogo({ path = "/" }: Props) {
  return (
    <Link href={path}>
      <Image alt="logo" src={Logo} width="100" />
    </Link>
  );
}
