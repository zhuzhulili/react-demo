import React, { Component } from 'react'
import {Menu,Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import { connect} from "react-redux";

import './index.less'
import {setHeaderTitle} from "../../../redux/action-creators/header-title";
import logo from '../../../assets/images/logo.png'
import menuList from '../../../config/menu-config'
const { SubMenu, Item } = Menu
@connect(state=>({headerTitle: state.headerTitle}),
  {setHeaderTitle}
)
@withRouter
 class LeftNav extends Component {
  getMenuNodes_reduce=(menuList)=>{
    const path = this.props.location.pathname
    return menuList.map(item=>{
       if(!item.children){

        if (path.indexOf(item.key)===0&&this.props.headerTitle!==item.title) {
          this.props.setHeaderTitle(item.title)
        }
         return(
          <Item key={item.key}>
          <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Item>
         )
       }else{
         if(item.children.some(item=>path.indexOf(item.key)===0)){
           this.openKey=item.key
         }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
          </SubMenu>
        )
       }
    })
  }
  render() {
    const menuNodes = this.getMenuNodes_reduce(menuList)

    let selectedKey=this.props.location.pathname
       if(selectedKey.indexOf('/product/')===0){
        selectedKey='/product'
       }
    const openKey = this.openKey
    
    return (
      <div className='left-nav'>
        <div className='left-nav-header'>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
        >
          {menuNodes}
         
        </Menu>
      </div>
    )
  }
}
export default LeftNav