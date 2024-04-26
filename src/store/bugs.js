

import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import { createSelector } from 'reselect'
import { apiCallBegan } from "./api";
import moment from "moment";

/// using redux slice
let lastid = 0; //added by server itself
const slice = createSlice({
    name:'bugs',
    initialState:{
        list:[],
        loading:false,
        lastFetch:null
    },
    reducers:{

        //actions=>action handlers
        bugsRequested:(bugs,action)=>{
            bugs.loading=true;
        },
        bugsReceived:(bugs,action)=>{
            bugs.list=action.payload;
            bugs.loading=false;
            bugs.lastFetch=Date.now();
        },
        bugsRequestFailed:(bugs,action)=>{
            bugs.loading=false;
        },
        bugAdded:(bugs,action)=>{
            bugs.list.push(action.payload)     
        },
        bugResolved:(bugs,action)=>{
            const index= bugs.list.findIndex(bug => bug.id===action.payload.id)
            bugs.list[index].resolved=true;
        },
        bugRemoved:(bugs,action)=>{
            return bugs.list.filter(bug => bug.id !== action.payload.id)
        },
        bugAssignedToUser:(bugs,action)=>{
            const { bugId, userId } = action.payload;
            const index= bugs.list.findIndex(bug => bug.id===bugId)
            bugs.list[index].userid = userId;
        }
    }
})



export default slice.reducer;
const {bugAdded,bugResolved,bugRemoved, bugAssignedToUser,bugsReceived, bugsRequested, bugsRequestFailed} = slice.actions;

// action creator for apiCallbegan (getting data from server and putting in store)

// we are rewriting this to return a function instead of a object so that we can get the current state
// with thunk we can return a function which has getstate and dispatch received as argument from the thunk middleware function

const url = '/bugs'

export const loadbugs = () => (dispatch, getState) =>{
const {lastFetch} = getState().entities.bugs;

const DiffInMinutes = moment().diff(moment(lastFetch),"minutes");

if (DiffInMinutes < 10) return;
    // here we need to explicitly call dispatch. 
    //because we are not returning object that the dispatch in index.js can handle
    dispatch(apiCallBegan({
        url,
        onStart:bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError:bugsRequestFailed.type
    }))
}


// action creator for apiCallbegan (sending data to server from store)

export const addbug = (bug) =>{
    return apiCallBegan({
        url,
        data:bug,
        method:'POST',
        onSuccess: bugAdded.type,
    })

}

// resolve a bug and send data to server

export const resolvebug = (id) =>{
    return apiCallBegan({
        url:url + '/' + id,
        data:{resolved:true},
        method:'PATCH',
        onSuccess: bugResolved.type,
    })

}

// resolve a bug and send data to server

export const assignbug  = (bugId,userid) =>{
    return apiCallBegan({
        url:url + '/' + bugId,
        data:{userId:userid},
        method:'PATCH',
        onSuccess: bugResolved.type,
    })

}

// const url = '/bugs'
// export const loadbugs = () => apiCallBegan({
//     url,
//     onStart:bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError:bugsRequestFailed.type
// })

// we are seperating it from the ui layer (index.js)



// selector function

// export const getUnResolvedBugsSelector= (state) => state.entities.bugs.filter(bug=>!bug.resolved)

// memoizing selectors using createSelector(this will return a function) from reselect

// bugs => get unresolved bugs from cache

export const getUnResolvedBugsSelector= createSelector(
    state=>state.entities.bugs,
    bugs=>bugs.list.filter(bug=>!bug.resolved)
)

// bugs => get bugs by userid
export const getBugsbyUserSelector = (userId) =>createSelector(
    state=>state.entities.bugs,
    bugs=>bugs.list.filter(bug=>bug.userid === userId)
)

// // action with redux toolkit
// export const bugAdded = createAction("bugadded");
// export const bugRemoved = createAction("bugremoved");
// export const bugResolved = createAction("bugresolved");

// //reducer with reduxtoolkit
// let lastid = 0;
// export default createReducer( [] , (builder)=>{
//     builder
//     .addCase( bugAdded , (bugs,action) => {
//         bugs.push({ id:++lastid,
//                     description:action.payload.description,
//                     resolved:false, })
//     })
///we can also use addCAse here
//     .addMatcher((action) => action.type.endsWith('resolved') , (bugs,action) => {
//         const index= bugs.findIndex(bug => bug.id===action.payload.id)
//         bugs[index].resolved=true;
//     })
//we can also use addCAse here
//     .addMatcher((action) => action.type.endsWith('removed') , (bugs,action) => {
//         return bugs.filter(bug => bug.id !== action.payload.id)
//     })
//     .addDefaultCase((state, action) => state);
// });

// // createReducer outdated

// let lastid = 0;
// export default createReducer([],{

//     //key:value
//     //action:function (event => eventhandler)
// here we are using [] as bugAdded is an object, so we use the computed property syntax to get the type of action
//     [bugAdded.type]: (bugs,action)=>{
//         bugs.push({ id:++lastid,
//                      description:action.payload.description,
//                      resolved:false, })
//     },
//     [bugResolved.type]: (bugs,action)=>{
//         const index= bugs.findIndex(bug => bug.id===action.payload.id)
//         bugs[index.resolved]=true;
//     },
//     [bugRemoved.type]: (bugs,action)=>{
//         bugs.filter(bug => bug.id !== action.payload.id)
//     },
    
// })

// action with redux
// /// action types  /////


//  const BUG_ADDED = "bugadded"
//  const BUG_REMOVED = "bugremoved"
//  const BUG_RESOLVED = "bugresolved"

// /// actions  ///////

//      // using arrow function
// export const bugAdded = (description) => ({
//     type:BUG_ADDED,
//         payload:{
//             description,
//         }
// })

// export const bugRemoved = (id) => ({
//     type:BUG_REMOVED,
//         payload:{
//             id,
//         }
// })

// export const bugResolved = (id) => ({
//     type:BUG_RESOLVED,
//         payload:{
//             id,
//         }
// })

// //using traditional function

// // export function bugAdded(description){
// //     return {
// //         type:actions.BUG_ADDED,
// //         payload:{
// //             description,
// //         }
// //     }
// // }
// // export function bugRemoved(id){
// //     return {
// //         type:actions.BUG_ADDED,
// //         payload:{
// //             id,
// //         }
// //     }
// // }


// ////// reducer with redux  //////// reducer should be default export

// let lastid = 0;

// export default function reducer(state = [],action){
//     if(action.type===bugAdded.type){
//         return [
//             ...state,
//             {
//                 id:++lastid,
//                 description:action.payload.description,
//                 resolved:false,
//             }
//         ]
//     }
//     else if(action.type===bugRemoved.type){
//         return state.filter( bug => bug.id !== action.payload.id)
//     }
//     else if(action.type===bugResolved.type){
//         return state.map( bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
//     }
//     return state;
// }

