import { Form, Input } from "antd";
import PrimaryButton from "components/Buttons/PrimaryButton";
import MainSpinner from "components/Loading/Spinners/MainSpinner";

const ForgotPasswordForm = ({
  btnText = "",
  isLoadingAuth,
  onFinish = () => {},
}) => {
  return (
    <>
      <Form onFinish={onFinish} size="large">
        <Form.Item
          hasFeedback
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input allowClear placeholder="Введите ваш емейл" />
        </Form.Item>
        <Form.Item>
          <MainSpinner spinning={isLoadingAuth}>
            <PrimaryButton btnText={btnText} />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
