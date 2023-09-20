import { Spin } from "antd";

const MainSpinner = ({
  children,
  spinning = false,
  size = "large",
  tip = "",
  delay,
  indicator,
}) => {
  return (
    <Spin spinning={spinning} size={size} tip={tip}>
      {children}
    </Spin>
  );
};

export default MainSpinner;
