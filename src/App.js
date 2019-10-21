import React, { Component } from 'react'
import { message} from "antd";
import { Route,HashRouter,Switch } from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
export default class App extends Component {
  handleClick=()=>{
    message.success('成功啦...');
  }
  render() {
    return (
     
         <HashRouter>
           <Switch>
             <Route path='/' component={Login}/>
             <Route path='/admin' component={Admin}/>
           </Switch>
         </HashRouter>
    
    )
  }
}

