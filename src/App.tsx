import { useState } from 'react';
import './App.css';

// 先將狀態設定類型
interface item {
    id: number;
    text: string;
    completed: boolean;
}
function App() {
    // 設定初始值時也需要指定類型
    const [todos, setTodos] = useState<item[]>([
        { id: 1, text: 'hello', completed: false },
        { id: 2, text: 'world', completed: true },
    ]);
    const [inputText, setInputText] = useState<string>('');

    function handleToggle(id: number) {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                } else {
                    return todo;
                }
            })
        );
    }

    /* React.KeyboardEvent: 表示這是一个 React 提供的键盤事件類型。
     * <HTMLInputElement>: 表示這个事件是 <input> 元素相關的
     */
    function handleAddTodo(event: React.KeyboardEvent<HTMLInputElement>) {
        // 13 為 Enter 的 keyCode
        if (event.keyCode === 13) {
            const newTodo: item = { id: Date.now(), text: inputText, completed: false };
            setTodos([...todos, newTodo]);
            setInputText('');
        }
    }

    return (
        <main>
            <div className="main-container">
                <h1>To Do List</h1>
                <input
                    type="text"
                    value={inputText}
                    placeholder="按下enter送出"
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyUp={handleAddTodo}
                />
                <ul>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            onClick={() => handleToggle(todo.id)}
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default App;
