import useTranslation from 'next-translate/useTranslation';
import { Form } from 'antd';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainInputPassword from 'components/DataEntries/Main/MainInputPassword';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';

const ResetPasswordForm = ({
  btnText = 'components:empty.empty-string',
  isLoadingAuth,
  onFinish = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Form onFinish={onFinish} size="large">
        <MainInputPassword
          lg={24}
          name="password"
          rules={[{ required: true, message: 'components:data-entries.password-error-required' }]}
        />
        <MainInputPassword
          lg={24}
          name="passwordConfirmation"
          placeholder="components:data-entries.confirm-password-placeholder"
          dependencies={['password']}
          // NOTE! Don't know how to merge validator and translation mixture.
          isTranslateRules={false}
          rules={[
            {
              required: true,
              message: t('components:data-entries.confirm-password-error-required'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t('components:data-entries.confirm-password-error-dismatch'))
                );
              },
            }),
          ]}
        />
        <Form.Item>
          <MainSpinner spinning={isLoadingAuth}>
            <PrimaryButton btnText={btnText} />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
