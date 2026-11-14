import tick from "../assets/tick.png"
import notTick from "../assets/not_tick.png"
import deleteIcon from "../assets/delete.png"

const TodoItem=({text,id,isComplete,deleteTodo,toggle}) => (
	<div className="flex items-center gap-2">
		<div
			onClick={()=>toggle(id)}
			onKeyDown={(event)=>{
				if(event.key==="Enter"||event.key===" "){
					event.preventDefault()
					toggle(id)
				}
			}}
			className="flex flex-1 cursor-pointer items-center"
			role="button"
			tabIndex={0}
		>
			<img className="w-7" src={isComplete ? tick : notTick} alt="Complete task"/>
			<p className={`ml-4 text-[17px] ${isComplete ? "line-through text-slate-400" : "text-slate-700"}`}>
				{text}
			</p>
		</div>
		<button
			type="button"
			onClick={()=>deleteTodo(id)}
			className="cursor-pointer border-0 bg-transparent p-0"
			aria-label={`Delete task ${text}`}
		>
			<img className="w-3.5" src={deleteIcon} alt="Delete task"/>
		</button>
	</div>
)

export default TodoItem