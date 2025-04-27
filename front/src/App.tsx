import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { type Task } from './Api'
import classes from './App.module.scss'
import { useStore } from './TaskStore'


function App() {
  return (
    <div className={classes.App}>
      <h1>Список задач</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App


const TaskForm = () => {
  const { addTask } = useStore()
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)

  const onTitleChange = (e: any) => setTitle(e.currentTarget.value)
  const handleCheck = () => setCompleted(prev => !prev)

  const isDisabled = useMemo(() => {
    return !title.length
  }, [title])

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTask({ title, completed }).finally(() => {
      setTitle('')
      setCompleted(false)
    })
  }, [title, completed])

  return (
    <form
      className={classes.TaskForm}
      onSubmit={onSubmit}
    >
      <label htmlFor="title">
        <input
          name='title'
          placeholder='Название задачи'
          value={title}
          onChange={onTitleChange}
        />
      </label>
      <label htmlFor="completed">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheck}
        />
      </label>

      <button disabled={isDisabled}>
        Создать задачу
      </button>
    </form>
  )
}

const TaskList = () => {
  const { tasks, fetchTasks, loading, error } = useStore()

  useEffect(() => {
    fetchTasks()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  
  if (error) {
    return <div>Something went wrong...</div>
  }

  return <div className={classes.TaskList}>
    {tasks.map(v => <Task key={v.id} task={v} />
    )}
  </div>
}

const Task = memo((props: { task: Task }) => {
  const { changeTaskCompleted, deleteTask } = useStore()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => changeTaskCompleted({ ...props.task, completed: e.currentTarget.checked })
  const onDelete = useCallback(() => deleteTask(props.task.id), [props.task.id])


  return <div className={classes.Task}>
    <p>{props.task.title}</p>
    <input type="checkbox" checked={props.task.completed} onChange={onChange} />
    <button onClick={onDelete}>X</button>
  </div>
})