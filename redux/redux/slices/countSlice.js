import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'count',
    initialState: {
        count: 0,
    },
    reducers: {
        increaseCount: (state) => {
            state.count = state.count + 1
        },
        decreaseCount: (state) => {
            state.count = state.count - 1
        },
        resetCount: (state) => {
            state.count = 0
        }
    }
})

// function tangCount =()=>{setCount(prev=>prev-1)}
// function giamCount =()=>{setCount(prev=>prev+1)}
// giam : setCount(prev=>prev-1)
// tang : setCount(prev=>prev+1)

// export action
const actions = countSlice.actions;

const exportedAction = {
    increaseCount: actions.increaseCount,
    decreaseCount: actions.decreaseCount,
    resetCount: actions.resetCount,
};
export { exportedAction }

export default countSlice.reducer