import useTranslation from 'next-translate/useTranslation';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import ContinueWithProviders from './ContinueWithProviders';

const FormWrapper = ({
  formTitle = 'components:auth.login-title',
  formTitleLevel = 1,
  formSubtitle = '',
  formSubtitleLevel = 5,
  FormComponent,
  additionalText,
  linkText,
  linkUrl,
  isNeededAuthProviders = true,
  isLoadingAuth,
  btnText = '',
  onFinish = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Row justify="center" align="middle" style={{ flex: 1 }}>
        <Col xs={22} md={20} lg={18} xl={14} style={{ display: 'flex', flexDirection: 'column' }}>
          <Title level={formTitleLevel}>{t(formTitle)}</Title>
          {formSubtitle && <Title level={formSubtitleLevel}>{t(formSubtitle)}</Title>}
          <FormComponent btnText={btnText} isLoadingAuth={isLoadingAuth} onFinish={onFinish} />
          {isNeededAuthProviders && (
            <ContinueWithProviders
              additionalText={additionalText}
              linkText={linkText}
              linkUrl={linkUrl}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormWrapper;
