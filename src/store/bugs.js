/// action types  //////

 const BUG_ADDED = "bugadded"
 const BUG_REMOVED = "bugremoved"
 const BUG_RESOLVED = "bugresolved"

/// actions  ///////

     // using arrow function
export const bugAdded = (description) => ({
    type:BUG_ADDED,
        payload:{
            description,
        }
})

export const bugRemoved = (id) => ({
    type:BUG_REMOVED,
        payload:{
            id,
        }
})

export const bugResolved = (id) => ({
    type:BUG_RESOLVED,
        payload:{
            id,
        }
})

//using traditional function

// export function bugAdded(description){
//     return {
//         type:actions.BUG_ADDED,
//         payload:{
//             description,
//         }
//     }
// }
// export function bugRemoved(id){
//     return {
//         type:actions.BUG_ADDED,
//         payload:{
//             id,
//         }
//     }
// }


////// reducer   //////// reducer should be default export

let lastid = 0;

export default function reducer(state = [],action){
    if(action.type===BUG_ADDED){
        return [
            ...state,
            {
                id:++lastid,
                description:action.payload.description,
                resolved:false,
            }
        ]
    }
    else if(action.type===BUG_REMOVED){
        return state.filter( bug => bug.id !== action.payload.id)
    }
    else if(action.type===BUG_RESOLVED){
        return state.map( bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
    }
    return state;
}