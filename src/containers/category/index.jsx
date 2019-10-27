import React, { Component } from 'react'
import {  Card,
          Button,
          Icon,
          Table,
          Modal,
          message } from "antd";
import {connect} from 'react-redux'

import LinkButton from '../../components/link-button'
import AddUpdataform from './add-updata-form'
import {getCategorysAsync,addCategorysAsync,updateCategorysAsync} from '../../redux/action-creators/categorys'

 @connect(
   state=>({categorys:state.categorys}),
   {getCategorysAsync,addCategorysAsync,updateCategorysAsync}
 )
 class Category extends Component {
  state = {
  
    loading:false,
    isShowAdd:false,
    isShowUpdata:false
  }
 columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 300,
      render: (category)=><LinkButton onClick={()=>{this.showUpdate(category)}}>修改分类</LinkButton>,
    }
  ]

  getCategorys=async ()=>{
    this.setState({
      loading: true
    })
     const msg = await this.props.getCategorysAsync()
     this.setState({
      loading: false
    })
     if(msg){
       message.error(msg)
     }
    }
 
  // 添加分类
  addCategory = () =>{
     this.form.validateFields( async (error,values)=>{
         if(!error){
          const {categoryName} = values
          const msg =  await this.props.addCategorysAsync(categoryName)

          if(msg){
            message.error(msg)
          }else{
            message.success('添加成功')
            this.setState({
              isShowAdd:false
            })
          }

         }
     } )
  }



  // 隐藏添加界面
  hideAdd = () =>{
    delete this.category
    this.form.resetFields()
    this.setState({
      isShowAdd:false
    })
  }
   componentDidMount(){
     this.getCategorys()
   }
   showUpdate= (category)=>{
      this.setState({
        isShowUpdata:true,
      })
      this.category=category
   }


   updataCategory=()=>{
    this.form.validateFields( async (error,values)=>{
      if(!error){
        const categoryId = this.category._id
        const {categoryName} = values
        const msg = await this.props.updateCategorysAsync ({categoryId,categoryName})
        // const result =  await reqUpadaCategory ({categoryId,categoryName})
        this.form.resetFields()

        if(msg){
          message.error(msg)
        }else{
           this.setState({
             isShowUpdata:false
           })
           message.success('更新分类成功')
        }
      }
  } )
   }
    
   hideupdata=()=>{
     this.form.resetFields()
     delete this.catecory 
      this.setState({
        isShowUpdata:false
      })
   }

  render() {
    const category = this.category ||{}
    const {categorys}= this.props
    const {loading,isShowUpdata,isShowAdd}= this.state
    const extra = (
      <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>
        <Icon type='plus'>
        </Icon>
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
        <Table
         dataSource={categorys} 
        columns={this.columns} 
        rowKey="_id"
        bordered
        loading={loading}
        pagination={{pageSize: 5,showQuickJumper:true}}
        >
        </Table>
        <Modal
          title="添加分类"
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.hideAdd} 
        >
         <AddUpdataform setForm={(form)=>{this.form=form}}/>
        </Modal>
        
        <Modal
          title="修改分类"
          visible={isShowUpdata}
          onOk={this.updataCategory}
          onCancel={this.hideupdata}
        >
         <AddUpdataform setForm={(form)=>{this.form=form}} categoryName={category.name}/>
        </Modal>
      </Card>
    )
  }
}

export default Category