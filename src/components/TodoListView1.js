import TodoItem1 from "./Todo1";
function TodoView1(props) {
    const todoListArray=Array.from(props.todoList)
    return(
        <div>
            <ul>
                {todoListArray.map(todo => <TodoItem1 todo={todo}/>)}
            </ul>
        </div>
    )
}
export default TodoView1;