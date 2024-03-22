import configureStore from "./store/configureStore";
import {bugAdded,bugRemoved,bugResolved} from "./store/bugs";

const store = configureStore();
const unsubscribe = store.subscribe(()=>{
    console.log("store changed", store.getState());
})

store.dispatch(bugAdded("Adding Bug"))

// unsubscribe();

// store.dispatch(bugRemoved("Removed Bug"))


console.log(store.getState())

store.dispatch(bugResolved(1))

console.log(store.getState())