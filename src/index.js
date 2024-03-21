import store from "./store";
import { bugAdded,bugRemoved, bugResolved } from "./actions";

// const unsubscribe = store.subscribe(()=>{
//     console.log("store changed", store.getState());
// })

store.dispatch(bugAdded("Adding Bug"))



// unsubscribe();

// store.dispatch(bugRemoved("Removed Bug"))


console.log(store.getState())

store.dispatch(bugResolved(1))

console.log(store.getState())