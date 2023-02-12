import {useReducer , createContext } from 'react'
import TodoReducer from '../Reducer/Todo.Reducer'

export const TodoContext = createContext({
    state:[] , dispatch:()=>{}
})

const TodoProvider = ({children})=>{
    const[state , dispatch] = useReducer(TodoReducer , [])

    return(
        <TodoContext.Provider value={{state , dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider