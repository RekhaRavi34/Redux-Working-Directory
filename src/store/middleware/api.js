import axios from "axios";
import {apiCallBegan,apiCallFailed,apiCallSuccess} from '../api'

//action object format for api 
// const action = {
//     type:"bugsReceived",
//     payload:{
//         url:'/bugs',
//         method:'get',
//         data:{},
//         onSuccess:"bugReceived",
//         onError:"bugRequestFailed"
//     }
// }
const api = ({dispatch}) => next => async action =>{

    if(action.type !== apiCallBegan.type) return next(action);


    const {url,method,data, onStart, onSuccess,onError} = action.payload;

    if(onStart) dispatch({type:onStart});

    next(action);

    try{
        const response = await axios.request({
            baseURL:"http://localhost:9001/api",
            url,
            method,
            data,
        })
        //general
        dispatch(apiCallSuccess(response.data))
        //specific
        if(onSuccess) dispatch({ type:onSuccess, payload: response.data })
    }
    catch(error){
        //general
        dispatch(apiCallFailed(error.message))
        //specific
        if(onError)dispatch({type:onError, payload:error.message})
    }
}
export default api;