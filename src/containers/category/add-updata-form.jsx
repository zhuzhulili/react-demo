import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'


const {Item} = Form
@Form.create()
 class AddUpdataform extends Component {

  static propTypes ={
    setForm : PropTypes.func.isRequired 
    ,categoryName: PropTypes.string
  }
  constructor(props){
    super (props)
    this.props.setForm(this.props.form)
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
     <Form>
       <Item>
         {
           getFieldDecorator('categoryName',{
             initialValue : this.props.categoryName || '',
             rules:[
               {required:true,message:'分类名称必须输入'}
             ]
           }

           )(<Input placeholder='请输入分类名称'></Input>)
         }
        
       </Item>
     </Form>
    )
  }
}
export default AddUpdataform