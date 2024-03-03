import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employee: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isLoggedIn: false
  // dbSyncStatus: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
  // dbSyncError: null
};

const url="https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee"
export const fetchEmployee = createAsyncThunk("empFetch", async ()=> {
  const response = await axios.get(url)
  // console.log(response.data)
  return response.data
})

// export const syncToDatabase = createAsyncThunk("empSync", async ()=> {
//   const getRes=await axios.get(url)
//   getRes.data.map(async (i)=>{
//       await axios.delete('https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee/'+i.id)
//   })

//   return 'success'
// })

export const EmpReducer = createSlice({
  name: "Reducer For Employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      console.log(action.payload.file.name)
      const tempEmp = {
        id: nanoid(),
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        salary: action.payload.salary,
        designation: action.payload.designation,
        address: action.payload.address,
        file: URL.createObjectURL(action.payload.file),
        fileName: action.payload.file.name
      };
      state.employee.push(tempEmp);
    },

    dropEmployee: (state, action) => {
      state.employee = state.employee.filter((e) => e.id != action.payload);
    },

    editEmployee: (state, action) => {
      const i = state.employee.indexOf(state.employee.find((emp) => { return emp.id === action.payload.id }))
      state.employee.splice(i, 1, action.payload)
    },

    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchEmployee.pending, (state) =>{
        state.status = 'loading'
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.employee = action.payload
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // .addCase(syncToDatabase.pending, (state) =>{
      //   state.dbSyncStatus = 'loading'
      // })
      // .addCase(syncToDatabase.fulfilled, (state) => {
      //   state.employee.map( (i)=>{
      //     axios.post('https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee',i)
      //   })
      //   state.dbSyncStatus = 'succeeded'
      // })
      // .addCase(syncToDatabase.rejected, (state, action) => {
      //   state.dbSyncStatus = 'failed'
      //   state.dbSyncError = action.error.message
      // })
  }
});

export const StoreEmp = (store) => store.employee
export const LoggedInStatus = (store) => store.isLoggedIn
export const StoreStatus = (store) => store.status
export const StoreError = (store) => store.error

// export const DbSyncStatus = (store) => store.dbSyncStatus
// export const DbSyncError = (store) => store.dbSyncError
export const { addEmployee, dropEmployee, editEmployee, setLoggedIn } = EmpReducer.actions;
