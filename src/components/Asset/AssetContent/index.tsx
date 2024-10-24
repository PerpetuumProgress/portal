import React, { ReactElement, useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Markdown from '@shared/Markdown'
import MetaFull from './MetaFull'
import MetaSecondary from './MetaSecondary'
import AssetActions from '../AssetActions'
import { useUserPreferences } from '@context/UserPreferences'
import Bookmark from './Bookmark'
import { useAsset } from '@context/Asset'
import Alert from '@shared/atoms/Alert'
import DebugOutput from '@shared/DebugOutput'
import MetaMain from './MetaMain'
import EditHistory from './EditHistory'
import styles from './index.module.css'
import NetworkName from '@shared/NetworkName'
import content from '../../../../content/purgatory.json'
import Button from '@shared/atoms/Button'
import RelatedAssets from '../RelatedAssets'
import DmButton from '@shared/DirectMessages/DmButton'
import Web3Feedback from '@components/@shared/Web3Feedback'
import { useAccount } from 'wagmi'

export default function AssetContent({
  asset
}: {
  asset: AssetExtended
}): ReactElement {
  const { isInPurgatory, purgatoryData, isOwner, isAssetNetwork } = useAsset()
  const { address: accountId } = useAccount()
  const { debug } = useUserPreferences()
  const [receipts, setReceipts] = useState([])
  const [nftPublisher, setNftPublisher] = useState<string>()

  useEffect(() => {
    if (!receipts.length) return

    const publisher = receipts?.find((e) => e.type === 'METADATA_CREATED')?.nft
      ?.owner
    setNftPublisher(publisher)
  }, [receipts])
  const Map = useMemo(
    () =>
      dynamic(() => import('../../Map/map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    []
  )

  return (
    <>
      <div className={styles.networkWrap}>
        <NetworkName networkId={asset?.chainId} className={styles.network} />
      </div>

      <article className={styles.grid}>
        <div>
          <div className={styles.content}>
            <MetaMain asset={asset} nftPublisher={nftPublisher} />
            {asset?.accessDetails?.datatoken !== null && (
              <Bookmark did={asset?.id} />
            )}
            {isInPurgatory === true ? (
              <Alert
                title={content.asset.title}
                badge={`Reason: ${purgatoryData?.reason}`}
                text={content.asset.description}
                state="error"
              />
            ) : (
              <>
                <Markdown
                  className={styles.description}
                  text={asset?.metadata?.description || ''}
                />
                <MetaSecondary ddo={asset} />
              </>
            )}
            {asset?.metadata?.type === 'dataset' &&
              asset?.metadata?.additionalInformation?.geojson !== undefined &&
              asset?.metadata?.additionalInformation?.geojson !== '' && (
                <Map
                  dataLayer={[
                    JSON.parse(asset?.metadata?.additionalInformation?.geojson)
                  ]}
                  datasetwithgeojson={[]}
                />
              )}
            {asset?.metadata?.type === 'dataset' &&
              asset?.metadata?.additionalInformation?.datasettype ===
                'track' && (
                <>
                  <div className={styles.description}>
                    <strong>SHACL Metadata</strong>
                  </div>
                  <div className={styles.description}>
                    HD Map Accuracy (Lane Model Height):{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapAccuracyLaneModelHeight
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Accuracy (Objects):{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapAccuracyObjects
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Accuracy (Signals):{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapAccuracySignals
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Elevation Range:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapElevationRange
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map GNSS:{' '}
                    {asset?.metadata?.additionalInformation?.shaclmetadata
                      ?.hdMapGNSS
                      ? 'Yes'
                      : 'No'}
                  </div>
                  <div className={styles.description}>
                    HD Map Geodetic Datum:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapHeightSystem
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Lane Types:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapLaneTypes
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Length:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapLength
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Level Of Detail:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapLevelOfDetail
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Light:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapLight
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Measurement System:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapMeasurementSystem
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Number Intersections:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapNumberIntersections
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Number Objects:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapNumberObjects
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Number Outlines:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapNumberOutlines
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Number Traffic Lights:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapNumberTrafficLights
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Number Traffic Signs:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapNumberTrafficSigns
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Origin:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapOrigin
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Precision:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapPrecision
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Projection Type:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapProjectionType
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Radar:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapRadar
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Range Of Modeling:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapRangeOfModeling
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Recording Time:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapRecordingTime
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Road Types:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapRoadTypes
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Speed Limit:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapSpeedLimit
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Traffic Direction:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapTrafficDirection
                    }
                  </div>
                  <div className={styles.description}>
                    HD Map Used Data Sources:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.hdMapUsedDataSources
                    }
                  </div>
                  <div className={styles.description}>
                    Map Level:{' '}
                    {
                      asset?.metadata?.additionalInformation?.shaclmetadata
                        ?.MapLevel
                    }
                  </div>
                </>
              )}
            <MetaFull ddo={asset} />
            <EditHistory receipts={receipts} setReceipts={setReceipts} />
            {debug === true && <DebugOutput title="DDO" output={asset} />}
          </div>
        </div>

        <div className={styles.actions}>
          <AssetActions asset={asset} />
          {isOwner && isAssetNetwork && (
            <div className={styles.ownerActions}>
              <Button style="text" size="small" to={`/asset/${asset?.id}/edit`}>
                Edit Asset
              </Button>
            </div>
          )}
          <div className={styles.ownerActions}>
            <DmButton accountId={asset?.nft?.owner} />
          </div>
          <Web3Feedback
            networkId={asset?.chainId}
            accountId={accountId}
            isAssetNetwork={isAssetNetwork}
          />
          <RelatedAssets />
        </div>
      </article>
    </>
  )
}
