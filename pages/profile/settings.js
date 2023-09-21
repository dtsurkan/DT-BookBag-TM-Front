import { useShowConfigModal, useTwilioClient } from 'hooks';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty as _isEmpty, isEqual as _isEqual } from 'lodash';
import { Col, Form, message, Row, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProfileLayout from 'components/AppLayout/ProfileLayout';
import PicturesWall from 'components/DataEntry/Upload/PicturesWall';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import DeleteProfileModal from 'components/Modals/DeleteProfileModal';
import { getCurrentUserProfile, updateCurrentUserProfile } from 'state/actions/user/profile';
import { getSettingsInputList } from 'utils/form-configs';

const Settings = () => {
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const { profile, isLoadingUserProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const { client } = useTwilioClient();

  // if (!profile) {
  //   router.push("/login");
  //   return null;
  // }

  const initialValues = useMemo(
    () => ({
      username: profile?.username,
      email: profile?.email,
      fullname: profile?.fullname ? profile.fullname : undefined,
      // By default form values are undefined
      user_city: profile?.user_city ? profile.user_city : undefined,
      avatar: profile?.avatar?.length ? profile.avatar : [],
    }),
    [profile]
  );

  useEffect(() => {
    if (profile?.id) {
      dispatch(getCurrentUserProfile(profile?.id));
    }
  }, [profile.id, dispatch]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  useEffect(() => {
    if (_isEmpty(profile)) {
      router.push('/login');
    }
  }, [profile, router]);

  const onFinishUpdateProfile = async (values) => {
    confirm({
      centered: true,
      title: 'Вы действительно хотите cохранить все изменения?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'primary',
      //   because dropdown z-index === 1050
      zIndex: 1100,
      cancelText: 'Нет',
      async onOk() {
        await dispatch(updateCurrentUserProfile(profile.id, values));
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
              Настройки профиля
            </Title>
          </Col>
          <Col xs={24}>
            <Spin spinning={isLoadingUserProfile}>
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
                      className="uploadAvatarBtn"
                      isDraggable={false}
                      isDragger={false}
                    />

                    <Title level={3} style={{ margin: 0 }} type="secondary">
                      {profile.username}
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
                                    btnText="Сбросить"
                                    disabled={_isEqual(getFieldsValue(), initialValues)}
                                    onClick={() => form.resetFields()}
                                  />
                                </Col>
                                <Col xs={24}>
                                  <PrimaryButton
                                    disabled={_isEqual(getFieldsValue(), initialValues)}
                                    btnText="Сохранить все изменения"
                                  />
                                </Col>
                              </Row>
                            </Form.Item>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} lg={12}>
                    <PrimaryButton
                      danger
                      type="default"
                      htmlType="button"
                      btnText="Удалить профиль"
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
        title="Видалити свій профіль"
        width={500}
        btnText="Видалити свій профіль"
      />
    </>
  );
};

export default Settings;
