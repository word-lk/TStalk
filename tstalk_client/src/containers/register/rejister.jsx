//注册路由组件
import React, { Component } from 'react'
import {
    NavBar ,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'     //antd样式
import {connect} from 'react-redux'
import {Redirect} from'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'  //页面小球
import './register.css'

const ListItem = List.Item
class rejister extends Component {
    state={
        username:'',
        password:'',
        password2:'',
        type:'student'
    }
    //注册调用容器传入的register
    register=()=>{
        this.props.register(this.state)          
    }

    //处理输入数据的改变，
    handleChange=(name,val)=>{
        //更新状态
        this.setState({
            [name]:val
        })
    }
    
    //进入注册页面
    toLogin=()=>{
        this.props.history.replace('/login')
    }

    render() {
        const {type}=this.state
        const {msg,redirectTo}=this.props.user
        if(redirectTo){  //有值则重定向到指定的路由
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>TStalk</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div>:null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val=>this.handleChange('username',val)}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='请输入密码' onChange={val=>this.handleChange('password',val)}>密码:</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='请输入密码' onChange={val=>this.handleChange('password2',val)}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='teacher'} onChange={()=>this.handleChange('type','teacher')}>老师</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='student'} onChange={()=>this.handleChange('type','student')}>学生</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),  //取出rudux维护的状态
    {register:register}   //向路由组件传递props，组件调用register可提交dispatch
)(rejister)