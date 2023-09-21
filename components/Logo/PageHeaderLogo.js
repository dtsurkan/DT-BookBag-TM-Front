import { useRouter } from 'next/router';
import { PageHeader } from 'antd';

const PageHeaderLogo = ({
  title = ' ',
  avatar = {
    src: '/assets/logo/Logo.svg',
    alt: 'Logo',
    size: 'large',
    style: {
      width: '87px',
      height: '52px',
      borderRadius: '0',
    },
  },
  isBackIcon = false,
  isClickable = false,
  style = {},
  ...props
}) => {
  const router = useRouter();
  const onBack = () => router.push('/');
  return (
    <span
      onKeyDown={isClickable ? onBack : undefined}
      onClick={isClickable ? onBack : undefined}
      role="button"
      tabIndex="0"
    >
      <PageHeader
        style={style}
        onBack={isBackIcon ? onBack : undefined}
        title={title}
        avatar={avatar}
        {...props}
      />
    </span>
  );
};

export default PageHeaderLogo;
