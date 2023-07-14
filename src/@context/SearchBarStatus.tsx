import React, {
  createContext,
  useContext,
  ReactElement,
  ReactNode,
  useState
} from 'react'

interface SearchBarStatusValue {
  isSearchBarVisible: boolean
  setSearchBarVisible: (value: boolean) => void
  homeSearchBarFocus: boolean
  setHomeSearchBarFocus: (value: boolean) => void
}

const SearchBarStatusContext = createContext<SearchBarStatusValue>({
  isSearchBarVisible: false,
  setSearchBarVisible: () => {},
  homeSearchBarFocus: false,
  setHomeSearchBarFocus: () => {}
})

const SearchBarStatusProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  const [isSearchBarVisible, setSearchBarVisible] = useState<boolean>(false)
  const [homeSearchBarFocus, setHomeSearchBarFocus] = useState<boolean>(false)

  const setSearchBarVisibleHandler = (value: boolean): void => {
    setSearchBarVisible(value)
  }

  const setHomeSearchBarFocusHandler = (value: boolean): void => {
    setHomeSearchBarFocus(value)
  }

  const contextValue: SearchBarStatusValue = {
    isSearchBarVisible,
    setSearchBarVisible: setSearchBarVisibleHandler,
    homeSearchBarFocus,
    setHomeSearchBarFocus: setHomeSearchBarFocusHandler
  }

  return (
    <SearchBarStatusContext.Provider value={contextValue}>
      {children}
    </SearchBarStatusContext.Provider>
  )
}

const useSearchBarStatus = (): SearchBarStatusValue => {
  const context = useContext(SearchBarStatusContext)
  if (context === undefined) {
    throw new Error(
      'useSearchBarStatus must be used within a SearchBarStatusProvider'
    )
  }
  return context
}

export { SearchBarStatusProvider, useSearchBarStatus, SearchBarStatusContext }
