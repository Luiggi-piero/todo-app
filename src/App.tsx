import { useState } from "react"
import { Todos } from "./components/Todos"
import { type Todo as TodoType, type TodoId, FilterValue, type TodoTitle } from "./types.d"
import { TODO_FILTERS } from "./consts"
import { Footer } from './components/Footer';
import { Header } from "./components/Header";

const mockTodos = [
  {
    id: '1',
    title: 'Cocinar',
    completed: false
  },
  {
    id: '2',
    title: 'Ir al gimnasio',
    completed: false
  },
  {
    id: '3',
    title: 'Terminar de limpiar la sala',
    completed: false
  },
]

function App() {

  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove =
    ({ id }: TodoId): void => {
      const newTodos = todos.filter(todo => todo.id !== id)
      setTodos(newTodos)
    }

  // Para marcar y desmarcar el checkbox de cada todo
  const handleComplete =
    ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
      const newTodos = todos.map(todo => {

        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }

        return todo
      })

      setTodos(newTodos)
    }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  // Para mostrar los todos completados, activos(pendientes) y todos
  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  // Borrar los todos completados
  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />

      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleComplete}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App

/**
 * npm install todomvc-app-css -E
 */