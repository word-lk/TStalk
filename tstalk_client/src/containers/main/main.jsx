//主界面组件
import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  //操作前端cookie的对象
import {NavBar} from 'antd-mobile'

import TeacherInfo from '../teacher-info/teacher-info'
import StudentInfo from '../student-info/student-info'
import Student from '../student/student'
import Teacher from '../teacher/teacher'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/notfound'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import './main.css'
 class  Main extends Component {
    


    // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/teacher', // 路由路径
      component: Teacher,
      title: '学生列表',
      icon: 'student',
      text: '学生',
    },
    {
      path: '/student', // 路由路径
      component: Student,
      title: '教师列表',
      icon: 'teacher',
      text: '教师',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
    componentDidMount(){
        //cookie中有userid，但是rudux中无数据，发送请求
        const userid=Cookies.get('userid')
        const {_id}=this.props.user
        if(userid&&!_id){
            //发送异步请求
            this.props.getUser()
        }
    }
    render() {

        //读取cookie中的用户id
        const userid=Cookies.get('userid')
        //如果没有，自动重定向到登录界面
        if(!userid){
            return <Redirect to ='/login'/>
        }
        //如果有，读取redux中的user状态
        const {user,unReadCount}=this.props
        //如果redux没有_id,没有信息，不显示，正在请求服务器
        if(!user._id){
            return null
        }else{
            let  path=this.props.location.pathname
            if(path==='/'){
                path=getRedirectTo(user.type,user.header)
                return <Redirect to ={path}/>
            }
        }
        const {navList} = this
        const path = this.props.location.pathname // 请求的路径
        const currentNav = navList.find(nav=> nav.path===path) // 得到当前的nav, 可能没有
        if(currentNav) {
            // 决定哪个路由需要隐藏
            if(user.type==='teacher') {
              // 隐藏数组的第2个
              navList[1].hide = true
            } else {
              // 隐藏数组的第1个
              navList[0].hide = true
            }
          }

        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                {
                    navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                }
                    <Route path='/teacherinfo' component={TeacherInfo}></Route>
                    <Route path='/studentinfo' component={StudentInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter className='am-tab-bar' navList={navList} unReadCount={unReadCount}/> : null}
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {getUser}
)(Main)
