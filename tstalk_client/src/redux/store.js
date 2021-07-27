//redux处理中心

import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'    //异步处理模块
import {composeWithDevTools} from 'redux-devtools-extension'



import reducers from './reducers'

//暴露store对象
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))