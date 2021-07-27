/**
 * 教师信息完善
 */


import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import HeaderSeleter from '../../components/head-selector/head-selector'

import {updateUser} from '../../redux/actions'
class TeacherInfo extends Component {


    state={
        header: '', // 头像名称
        post:'', // 当前职称
        major: '', // 专业名称
        record: '', // 招生人数
        info: '', // 招生要求
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
            const path = type=== 'teacher'?'/teacher':'/student'
            return <Redirect to={path}/>
        }

        return (
            <div>
                <NavBar>老师信息完善</NavBar>
                <HeaderSeleter setHeader={this.setHeader}/>
                <InputItem placeholder='请输入所处的职务' onBlur={val=>{this.handleChange('post',val)}}>当前职称:</InputItem>
                <InputItem placeholder='请输入任课的专业' onBlur={val=>{this.handleChange('major',val)}}>专业名称:</InputItem>
                <InputItem placeholder='请输入收取学生的人数'onBlur={val=>{this.handleChange('record',val)}}>招生人数:</InputItem>
                <TextareaItem title='成就要求:'
                              rows={3} onBlur={val=>{this.handleChange('info',val)}}/>     
                <Button type='primary' onClick={this.save}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {updateUser}
)(TeacherInfo)
