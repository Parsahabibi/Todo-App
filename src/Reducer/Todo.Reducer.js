const TodoReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "AddTodo":
            return [...state, payload]
        case "DeleteTodo":
            return state.filter(item => item.id !== payload.id)
        case "UpdateTodo":
            return state.map(item => item.id === payload.id ? payload : item)
        case "CheckStatus":
            return state.filter(item => item.id === payload.id ? { ...item, status: !item.status } : item)
        default:
            return state
    }
}
export default TodoReducer