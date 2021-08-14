import ConfigProvider from 'antd/lib/config-provider';
import Layout from 'antd/lib/layout';
import React from 'react';
import Calculator from '~components/Calculator';

function App() {
    return (
        <ConfigProvider>
            <Layout className="app">
                <Layout.Content className="app-content">
                    <div className="container py-50">
                        <Calculator />
                    </div>
                </Layout.Content>
                <Layout.Footer className="app-footer">
                    Footer
                </Layout.Footer>
            </Layout>
        </ConfigProvider>
    )
}

export default App;
