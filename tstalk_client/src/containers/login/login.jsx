//登录路由组件
import React, { Component } from 'react'
import {
    NavBar ,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'
import './login.css'

class Login extends Component {
    state={
        username:'',
        password:'',
        
    }
    login = () => {
        this.props.login(this.state)
      }

    //处理输入数据的改变，
    handleChange=(name,val)=>{
        //更新状态
        this.setState({
            [name]:val
        })
    }
    
    //进入注册页面
    toRegister=()=>{
        this.props.history.replace('/register')
    }

    render() {
        const {msg, redirectTo} = this.props.user
        // 如果redirectTo有值, 就需要重定向到指定的路由
        if(redirectTo) {
        return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>TStalk</NavBar>
                <Logo/>
                <div className='konghang'></div>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val=>this.handleChange('username',val)}>用户名:</InputItem>
                        <WhiteSpace/>                 
                        <InputItem type='password' placeholder='请输入密码' onChange={val=>this.handleChange('password',val)}>密码:</InputItem>                       
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>未有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {login}
  )(Login)