import axios from 'axios'
import React from 'react'
function TodoItem1(props) {
        return(
            <div>
                <p>
                    <span style={{fontWeight:'bold,underline'}}>{props.todo.title} : </span> {props.todo.description}
                </p>
            </div>
        )
    
}
export default TodoItem1;