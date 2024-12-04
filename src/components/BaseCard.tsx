import { Button, Card, Dropdown, MenuProps, Row, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph } = Typography;

interface Props {
  title?: string;
  body?: string;
  postId?: string | number;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Hapus Post",
  },
];

function BaseCard({ title, body, postId }: Props) {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  return (
    <Card size="small" hoverable>
      <Row justify="space-between">
        <Title level={5}>#{postId || 0}</Title>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Row>

      <Title level={2} ellipsis>
        {title || "-"}
      </Title>
      <Paragraph ellipsis={{ rows: 2 }}>{body || "-"}</Paragraph>
    </Card>
  );
}

export default BaseCard;
