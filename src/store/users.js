

import {  createSlice } from "@reduxjs/toolkit"


/// using redux slice
let lastid = 0;
const slice = createSlice({
    name:'users',
    initialState:[],
    reducers:{

        //actions=>action handlers
        userAdded:(user,action)=>{
            user.push({ id:++lastid,
                           name:action.payload.name,})          
        },
       
    }
})


export default slice.reducer;
export const {userAdded} = slice.actions;
