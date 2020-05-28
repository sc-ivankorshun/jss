import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Layout, Row } from 'antd';
import MainNav from './Navigation/MainNav';
import SideNav from './Navigation/SideNav';
import Logo from './Logo';
const LayoutHeader = Layout.Header;

const Header = ({ routeData, route }) => (
  <LayoutHeader>
    <Row style={{backgroundColor: '#666'}}>
      <MainNav />
    </Row>
    <Row>
      {/* Top-level placeholder */}
      <Placeholder name="jssdocs-header" routeData={routeData} route={route} />
    </Row>
  </LayoutHeader>
);

export default Header;
