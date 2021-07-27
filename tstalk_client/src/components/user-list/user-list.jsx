/*
显示指定用户列表的UI组件
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render () {
    const {userList} = this.props

    return (
      <WingBlank style={{marginBottom:50, marginTop:50}}>
          <QueueAnim type='scale'>
          {
            userList.map(user => (
              <div key={user._id}>
                <WhiteSpace/>
                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                  <Header
                    thumb={require(`../../assets/images/${user.header}.png`).default}
                    extra={user.username}
                  />
                  <Body>
                  <div>职称: {user.post}</div>
                  {user.major ? <div>专业: {user.major}</div> : null}
                  {user.record ? <div>招生: {user.record}人</div> : null}
                  <div>描述: {user.info}</div>
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>  
      </WingBlank>
    )
  }
}

export default withRouter(UserList)