import { Modal, Spin, Typography } from 'antd';
import useQueryFetch from '@/utilities/hooks/useQueryFetch';

const { Title, Text } = Typography;

interface Props {
  isOpen?: boolean;
  slug?: string | number;
  onClose?: () => void;
}

function DetailPostModal({ onClose, isOpen, slug }: Props) {
  const { data, isLoading } = useQueryFetch({
    url: `posts/${slug}`,
    enabled: Boolean(isOpen),
  });

  return (
    <Modal
      title="Detail Post"
      open={isOpen}
      onOk={onClose}
      footer={null}
      onCancel={onClose}
      width={500}
      centered
      destroyOnClose
    >
      <Spin spinning={isLoading}>
        <Title level={4}>{data?.title || '-'}</Title>
        <Text>{data?.body || '-'}</Text>
      </Spin>
    </Modal>
  );
}

export default DetailPostModal;
