import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from './UserContext';
import './TodoList.css';

const TodoItem = ({ task, toggleTask, deleteTask }) => {
    return (
        <div className="todo-item">
            {false ? (<div>Hello</div>) : (<div>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? 'completed' : ''}>
                    {task.text}
                </span>
                <div className="todo-actions">
                    <button className="delete-btn" onClick={() => deleteTask(task.id)} >x</button>
                </div>
            </div>)}

        </div>
    );
};
function generateId() {
    return crypto.randomUUID();
}

const TodoList = () => {
    const { userId } = useParams();
    const { usersData, updateUserTasks, handleDelete } = useUserContext();
    const user = usersData[userId];
    
    // const [tasks, setTasks] = useState([
    //     { id: 1, text: 'Car wash', completed: false }
    // ]);
    const [tasks, setTasks] = useState(user?.tasks || []);
    const [newTask, setNewTask] = useState('');
    const [completedTasks, setCompletedTasks] = useState(1)



    function handleSubmit(e) {
        e.preventDefault();
        console.log(user);
        if (newTask.trim() !== "") {
            setTasks([
                ...tasks, {
                    id: generateId(),
                    text: newTask.trim(),
                    completed: false
                }
            ]);
        }

        setNewTask('');
    }




    function handleToggle(id) {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        setTasks(newTasks);
    }
    function handleDelete(id) {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }
    function deleteCompletedTasks() {
        console.log(tasks)
        console.log("inside completed function ")
        const newTasks = tasks.filter(task => task.completed == false);
        setTasks(newTasks);
    }
    useEffect(() => {
        console.log("tasks update")
        setCompletedTasks(tasks.filter(task => task.completed == true).length)
        console.log(completedTasks)
    }, [tasks]);


    return (
        <div className="app-container">
            <div className="todo-container">
                <h1>TODOLIST</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        type='text' placeholder='hehe you again ...'
                    />
                    <button type='submit'>+</button>
                </form>
                <div className='todo-list'>
                    {tasks.map((task, index) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            toggleTask={handleToggle}
                            deleteTask={handleDelete}
                        />
                    ))}

                    <div className="task-counter">
                        <span>
                            {completedTasks} of {tasks.length} tasks done
                        </span>
                        <button onClick={deleteCompletedTasks} className="remove-checked-btn">
                            Remove Checked<span>X</span>
                        </button>
                    </div>
                </div>
                <div>

                </div>

            </div>
        </div>
    );
};

export default TodoList;