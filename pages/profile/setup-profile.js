import useTwilioClient from 'hooks/useTwilioClient';
import useShowConfigModal from 'hooks/useShowConfigModal';
import useCustomSwr from 'hooks/useCustomSwr';
import { createUseStyles } from 'react-jss';
import { getSession, useSession } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation';
import { Fragment, useEffect, useMemo, useState } from 'react';
import _isEqual from 'lodash/isEqual';
import { Col, Form, message, Row, Space, Spin, Switch } from 'antd';
import Title from 'antd/lib/typography/Title';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProfileLayout from 'components/Layout/ProfileLayout';
import PicturesWall from 'components/DataEntries/Upload/PicturesWall';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import DeleteProfileModal from 'components/Modals/DeleteProfile';
import { updateCurrentUserProfile } from 'logics/profile';
import { getSettingsInputList } from 'utils/form-configs';
import Text from 'antd/lib/typography/Text';
import {
  createSubscriptionOnNewBooks,
  updateSubscriptionOnNewBooks,
} from 'lib/strapi/services/subscriptions';

const useStyles = createUseStyles({
  uploadAvatarBtn: {
    '& .ant-upload.ant-upload-select-picture-card, .ant-upload-list-picture-card .ant-upload-list-item': {
      background: '#edf8f6',
      borderRadius: '50%',
      padding: 0,
    },
    '& .ant-upload-list-item-info': {
      borderRadius: '50%',
    },
  },
});

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const SetupProfile = () => {
  const [session, loading] = useSession();
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const [isLoadingCheckBox, setIsLoadingCheckBox] = useState(false);
  const [form] = Form.useForm();
  const { client } = useTwilioClient();
  const { response: profile, isLoading: isLoadingUserProfile, mutate } = useCustomSwr({
    url: `/users/${session?.profile?.id}`,
    token: session?.jwt,
  });
  const { response: subscription, mutate: mutateSubscription } = useCustomSwr({
    url: `/subscriptions?email=${session?.profile?.email}`,
  });
  const initialValues = useMemo(
    () => ({
      // By default form values are undefined
      username: profile?.username,
      email: profile?.email,
      fullname: profile?.fullname ? profile?.fullname : undefined,
      user_city: profile?.user_city ? profile?.user_city : undefined,
      avatar: profile?.avatar?.length ? profile?.avatar : [],
    }),
    [profile]
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const onFinishUpdateProfile = async (values) => {
    confirm({
      centered: true,
      title: t('components:confirm.confirm-saving-profile-settings'),
      icon: <ExclamationCircleOutlined />,
      okText: t('components:general.yes'),
      okType: 'primary',
      //   because dropdown z-index === 1050
      zIndex: 1100,
      cancelText: t('components:general.no'),
      async onOk() {
        const response = await updateCurrentUserProfile(session, values);
        if (response.status === 200) {
          message.success(t('components:auth.success-editing-profile-title'));
          mutate();
        }
      },
      onCancel() {
        message.info('Cancel');
      },
    });
  };
  const onFinishFailedUpdateProfile = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <ProfileLayout>
        <Row style={{ marginTop: '30px' }}>
          <Col xs={24}>
            <Title level={1} type="secondary">
              {t('components:others.settings-title')}
            </Title>
          </Col>
          <Col xs={24}>
            <Spin spinning={loading || isLoadingUserProfile}>
              <Form
                layout="vertical"
                initialValues={initialValues}
                form={form}
                size="large"
                name="settings"
                onFinish={onFinishUpdateProfile}
                onFinishFailed={onFinishFailedUpdateProfile}
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} style={{ display: 'flex', alignItems: 'center' }}>
                    <PicturesWall
                      maxCount={1}
                      form={form}
                      rules={[]}
                      multiple={false}
                      name="avatar"
                      className={classes.uploadAvatarBtn}
                      isDraggable={false}
                      isDragger={false}
                    />

                    <Title level={3} style={{ margin: 0 }} type="secondary">
                      {profile?.username}
                    </Title>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Row gutter={[16, 0]}>
                      {getSettingsInputList().map(({ id, component: Component, ...props }) => (
                        <Fragment key={id}>
                          <Component {...props} form={form} />
                        </Fragment>
                      ))}
                      <Col xs={24}>
                        <Form.Item shouldUpdate>
                          {({ getFieldsValue }) => (
                            <Form.Item>
                              <Row gutter={[0, 24]} justify="space-between">
                                <Col xs={24}>
                                  <PrimaryButton
                                    type="default"
                                    htmlType="button"
                                    btnText="components:buttons.reset"
                                    disabled={_isEqual(getFieldsValue(), initialValues)}
                                    onClick={() => form.resetFields()}
                                  />
                                </Col>
                                <Col xs={24}>
                                  <PrimaryButton
                                    disabled={_isEqual(getFieldsValue(), initialValues)}
                                    btnText="components:buttons.save-changes"
                                  />
                                </Col>
                              </Row>
                            </Form.Item>
                          )}
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Space>
                          <Switch
                            checked={subscription[0]?.hasNewBooks}
                            loading={isLoadingCheckBox}
                            onChange={async (isChecked) => {
                              setIsLoadingCheckBox(true);
                              console.log(`isChecked`, isChecked);
                              if (isChecked && !subscription.length) {
                                const createdSubscription = await createSubscriptionOnNewBooks({
                                  email: session?.profile?.email,
                                  hasNewBooks: true,
                                });
                                console.log(`createdSubscription`, createdSubscription);
                                message.success(t('components:subscribe.success-subscribing'));
                                await mutateSubscription();
                                setIsLoadingCheckBox(false);
                                return;
                              }
                              const response = await updateSubscriptionOnNewBooks(
                                subscription[0]?.id,
                                { hasNewBooks: isChecked },
                                session.jwt
                              );
                              await mutateSubscription();
                              setIsLoadingCheckBox(false);
                              if (response.status === 200) {
                                message.success(
                                  t(
                                    response?.data?.hasNewBooks
                                      ? 'components:subscribe.success-subscribing'
                                      : 'components:subscribe.success-unsubscribing'
                                  )
                                );
                              }
                              console.log(`response`, response);
                            }}
                          />
                          <Text>{t('components:data-entries.mailing-switch')}</Text>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} lg={12}>
                    <PrimaryButton
                      danger
                      type="default"
                      htmlType="button"
                      btnText="components:buttons.remove-profile"
                      onClick={showConfigBookModal}
                    />
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Col>
        </Row>
      </ProfileLayout>
      <DeleteProfileModal
        client={client}
        visible={isConfigBookModal}
        onCancel={handleCancelConfigBookModal}
        width={500}
      />
    </>
  );
};

export default SetupProfile;
