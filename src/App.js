import React, { Component } from 'react'
import { message} from "antd";
import { Route,HashRouter,Switch } from "react-router-dom";
import Login from './containers/login/login';
import Admin from "./containers/admin/admin";
export default class App extends Component {
  handleClick=()=>{
    message.success('成功啦...');
  }
  render() {
    return (
     
         <HashRouter>
           <Switch>
             <Route path='/login' component={Login}/>
             <Route path='/' component={Admin}/>
           </Switch>
         </HashRouter>
    
    )
  }
}

