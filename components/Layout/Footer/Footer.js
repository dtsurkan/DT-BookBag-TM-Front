import { useRouter } from 'next/router';
import { Col, List, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { Footer } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import PageHeaderLogo from 'components/Layout/PageHeaderLogo';
import { FOOTER_CONTACTS_LIST, FOOTER_LINKS_LIST } from 'utils/constants';

const FooterComponent = () => {
  const router = useRouter();
  const screens = useBreakpoint();
  const getYear = () => new Date().getFullYear();

  return (
    <Footer style={{ background: 'transparent', padding: '50px 0' }} data-aos="fade-up">
      <Row align="middle">
        <Col xs={24} lg={16}>
          <PageHeaderLogo style={{ padding: '16px 0' }} />
          {screens.lg && <Text>BookBag &copy; {getYear()}</Text>}
        </Col>
        <Col
          xs={24}
          lg={8}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            // alignItems: 'center',
          }}
        >
          <List
            split={false}
            size="large"
            dataSource={FOOTER_LINKS_LIST}
            renderItem={({ title, icon, href }) => (
              <List.Item style={{ padding: '8px 0' }}>
                <PrimaryButton
                  size="middle"
                  type="link"
                  isBlock={false}
                  btnText={title}
                  icon={icon}
                  style={{ padding: 0 }}
                  onClick={() => router.push(href)}
                />
              </List.Item>
            )}
          />
          <List
            split={false}
            size="large"
            dataSource={FOOTER_CONTACTS_LIST}
            renderItem={({ title, icon, href }) => (
              <List.Item style={{ padding: '8px 0' }}>
                <PrimaryButton
                  size="middle"
                  type="link"
                  isBlock={false}
                  btnText={title}
                  icon={icon}
                  style={{ padding: 0 }}
                  onClick={() => router.push(href)}
                />
              </List.Item>
            )}
          />
          {!screens.lg && (
            <Text style={{ width: '100%', marginTop: '16px' }}>BookBag &copy; {getYear()}</Text>
          )}
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
