import {useEffect,useRef,useState} from "react"
import TodoItem from "./TodoItem"
import todoIcon from "../assets/todo_icon.png"

const STORAGE_KEY = "todos"

const readTodos=()=>{
	try{
		const storedTodos=localStorage.getItem(STORAGE_KEY)
		return storedTodos?JSON.parse(storedTodos):[]
	}
	catch(error){
		console.error("Failed to read todos from localStorage.", error)
		return []
	}
}

const Todo=()=>{
	const inputRef=useRef(null)
	const [todoList,setTodoList]=useState(readTodos)

	const addTodo=()=>{
		const inputText=inputRef.current?.value.trim()
		if(!inputText){
			return
		}

		setTodoList((prevTodos)=>[
			...prevTodos,
			{
				id: Date.now(),
				text: inputText,
				isComplete: false,
			},
		])
		inputRef.current.value=""
		inputRef.current.focus()
	}

	const deleteTodo=(id)=>{
		setTodoList((prevTodos)=>prevTodos.filter((todo)=>todo.id !==id))
	}

	const toggleTodo=(id)=>{
		setTodoList((prevTodos)=>
			prevTodos.map((todo)=>
				todo.id===id?{...todo, isComplete:!todo.isComplete}:todo,
			),
		)
	}

	useEffect(()=>{
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
	}, [todoList])

	return (
		<div className="flex min-h-screen items-start justify-center bg-stone-900 px-4 py-8">
			<div className="flex w-full max-w-md flex-col rounded-xl bg-white p-7 shadow-2xl shadow-black/20">
				<div className="mt-7 flex items-center gap-2">
					<img className="w-8" src={todoIcon} alt="Todo icon" />
					<h1 className="text-3xl font-semibold text-slate-800">Net Task</h1>
				</div>

				<div className="my-7 flex items-center rounded-full bg-gray-200">
					<input
						ref={inputRef}
						className="h-14 flex-1 border-0 bg-transparent pl-6 pr-2 text-slate-800 outline-none placeholder:text-slate-600"
						type="text"
						placeholder="Add your task"
						onKeyDown={(event)=>{
							if(event.key==="Enter"){
								addTodo()
							}
						}}
					/>
					<button
						type="button"
						onClick={addTodo}
						className="h-14 w-32 cursor-pointer rounded-full border-none bg-orange-600 text-lg font-medium text-white transition hover:bg-orange-500"
					>
						Add +
					</button>
				</div>

				<div className="space-y-3">
					{todoList.map((item) => (
						<TodoItem
							key={item.id}
							id={item.id}
							text={item.text}
							isComplete={item.isComplete}
							deleteTodo={deleteTodo}
							toggle={toggleTodo}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Todo