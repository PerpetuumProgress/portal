import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './PageHeader.module.css'
import Markdown from '@shared/Markdown'
import SearchBar from '@components/Header/SearchBar'
import Logo from '@images/renault-logo.svg'

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
          <a
            href="https://www.renaultgroup.com/en/innovation-2/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Logo style={{ width: '300px', height: '90px' }} />
          </a>
          <h1>
            {(title as string).split(' - ').map((text, i) => (
              <span key={i} className={styles.title}>
                {text}
              </span>
            ))}
          </h1>
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
