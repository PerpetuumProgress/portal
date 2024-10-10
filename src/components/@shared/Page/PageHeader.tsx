import Image from 'next/image'
import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './PageHeader.module.css'
import Markdown from '@shared/Markdown'
import SearchBar from '@components/Header/SearchBar'
import Logo from '@images/gaia-x-logo.svg'
import Logo1 from '@images/gaiax_logos/Logo_3d-mapping_4c-1920w.webp'
import Logo2 from '@images/gaiax_logos/continental-logo-svg-vector.svg'
import Logo3 from '@images/gaiax_logos/logo_ascs_4c-1920w.png'
import Logo4 from '@images/gaiax_logos/logo_avl_4c-1920w.png'
import Logo5 from '@images/gaiax_logos/logo_bmw-group_4c-1920w.webp'
import Logo6 from '@images/gaiax_logos/logo_DLR_4c-1920w.png'
import Logo7 from '@images/gaiax_logos/logo_fkfs_4c-1920w.webp'
import Logo8 from '@images/gaiax_logos/logo_fraunhofer_4c-1920w.png'
import Logo9 from '@images/gaiax_logos/logo_infineon_4c_Zeichenfläche+1-1920w.png'
import Logo10 from '@images/gaiax_logos/logo_IQZ_4c_Zeichenfläche+1-1920w.png'
import Logo11 from '@images/gaiax_logos/logo_msg_4c-1920w.webp'
import Logo12 from '@images/gaiax_logos/logo_setlabs_4c-1920w.png'
import Logo13 from '@images/gaiax_logos/logo_thingolstadt_4c-1920w.png'
import Logo14 from '@images/gaiax_logos/tracetronic-orange-1920w.webp'
import Logo15 from '@images/gaiax_logos/logo_triangraphics_4c-1920w.png'
import Logo16 from '@images/gaiax_logos/logo_tu-berlin_4c-1920w.png'
import Logo17 from '@images/gaiax_logos/logo_tum_4c-1920w.png'
import Logo18 from '@images/gaiax_logos/logo_vcs_4c-1920w.png'
import Logo19 from '@images/perpetuumprogress.svg'

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
            <Logo style={{ width: '300px', height: '90px' }} />
          </a>
          <h2 className={styles.projectPartnersTitle}>CONSORTIUM</h2>
          <div className={styles.logoContainer}>
            <Image
              src={Logo1}
              alt="Logo 1"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Logo2 className={styles.logo} />
            <Image
              src={Logo3}
              alt="Logo 3"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo4}
              alt="Logo 4"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo5}
              alt="Logo 5"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo6}
              alt="Logo 6"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo7}
              alt="Logo 7"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo8}
              alt="Logo 8"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo9}
              alt="Logo 9"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo10}
              alt="Logo 10"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo11}
              alt="Logo 11"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo12}
              alt="Logo 12"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo13}
              alt="Logo 13"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo14}
              alt="Logo 14"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo15}
              alt="Logo 15"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo16}
              alt="Logo 16"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo17}
              alt="Logo 17"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Image
              src={Logo18}
              alt="Logo 18"
              className={styles.logo}
              width={200}
              height={60}
            />
            <Logo19 className={styles.logo} />
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
