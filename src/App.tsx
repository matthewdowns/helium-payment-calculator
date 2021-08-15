import Icon from '@ant-design/icons';
import GithubOutlined from '@ant-design/icons/GithubOutlined';
import Card from 'antd/lib/card';
import ConfigProvider from 'antd/lib/config-provider';
import en_US from 'antd/lib/locale/en_US';
import Layout from 'antd/lib/layout';
import Space from 'antd/lib/space';
import Typography from 'antd/lib/typography';
import RcFooter from 'rc-footer';
import React from 'react';
import Calculator from '~components/Calculator';

function App() {
    return (
        <ConfigProvider locale={en_US}>
            <Layout className="app">
                <Layout.Content className="app-content">
                    <div className="container py-50">
                        <Calculator />
                    </div>
                </Layout.Content>
                <Layout.Footer className="app-footer">
                    <RcFooter
                        bottom={(
                            <Space direction="vertical">
                                <Card bordered={true} size="small" style={{ background: 'black', border: '1px solid #e9e9e9', borderRadius: '8px' }}>
                                    <Card.Meta
                                        title={<Typography.Text style={{ color: 'white' }}>Support the developer!</Typography.Text>}
                                        description={(
                                            <Typography.Text
                                                copyable={{
                                                    onCopy: () => '13ZVRpHV6a5Dwkyga8CMVWk3nWLeneMxXiDrz29xTuoYUetRK3N'
                                                }}
                                                style={{ color: 'white', textAlign: 'center' }}
                                                type="secondary"
                                            >
                                                <small>13ZVRpHV6a5Dwkyga8CMVWk3nWLeneMxXiDrz29xTuoYUetRK3N</small>
                                            </Typography.Text>
                                        )}
                                    />
                                </Card>
                            </Space>
                        )}
                        columnLayout="space-between"
                        columns={[
                            {
                                title: (
                                    <Space align="start" size={20}>
                                        <Icon
                                            component={() => (
                                                <svg
                                                    clipRule="evenodd"
                                                    fillRule="evenodd"
                                                    height={42}
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="2"
                                                    viewBox="130 50 300 300"
                                                    width={42}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="m122.2 50.2c5.6-5.6 14.8-5.6 20.4 0s5.6 14.8 0 20.4c-3.3 3.3-7.7 4.7-12.2 4.1h-.7c-1.3-.2-2.7 0-4.1.6-1.9.9-3.2 2.4-3.9 4.2s-.6 3.8.2 5.6c4.8 10.4 2.6 23-5.6 31.1-8.2 8.2-20.7 10.4-31.1 5.6-1.9-.9-3.9-.9-5.7-.2s-3.3 2-4.1 3.8c-.5 1.2-.8 2.4-.7 3.7v.7c.8 4.6-.8 9.3-4 12.6-5.6 5.6-14.8 5.6-20.4 0-2.7-2.7-4.2-6.3-4.2-10.2 0-3.8 1.5-7.5 4.2-10.2 3.3-3.3 7.7-4.7 12.2-4.1h.2c.5.1 1 .2 1.5.2 1.1 0 2.1-.2 3.1-.7 1.9-.9 3.2-2.4 3.8-4.1.7-1.8.7-3.9-.2-5.8-4.8-10.5-2.6-23 5.6-31.1 8.2-8.2 20.7-10.4 31.1-5.6 1.8.9 3.9.9 5.7.2s3.3-2 4.2-3.8c.7-1.4.8-3 .6-4.5-.7-4.5.8-9.2 4.1-12.5zm-14.3 57.6c6.2-6.2 6.2-16.3 0-22.6-6.2-6.2-16.3-6.2-22.6 0-6.2 6.2-6.2 16.3 0 22.6 6.3 6.2 16.4 6.2 22.6 0zm-11.4-107.8c53.3 0 96.5 43.2 96.5 96.5s-43.2 96.5-96.5 96.5-96.5-43.2-96.5-96.5 43.2-96.5 96.5-96.5zm51.4 76c8.5-8.5 8.5-22.3 0-30.9-8.5-8.5-22.3-8.5-30.9 0-3.2 3.2-5.1 7.1-6 11.1-15.5-5.8-33.2-2.1-45 9.7s-15.5 29.6-9.6 45.1c-4.1.8-8 2.8-11.2 6-8.5 8.5-8.5 22.3 0 30.9 8.5 8.5 22.3 8.5 30.9 0 3.2-3.2 5.2-7.2 6-11.3 4.8 1.8 9.8 2.7 14.8 2.7 11.1 0 22-4.3 30.1-12.4 11.8-11.8 15.5-29.4 9.8-44.8 4-1 7.9-3 11.1-6.1z"
                                                        fill="#474DFF"
                                                        fillRule="nonzero"
                                                        transform="matrix(1.5544 0 0 1.5544 130 50)"
                                                    />
                                                </svg>
                                            )}
                                            style={{ background: 'white', borderRadius: '8px', padding: '4px' }}
                                        />
                                        <Space direction="vertical" size={0}>
                                            <Typography.Text style={{ color: 'white' }}>Helium Payment Calculator</Typography.Text>
                                            <Typography.Text style={{ color: '#b9b9b9', fontSize: '0.875rem', fontWeight: 'normal' }}>&copy; Copyright {new Date().getFullYear()}, Matthew Downs</Typography.Text>
                                        </Space>
                                    </Space>
                                )
                            },
                            {
                                title: 'Helium',
                                items: [
                                    { title: 'Helium Website', openExternal: true, url: 'https://www.helium.com' },
                                    { title: 'Helium Explorer', openExternal: true, url: 'https://explorer.helium.com' },
                                    { title: 'Helium Mappers', openExternal: true, url: 'https://mappers.helium.com' },
                                    { title: 'Helium Cargo', openExternal: true, url: 'https://cargo.helium.com' }
                                ]
                            },
                            {
                                title: 'Resources',
                                items: [
                                    {
                                        icon: <GithubOutlined />,
                                        openExternal: true,
                                        title: 'GitHub',
                                        url: 'https://github.com/matthewdowns/helium-payment-calculator'
                                    }
                                ]
                            }
                        ]}
                        theme="dark"
                    />
                </Layout.Footer>
            </Layout>
        </ConfigProvider>
    )
}

export default App;
