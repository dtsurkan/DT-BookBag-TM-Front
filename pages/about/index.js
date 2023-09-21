import { useRouter } from "next/router";
import { PageHeader } from "antd";
import AppLayout from "components/AppLayout/AppLayout";
import ContentComponent from "components/AppLayout/ContentComponent";
// import Founders from "components/Sections/Founders";
import AboutBookBag from "components/Sections/AboutBookBag";

const About = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <ContentComponent
        styles={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PageHeader
          onBack={() => router.push("/")}
          title="Назад"
          style={{ padding: "0" }}
        />
        <AboutBookBag />
        {/* <Founders /> */}
      </ContentComponent>
    </AppLayout>
  );
};

export default About;
