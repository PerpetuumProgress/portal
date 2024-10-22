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
            {asset?.metadata?.type === 'dataset' &&
              asset?.metadata?.additionalInformation?.datasettype === 'osi' && (
                <>
                  <div className={styles.description}>
                    <strong>OSI Metadata</strong>
                  </div>
                  <div className={styles.description}>
                    Description:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.description
                    }
                  </div>
                  <div className={styles.description}>
                    Size:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.osisize
                    }
                  </div>
                  <div className={styles.description}>
                    Contract ID:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.osicontractId
                    }
                  </div>
                  <div className={styles.description}>
                    Recording Time:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.osirecordingTime
                    }
                  </div>
                  <div className={styles.description}>
                    Data URL:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.osidata
                    }
                  </div>
                  <div className={styles.description}>
                    Media URL:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.osimedia
                    }
                  </div>
                  <div className={styles.description}>
                    Required Data URL:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.osirequiredData
                    }
                  </div>
                  <div className={styles.description}>
                    Format Type:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.format
                    }
                  </div>
                  <div className={styles.description}>
                    Version:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.version
                    }
                  </div>
                  <div className={styles.description}>
                    Road Types:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.roadTypes
                    }
                  </div>
                  <div className={styles.description}>
                    Lane Types:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.laneTypes
                    }
                  </div>
                  <div className={styles.description}>
                    Level of Detail:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.levelOfDetail
                    }
                  </div>
                  <div className={styles.description}>
                    Traffic Direction:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.trafficDirection
                    }
                  </div>
                  <div className={styles.description}>
                    Granularity:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.granularity
                    }
                  </div>
                  <div className={styles.description}>
                    Start Time:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.startTime
                    }
                  </div>
                  <div className={styles.description}>
                    Stop Time:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.stopTime
                    }
                  </div>
                  <div className={styles.description}>
                    Host Moving Object Description:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.hostMovingObjectDescription
                    }
                  </div>
                  <div className={styles.description}>
                    Host Moving Object Identifier:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.hostMovingObjectIdentifier
                    }
                  </div>
                  <div className={styles.description}>
                    Target Moving Object Description:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.targetMovingObjectDescription
                    }
                  </div>
                  <div className={styles.description}>
                    Target Moving Object Identifier:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.targetMovingObjectIdentifier
                    }
                  </div>
                  <div className={styles.description}>
                    Number of Frames:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.numberFrames
                    }
                  </div>
                  <div className={styles.description}>
                    Used Data Sources:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.usedDataSources
                    }
                  </div>
                  <div className={styles.description}>
                    Measurement System:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.measurementSystem
                    }
                  </div>
                  <div className={styles.description}>
                    Country:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.georeferenceCountry
                    }
                  </div>
                  <div className={styles.description}>
                    State:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.georeferenceState
                    }
                  </div>
                  <div className={styles.description}>
                    Region:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.georeferenceRegion
                    }
                  </div>
                  <div className={styles.description}>
                    City:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.georeferenceCity
                    }
                  </div>
                  <div className={styles.description}>
                    Relation or Area:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.georeferenceRelationOrArea
                    }
                  </div>
                  <div className={styles.description}>
                    Bounding Box X Min:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.boundingBoxXMin
                    }
                  </div>
                  <div className={styles.description}>
                    Bounding Box Y Min:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.boundingBoxYMin
                    }
                  </div>
                  <div className={styles.description}>
                    Bounding Box X Max:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.boundingBoxXMax
                    }
                  </div>
                  <div className={styles.description}>
                    Bounding Box Y Max:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.boundingBoxYMax
                    }
                  </div>
                  <div className={styles.description}>
                    Coordinate System:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.georeferenceCoordinateSystem
                    }
                  </div>
                  <div className={styles.description}>
                    Origin X:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.originX
                    }
                  </div>
                  <div className={styles.description}>
                    Origin Y:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.originY
                    }
                  </div>
                  <div className={styles.description}>
                    Height System:{' '}
                    {
                      asset?.metadata?.additionalInformation?.osimetadata
                        ?.heightSystem
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
