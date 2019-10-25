import React, { Component } from 'react'
import { Form,Icon,Input,Button } from "antd";
import qs from 'qs'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import logo from "./images/logo.png";
import './index.less';
import {loginAsync} from '../../redux/action-creators/user'
import WithCheckLogin from "../with-check-login";
 @connect(
   state=>({}),
   {loginAsync}
 )
 @Form.create()
 @WithCheckLogin
 class Login extends Component {
  validatepwd=(rule, value, callback)=>{
    if(value===''){
      callback('密码必须输入')
    }else if(value.length<4){
      callback('密码必须大于4位')
    }else if(value.length>12){
      callback('密码必须小于12位')
    }else if(!/^[a-zA-Z0-9]+$/.test(value)){
       callback('密码必须是字母,数字,下划线组成')
    }
    else{
      callback()
    }
  }  

// ajax

  handleSubmit=(event)=>{
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {username,password}= values
        console.log('发送Ajax请求! ', username,password);
        this.props.loginAsync(username,password)
         
      }else{

      }
    });
  }
  render() {
    
     
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
          <header className='login-header'>
            <img src={logo} alt="logo"/>
            <h1>后台管理系统</h1>
          </header>
          <div className='login-content'>
            <h1>用户登录</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue:'',
            rules: [
              { required: true,whitespace:true, message: '账号必须输入' },
              {max:12,message:'账号不得大于12位'},
              {min:4,message:'账号不得少于4位'},
              {pattern:/^[a-zA-Z0-9_]+$/,message:'账号必须是字母,数字,下划线组成'}
            ]})(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="账号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
             initialValue:'',
            rules: [
              {validator:this.validatepwd}],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
       
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        
      </Form>
          </div>
      </div>
    )
  }
}
export default Login 