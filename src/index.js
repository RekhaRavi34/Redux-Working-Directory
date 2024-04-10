import configureStore from "./store/configureStore";
import {bugAdded,bugRemoved,bugResolved,bugAssignedToUser, getUnResolvedBugsSelector, getBugsbyUserSelector } from "./store/bugs";
import {projectAdded} from './store/projects'
import { userAdded } from "./store/users";

const store = configureStore();

//To demonstrate middleware usage
 // call an api
 // if promise is resolved => dispatch()
 // if promise is rejected => dispatch()
 //thunk helps us to pass a function to dispatch instead of a plain js object(action)
//  store.dispatch((dispatch,getState)=>{
//     dispatch({type:"bugadded", bugs:[1,2,3]})
//  })
//exercise
 store.dispatch({
    type:"error",
    payload:{
        message:'An error occurred'
    }
 })

// console.log(store)
// const unsubscribe = store.subscribe(()=>{
//     console.log("store changed", store.getState());
// })


// store.dispatch(userAdded({name:'Rekha'}))

// store.dispatch(userAdded({name:'Nirisha'}))

// store.dispatch(projectAdded({name:'Project 1'}))

// store.dispatch(bugAdded({description:"Adding Bug"}))
// store.dispatch(bugAdded({description:"Adding Bug"}))
// store.dispatch(bugAdded({description:"Adding Bug"}))

// store.dispatch(bugAssignedToUser({ bugId:1 ,userId:1, }))
// // unsubscribe();

// // store.dispatch(bugRemoved("Removed Bug"))


// store.dispatch(bugResolved({id:1}))
// // store.dispatch(bugRemoved({id:1}))


// const getunresolvedbugs = getUnResolvedBugsSelector(store.getState())
// const getbugsbyuser = getBugsbyUserSelector(1)(store.getState())
// console.log(getunresolvedbugs)
// console.log(getbugsbyuser)