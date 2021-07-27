/**
 * 学生信息完善的容器组件
 */

 import React, { Component } from 'react'
 import {connect} from 'react-redux'
 import {Redirect} from 'react-router-dom'
 import {NavBar,InputItem,Button,TextareaItem} from 'antd-mobile'
 import HeaderSeleter from '../../components/head-selector/head-selector'
 
 import {updateUser} from '../../redux/actions'
 class StudentInfo extends Component {

    state={
        header: '', // 头像名称
        major: '', // 专业名称
        info: '', // 简历
    }
    
    //保存输入状态
    handleChange=(name,value)=>{  
        this.setState({
            [name]:value
        })
    }

    //设置头像状态
    setHeader=(header)=>{
        this.setState({
            header:header
        })
    }
    
    save=()=>{
        this.props.updateUser(this.state)
    }
     render() {
        const {header,type}=this.props.user
        if(header){  //说明信息已经完善,重定向
            const path = type=== 'student'?'/student':'/teacher'
            return <Redirect to={path}/>
        }
         return (
             <div>
                 <NavBar>学生信息完善</NavBar>
                 <HeaderSeleter setHeader={this.setHeader}/>
                 <InputItem placeholder='请输入所在专业' onBlur={val=>{this.handleChange('major',val)}}>所在专业:</InputItem>
                 <TextareaItem title='个人成就:'
                              rows={3} onBlur={val=>{this.handleChange('info',val)}}/>   
                 <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;存</Button>
             </div>
         )
     }
 }

export default connect(
    state=>({user:state.user}),
    {updateUser}
)(StudentInfo)