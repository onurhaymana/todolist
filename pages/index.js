import React, { useState, useEffect } from 'react';
import Head from 'next/head'

function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className="task"
            style={{color: task.completed ? "green" : "",  textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}

            <button style={{ background: "red" }} onClick={() => removeTask(index, task._id)}>x</button>
            <button onClick={() => completeTask(index, task._id)}>{task.completed ? "Completed" : "Uncompleted"}</button>
        </div>
    );
}

function GenerateTask({ createTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        createTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
                <button onClick={handleSubmit}>Create</button>
        </form>
    );
}

function Todo({ notes }) {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState(notes);

    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) });

    const createTask = async title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);

        try {
            const added = await fetch(`https://react-todo-app-getir.herokuapp.com/api/todos`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, completed:false, date:new Date()})
             
            })
           
        } catch (error) {
            console.log(error);
        }
    };

    const completeTask = async (index, id) => {
    
        const newTasks = [...tasks];

        if (newTasks[index].completed) {
            newTasks[index].completed = false;
            setTasks(newTasks);

            try {
                const uncomplated = await fetch(`https://react-todo-app-getir.herokuapp.com/api/todos/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({completed:false})
                 
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            newTasks[index].completed = true;
            setTasks(newTasks);

            try {
                const uncomplated = await fetch(`https://react-todo-app-getir.herokuapp.com/api/todos/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({completed:true})
                 
                })
            } catch (error) {
                console.log(error);
            }
        }
    };

    const removeTask = async (index, id )=> {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);

        try {
            const deleted = await fetch(`https://react-todo-app-getir.herokuapp.com/api/todos/${id}`, {
                method: "Delete"
            });

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
        <Head>
            <title>Built For Getir | Sample TO DO List</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="todo-container">
            <div className="header">{tasksRemaining ? "" : "No "}Pending tasks ({tasksRemaining ? tasksRemaining : "✅"})</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <GenerateTask createTask={createTask}  />
            </div>
        </div>
        </>
    );
}

Todo.getInitialProps = async () => {
    const res = await fetch('https://react-todo-app-getir.herokuapp.com/api/todos');
    const { data } = await res.json();
  
    return { notes: data }
  }

export default Todo;