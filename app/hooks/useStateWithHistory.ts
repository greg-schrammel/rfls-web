import { useState } from 'react'

export function useStateWithHistory<T>(init: T) {
  const [history, setHistory] = useState([init])
  const [cursor, setCursor] = useState(0)

  const setState = (updater: T | ((p: T) => T)) => {
    const value = updater instanceof Function ? updater(history[cursor]) : updater
    const newHistory = history.slice(0, cursor + 1)
    newHistory.push(value)
    setHistory(newHistory)
    setCursor(newHistory.length - 1)
  }

  const undo = () => setCursor((i) => (i === 0 ? 0 : i - 1))
  const redo = () => setCursor((i) => (i === history.length - 1 ? i : i + 1))

  return [history[cursor], setState, undo, redo] as const
}
