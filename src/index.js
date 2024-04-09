import configureStore from "./store/configureStore";
import {bugAdded,bugRemoved,bugResolved, getUnResolvedBugsSelector} from "./store/bugs";
import {projectAdded} from './store/projects'

const store = configureStore();
console.log(store)
const unsubscribe = store.subscribe(()=>{
    console.log("store changed", store.getState());
})

store.dispatch(bugAdded({description:"Adding Bug"}))
store.dispatch(bugAdded({description:"Adding Bug"}))
store.dispatch(bugAdded({description:"Adding Bug"}))

// unsubscribe();

// store.dispatch(bugRemoved("Removed Bug"))


store.dispatch(bugResolved({id:1}))
// store.dispatch(bugRemoved({id:1}))
store.dispatch(projectAdded({name:'Rekha'}))

const x = getUnResolvedBugsSelector(store.getState())
const y = getUnResolvedBugsSelector(store.getState())
console.log(x===y)