

import {  createSlice } from "@reduxjs/toolkit"


/// using redux slice
let lastid = 0;
const projectslice = createSlice({
    name:'projects',
    initialState:[],
    reducers:{

        //actions=>action handlers
        projectAdded:(project,action)=>{
            project.push({ id:++lastid,
                           name:action.payload.name,})          
        },
       
    }
})
console.log(projectslice)

export default projectslice.reducer;
export const {projectAdded} = projectslice.actions;
