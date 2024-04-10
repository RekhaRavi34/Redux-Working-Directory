// code using redux toolkit
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger';

export default function () {
    return configureStore({
        reducer,
        //includes default middleware of redux toolkit
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger({destination:"console"})),
        // //excludes default middleware
        // middleware:() =>[logger]
    });
    
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