import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { PageHeader } from 'antd';

const PageHeaderLogo = ({
  title = 'components:empty.empty-space',
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
  const { t } = useTranslation();
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
        title={t(title)}
        avatar={avatar}
        {...props}
      />
    </span>
  );
};

export default PageHeaderLogo;
