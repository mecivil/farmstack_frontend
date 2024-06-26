import TodoItem from "./Todo";
function TodoView(props) {
    const todoListArray=Array.from(props.todoList)
    return(
        <div>
            <ul>
                {todoListArray.map(todo => <TodoItem todo={todo}/>)}
            </ul>
        </div>
    )
}
export default TodoView;