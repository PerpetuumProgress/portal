import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './PageHeader.module.css'
import Markdown from '@shared/Markdown'
import SearchBar from '@components/Header/SearchBar'
import IngolstadtLogo from '@images/stadt_ingolstadt.svg'

const cx = classNames.bind(styles)

export default function PageHeader({
  title,
  center,
  description,
  isHome,
  showSearch
}: {
  title: string | ReactElement
  center?: boolean
  description?: string
  isHome?: boolean
  showSearch?: boolean
}): ReactElement {
  const styleClasses = cx({
    header: true,
    center
  })

  return (
    <header className={styleClasses}>
      {isHome ? (
        <div className={styles.homeTitleContainer}>
          <h1>
            {(title as string).split(' - ').map((text, i) => (
              <span key={i} className={styles.title}>
                {text}
              </span>
            ))}
          </h1>
          <a
            href="https://www.ingolstadt.de/"
            target="_blank"
            rel="noreferrer noopener"
            //      style={{ width: '5000px', height: '500px' }}
          >
            <IngolstadtLogo />
          </a>
        </div>
      ) : (
        <h1 className={styles.title}>{title}</h1>
      )}
      {description && (
        <Markdown text={description} className={styles.description} />
      )}
      {showSearch && (
        <div className={styles.search}>
          <SearchBar placeholder="Search for service offerings" />
        </div>
      )}
    </header>
  )
}
