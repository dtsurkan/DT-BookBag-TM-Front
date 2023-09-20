import { useSelector } from "react-redux";
import { Form, Input } from "antd";
import PrimaryButton from "components/Buttons/PrimaryButton";
import MainSpinner from "components/Loading/Spinners/MainSpinner";

const ForgotPasswordForm = ({ onFinish = () => {} }) => {
  const { isLoadingResetPassword } = useSelector((state) => state.user);

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
          <MainSpinner spinning={isLoadingResetPassword}>
            <PrimaryButton btnText="Отправить емейл" />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
