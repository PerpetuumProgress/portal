import React from 'react'
import { useFormikContext } from 'formik'
import styles from './index.module.css'

interface FormPublishData {
  metadata: {
    name: string
    description: string
    size: string
    contractId: string
    recordingTime: string
    roadTypes?: string
    laneTypes?: string
    levelOfDetail?: string
    trafficDirection?: string
    startTime?: string
    stopTime?: string
    format?: string
    version?: string
    numberFrames?: string
    usedDataSources?: string
    measurementSystem?: string
    georeference?: {
      country?: string
      state?: string
      city?: string
    }
  }
}

export default function JSONImport(): JSX.Element {
  const { setFieldValue } = useFormikContext<FormPublishData>()

  const populateForm = (json: any): void => {
    if (json['ositrace:general']) {
      const { '@value': name } =
        json['ositrace:general']['general:description']['gx:name']
      const { '@value': description } =
        json['ositrace:general']['general:description']['gx:description']
      const { '@value': size } =
        json['ositrace:general']['general:data']['general:size']
      const { '@value': contractId } =
        json['ositrace:general']['general:data']['general:contractId']
      const { '@value': recordingTime } =
        json['ositrace:general']['general:data']['general:recordingTime']
      const { '@value': data } =
        json['ositrace:general']['general:links']['general:data']['general:url']
      const { '@value': media } =
        json['ositrace:general']['general:links']['general:data']['general:url']
      const { '@value': requiredData } =
        json['ositrace:general']['general:bundleData']['general:requiredData'][
          'general:url'
        ]

      setFieldValue('metadata.name', name)
      setFieldValue('metadata.description', description)
      setFieldValue('metadata.osisize', size)
      setFieldValue('metadata.osicontractId', contractId)
      setFieldValue('metadata.osirecordingTime', recordingTime)
      setFieldValue('metadata.osidata', data)
      setFieldValue('metadata.osimedia', media)
      setFieldValue('metadata.osirequiredData', requiredData)
    }

    if (json['ositrace:format']) {
      const formatType = json['ositrace:format']['ositrace:formatType']
      const version = json['ositrace:format']['ositrace:version']['@value']

      setFieldValue('metadata.format', formatType)
      setFieldValue('metadata.version', version)
    }

    if (json['ositrace:content']) {
      const {
        'ositrace:roadTypes': roadTypes,
        'ositrace:laneTypes': laneTypes,
        'ositrace:levelOfDetail': levelOfDetail,
        'ositrace:trafficDirection': trafficDirection,
        'ositrace:granularity': granularity,
        'ositrace:startTime': startTime,
        'ositrace:stopTime': stopTime,
        'ositrace:hostMovingObject': hostMovingObject,
        'ositrace:targetMovingObject': targetMovingObject
      } = json['ositrace:content']

      setFieldValue('metadata.roadTypes', roadTypes)
      setFieldValue('metadata.laneTypes', laneTypes)
      setFieldValue('metadata.levelOfDetail', levelOfDetail)
      setFieldValue('metadata.trafficDirection', trafficDirection)
      setFieldValue('metadata.granularity', granularity)
      setFieldValue('metadata.startTime', startTime?.['@value'] || '')
      setFieldValue('metadata.stopTime', stopTime?.['@value'] || '')
      setFieldValue(
        'metadata.hostMovingObject',
        hostMovingObject?.['ositrace:description']?.['@value']
      )
      setFieldValue(
        'metadata.targetMovingObject',
        targetMovingObject?.['ositrace:description']?.['@value']
      )
      setFieldValue(
        'metadata.hostMovingObjectDescription',
        hostMovingObject?.['ositrace:description']?.['@value']
      )
      setFieldValue(
        'metadata.hostMovingObjectIdentifier',
        hostMovingObject?.['ositrace:identifier']?.['@value']
      )
      setFieldValue(
        'metadata.targetMovingObjectDescription',
        targetMovingObject?.['ositrace:description']?.['@value']
      )
      setFieldValue(
        'metadata.targetMovingObjectIdentifier',
        targetMovingObject?.['ositrace:identifier']?.['@value']
      )
    }

    if (json['ositrace:quantity']) {
      const numberFrames =
        json['ositrace:quantity']['ositrace:numberFrames']['@value']
      setFieldValue('metadata.numberFrames', numberFrames)
    }

    if (json['ositrace:dataSource']) {
      const usedDataSources =
        json['ositrace:dataSource']['ositrace:usedDataSources']['@value']
      const measurementSystem =
        json['ositrace:dataSource']['ositrace:measurementSystem']['@value']

      setFieldValue('metadata.usedDataSources', usedDataSources)
      setFieldValue('metadata.measurementSystem', measurementSystem)
    }

    if (json['ositrace:georeference']) {
      const georeference =
        json['ositrace:georeference']['georeference:projectLocation']
      const country = georeference?.['georeference:country']?.['@value']
      const state = georeference?.['georeference:state']?.['@value']
      const region = georeference?.['georeference:region']?.['@value']
      const city = georeference?.['georeference:city']?.['@value']
      const relationOrArea =
        georeference?.['georeference:relationOrArea']?.['@value']
      const boundingBox = georeference?.['georeference:boundingBox']
      const xMin = boundingBox?.['georeference:xMin']?.['@value']
      const yMin = boundingBox?.['georeference:yMin']?.['@value']
      const xMax = boundingBox?.['georeference:xMax']?.['@value']
      const yMax = boundingBox?.['georeference:yMax']?.['@value']
      const geodeticReferenceSystem =
        json['ositrace:georeference']['georeference:geodeticReferenceSystem']
      const coordinateSystem =
        geodeticReferenceSystem?.['georeference:coordinateSystem']?.['@value']
      const origin = geodeticReferenceSystem?.['georeference:origin']
      const originX = origin?.['georeference:x']?.['@value']
      const originY = origin?.['georeference:y']?.['@value']
      const heightSystem =
        geodeticReferenceSystem?.['georeference:heightSystem']

      setFieldValue('metadata.georeference.country', country)
      setFieldValue('metadata.georeference.state', state)
      setFieldValue('metadata.georeference.region', region)
      setFieldValue('metadata.georeference.city', city)
      setFieldValue('metadata.georeference.relationOrArea', relationOrArea)
      setFieldValue('metadata.georeference.boundingBox.xMin', xMin)
      setFieldValue('metadata.georeference.boundingBox.yMin', yMin)
      setFieldValue('metadata.georeference.boundingBox.xMax', xMax)
      setFieldValue('metadata.georeference.boundingBox.yMax', yMax)
      setFieldValue('metadata.georeference.coordinateSystem', coordinateSystem)
      setFieldValue('metadata.georeference.origin.x', originX)
      setFieldValue('metadata.georeference.origin.y', originY)
      setFieldValue('metadata.georeference.heightSystem', heightSystem)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string)
          populateForm(json)
        } catch (error) {
          console.error('Fehler beim Parsen der JSON-Datei', error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="json-upload" className={styles.label}>
        Import OSITrace JSON
      </label>
      <input
        type="file"
        id="json-upload"
        accept=".json"
        onChange={handleFileUpload}
        className={styles.hiddeninput}
      />

      {/* Stylisierter Button */}
      <button
        type="button"
        onClick={() => document.getElementById('json-upload').click()}
        className={styles.custombutton}
      >
        Datei auswählen
      </button>
    </div>
  )
}
