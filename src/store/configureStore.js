// code using redux toolkit
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger';
import func from './middleware/func';
import toast from './middleware/toast';
import api from './middleware/api'

export default function () {
    return configureStore({
        reducer,
        //includes default middlewares like thunk etc of redux toolkit
        //thunk helps us to pass a function to dispatch instead of a plain js object(action)
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger({destination:"console"}),toast,api),
        // //excludes default middleware
        // middleware:() =>[logger({destination:"console"}),func]
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