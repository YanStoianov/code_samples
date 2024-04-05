import React from 'react';
import {Layout} from 'antd';
import {MainLayoutProps} from "./types";
import MainLayoutStyles from "./MainLayoutStyles";

const {Header, Content, Footer} = Layout;
const logo = require("../../assets/pokedex-icon.jpg")


const MainLayout = (props: MainLayoutProps) => {
    const {children} = props;

    return (
        <MainLayoutStyles>
            <Layout className={'main-layout'}>
                <Header className={'layout-header'}>
                    <img src={logo} alt="pokedex" className='layout-logo'/>
                    <h1 className={'layout-title'}>Pokedex</h1>
                </Header>
                <Content className={'layout-content'}>
                    {children}
                </Content>
                <Footer className={'layout-footer'}>©2022 Created by Vlad</Footer>
            </Layout>
        </MainLayoutStyles>
    )
};

export default MainLayout;