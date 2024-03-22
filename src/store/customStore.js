import reducer from "./reducer";

const createStore = (reducer) =>{
    let state;
    let listeners = [] //array of listener functions
    function getState(){
        return state;
    }
    function dispatch(action){
        state = reducer(state,action);
        for(let i=0; i<listeners.length; i++){
            listeners[i]();
        }
    }
    function subscribe(listener){
        listeners.push(listener)
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
export default createStore(reducer);