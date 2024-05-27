import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './PageHeader.module.css'
import Markdown from '@shared/Markdown'
import SearchBar from '@components/Header/SearchBar'
import AininLogo from '@images/thi_ainin_logo.svg'

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
            href="https://www.ainin.de"
            target="_blank"
            rel="noreferrer noopener"
          >
            <AininLogo style={{ width: '200px', height: '70px' }} />
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
          <a
            href="https://www.ingolstadt.de/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <AininLogo style={{ width: '200px', height: '70px' }} />
          </a>
          <SearchBar placeholder="Search for service offerings" />
        </div>
      )}
    </header>
  )
}
