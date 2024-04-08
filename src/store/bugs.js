

import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"


/// using redux slice
let lastid = 0;
const slice = createSlice({
    name:'bugs',
    initialState:[],
    reducers:{

        //actions=>action handlers
        bugAdded:(bugs,action)=>{
            bugs.push({ id:++lastid,
                        description:action.payload.description,
                        resolved:false, })          
        },
        bugResolved:(bugs,action)=>{
            const index= bugs.findIndex(bug => bug.id===action.payload.id)
            bugs[index].resolved=true;
        },
        bugRemoved:(bugs,action)=>{
            return bugs.filter(bug => bug.id !== action.payload.id)
        }
    }
})

console.log(slice)

export default slice.reducer;
export const {bugAdded,bugResolved,bugRemoved} = slice.actions;

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

