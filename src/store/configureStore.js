// code using redux toolkit
import { configureStore } from '@reduxjs/toolkit'
import reducer from './bugs'

export default function () {
    console.log(configureStore({reducer}));
    return configureStore({reducer});
    
}

//   redux store
// import { createStore } from "redux";
// import { devToolsEnhancer } from "@redux-devtools/extension";
// import reducer from './bugs'
// export default function configureStore(){
//     const store = createStore(reducer,
//         devToolsEnhancer({trace:true})) 
//         // this function returns a store enhancer function (so it also a HOC)
//         return store;

// // const store = createStore(reducer,
// //                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //HOF
// //                                                  // 2 args (reducer,store enhancer) 
// }