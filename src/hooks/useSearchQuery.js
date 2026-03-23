import { useState } from "react"

const useSearchQuery = (tasks) => {
  const [searchQuery, setSearchQuery] = useState('')

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks    = clearSearchQuery.length > 0
    ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
    : null

  return {
    searchQuery,
    setSearchQuery,
    filteredTasks,
  }
}

export default useSearchQuery