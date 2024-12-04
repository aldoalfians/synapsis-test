import { Button, Card, Col, Divider, Dropdown, MenuProps, Row, Space, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import usePostMutator from '@/utilities/hooks/posts/usePostMutator';

const { Title, Paragraph } = Typography;

interface Props {
  title?: string;
  body?: string;
  postId?: string | number;
  onClick?: () => void;
}

function BaseCard({ title, body, postId, onClick }: Props) {
  const router = useRouter();
  const { submitDeletePost, isLoadingDeletePost } = usePostMutator({
    id: postId,
  });

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Hapus Post',
    },
    {
      key: '2',
      label: 'Edit Post',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = useCallback(
    ({ key }: { key: string }) => {
      if (key === '1') {
        submitDeletePost && submitDeletePost({});
      } else if (key === '2') {
        router.push(`/edit/${postId}`);
      }
    },
    [postId, router]
  );

  return (
    <Card size="small" hoverable style={{ minHeight: 216 }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5}>#{postId || 0}</Title>
        </Col>
        <Col>
          <Space>
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Button
                size="small"
                type="default"
                icon={<EllipsisOutlined />}
                disabled={isLoadingDeletePost}
              />
            </Dropdown>
          </Space>
        </Col>
      </Row>

      <Divider orientation="center" style={{ margin: '12px 0' }} />

      <Title level={2} ellipsis>
        {title || '-'}
      </Title>
      <Paragraph ellipsis={{ rows: 2 }}>{body || '-'}</Paragraph>

      <Button
        style={{ fontSize: 12 }}
        size="small"
        onClick={onClick}
        disabled={isLoadingDeletePost}
      >
        Selengkapnya
      </Button>
    </Card>
  );
}

export default BaseCard;
