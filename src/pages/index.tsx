import { Button, Typography, Space, Spin, Row, Pagination, Empty, Col } from 'antd';
import PageLayout from '@/components/layout/page-layout';
import Container from '@/components/layout/page-layout/Container';
import BaseCard from '@/components/BaseCard';
import usePostMutator from '@/utilities/hooks/posts/usePostMutator';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { useState } from 'react';
import DetailPostModal from '@/components/DetailPostModal';

const { Title, Text } = Typography;

export default function Home() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>();
  const [slug, setSlug] = useState<string>('');

  const { listData, isLoadingListData, pagination, goToPage } = usePostMutator({});

  return (
    <PageLayout>
      <Container style={{ padding: '48px 16px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical">
              <Title style={{ margin: 'auto' }} level={2}>
                Daftar Posts
              </Title>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Text>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push('add')}>
              Tambah Data
            </Button>
          </Col>
        </Row>

        <Spin spinning={isLoadingListData}>
          {listData?.length > 0 ? (
            <>
              <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                {listData?.map((item) => (
                  <Col span={24} md={12} lg={8} xl={6}>
                    <BaseCard
                      body={item?.body}
                      title={item?.title}
                      postId={item?.id}
                      onClick={() => {
                        setIsOpen(true);
                        setSlug(item?.id);
                      }}
                    />
                  </Col>
                ))}
              </Row>

              {pagination && !isLoadingListData && (
                <Row justify="center" style={{ marginTop: 48 }}>
                  {pagination?.pages !== 0 && (
                    <Pagination
                      defaultCurrent={1}
                      showSizeChanger={false}
                      {...(pagination && {
                        total: pagination.total,
                        pageSize: 12,
                        current: pagination.page,
                        onChange: (page, pageSize) => {
                          goToPage(page, pageSize);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        },
                      })}
                    />
                  )}
                </Row>
              )}
            </>
          ) : (
            <Empty />
          )}
        </Spin>

        <DetailPostModal
          isOpen={isOpen}
          slug={slug}
          onClose={() => {
            setIsOpen(false);
            setSlug('');
          }}
        />
      </Container>
    </PageLayout>
  );
}
