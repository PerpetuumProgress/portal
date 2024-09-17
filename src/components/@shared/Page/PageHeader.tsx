import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './PageHeader.module.css'
import Markdown from '@shared/Markdown'
import SearchBar from '@components/Header/SearchBar'
import Logo from '@images/gaia-x-logo.svg'
import Logo1 from '@images/gaiax_logos/bmw-2-logo-svg-vector.svg'
import Logo2 from '@images/gaiax_logos/continental-logo-svg-vector.svg'
import Logo3 from '@images/gaiax_logos/siemens-3-logo-svg-vector.svg'
import Logo4 from '@images/gaiax_logos/intel-logo.svg'

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
            href="https://gaia-x.eu/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Logo style={{ width: '200px', height: '60px' }} />
          </a>
          <div className={styles.logoContainer}>
            <Logo1 className={styles.logo} />
            <Logo2 className={styles.logo} />
            <Logo3 className={styles.logo} />
            <Logo4 className={styles.logo} />
          </div>
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
