/**
 * 用户头像的UI组件
 */

import React, { Component } from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'


export default class HeaderSeleter extends Component {
  //准备显示的列表数据
  constructor(props) {
    super(props)
    // 准备需要显示的列表数据
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: '头像'+(i+1),
        icon: require(`../../assets/images/头像${i+1}.png`).default // 不能使用import
      })
    }
  }  
  
  //限制传入的参数
    static propTypes={  
     setHeader:PropTypes.func.isRequired
   } 

   state={
     icon:null  //已选中的图片对象
   }
   //传入一个e对象，解构出text和icon，根据antd-mobil的eapi
   handleClick=({text,icon})=>{
     this.setState({icon})
     this.props.setHeader(text)
   }
  


    render() {
        //头部界面
        const {icon} = this.state
        const listHeader=!icon?'请选择头像':(
          <div>
            已选择头像:<img src={icon} alt='头像图片'></img>
          </div>
        )
        return (
            <List renderHeader={()=>listHeader}>
                <Grid data={this.headerList} 
                columnNum={5}
                onClick={this.handleClick}
                ></Grid>
            </List>
        )
    }
}
