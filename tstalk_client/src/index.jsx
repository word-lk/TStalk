import React from 'react' 
import ReactDOM from 'react-dom' 
import {HashRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux' //引入容器组件 用来包裹UI组件

import store from './redux/store'
import Register from './containers/register/rejister'
import Login  from './containers/login/login'
import Main from './containers/main/main'

import './assets/css/index.css'
//import './test/socketio_test'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route  component={Main}></Route>      {/* 所有其他模块的入口 */}
            </Switch>
        </HashRouter>
    </Provider>   
)
, document.getElementById('root') )