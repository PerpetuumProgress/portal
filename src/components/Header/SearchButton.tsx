import React, { FormEvent, ReactElement, useState } from 'react'
import SearchIcon from '@images/search.svg'
import styles from './SearchButton.module.css'

export default function SearchButton(): ReactElement {
  const isHome = window.location.pathname === '/'
  const [isSearchBarVisible, setSearchBarVisible] = useState<boolean>(false)
  const [homeSearchBarFocus, setHomeSearchBarFocus] = useState<boolean>(false)

  async function handleButtonClick(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (isHome) {
      setHomeSearchBarFocus(!homeSearchBarFocus)
      setSearchBarVisible(false)
      return
    }
    setSearchBarVisible(!isSearchBarVisible)
  }

  return (
    <div className={styles.search}>
      <button onClick={handleButtonClick} className={styles.button}>
        <SearchIcon className={styles.searchIcon} />
      </button>
    </div>
  )
}
