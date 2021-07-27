/**
 * 发送ajax请求的模块
 * 函数的返回值是promise对象
 */
import axios from 'axios'

export default function ajax(url,data={},type='GET'){
    if(type==='GET'){//将data中的键值对拼接到URL中
        let paramStr=''
        Object.keys(data).forEach(key=>{      //此方法可得到对象内部所有的key
            paramStr+=key+'='+data[key]+'&'
        })   
        if(paramStr){
            paramStr=paramStr.substring(0,paramStr.length-1)
        }
        //实验axios发送请求    
        return axios.get(url+'?'+paramStr)
    }else{//post请求
        return axios.post(url,data)
    }
    
}