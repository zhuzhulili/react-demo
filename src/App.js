import React, { Component } from 'react'
import { message} from "antd";
import { Route,Router,Switch } from "react-router-dom";
import Login from './containers/login';
import Admin from "./containers/admin";
import history from './history'
export default class App extends Component {
  handleClick=()=>{
    message.success('成功啦...');
  }
  render() {
    return (
     
         <Router history={history}>
           <Switch>
             <Route path='/login' component={Login}/>
             <Route path='/' component={Admin}/>
           </Switch>
         </Router>
    
    )
  }
}

