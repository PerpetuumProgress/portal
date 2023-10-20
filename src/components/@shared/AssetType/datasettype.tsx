import React, { ReactElement } from 'react'
import styles from './index.module.css'
import ScenarioIcon from '@images/compute.svg'
import TrackIcon from '@images/download.svg'
import IconScenarioDataset from '@images/scenario.svg'
import IconTrackDataset from '@images/traffic.svg'
import IconEnvironmentDataset from '@images/Environment.svg'
import Lock from '@images/lock.svg'

export default function DatasetType({
  type,
  className
}: {
  type: string
  className?: string
}): ReactElement {
  return (
    <div className={className || null}>
      {type === 'scenario' ? (
        <IconScenarioDataset
          role="img"
          aria-label="Scenario"
          className={styles.icon}
        />
      ) : type === 'track' ? (
        <IconTrackDataset
          role="img"
          aria-label="Track"
          className={styles.icon}
        />
      ) : (
        <IconEnvironmentDataset
          role="img"
          aria-label="Unknown"
          className={styles.icon}
        />
      )}

      <div className={styles.typeLabel}>
        {type === 'scenario'
          ? 'scenario'
          : type === 'track'
          ? 'track'
          : 'unknown'}
      </div>
    </div>
  )
}
