import { FileInfo, ServiceComputeOptions } from '@oceanprotocol/lib'
import { NftMetadata } from '@utils/nft'
import { ReactElement } from 'react'
export interface FormPublishService {
  files: FileInfo[]
  links?: FileInfo[]
  timeout: string
  dataTokenOptions: { name: string; symbol: string }
  access: 'Download' | 'Compute' | string
  providerUrl: { url: string; valid: boolean; custom: boolean }
  algorithmPrivacy?: boolean
  computeOptions?: ServiceComputeOptions
  usesConsumerParameters?: boolean
  consumerParameters?: FormConsumerParameter[]
}

export interface FormPublishData {
  user: {
    stepCurrent: number
    accountId: string
    chainId: number
  }
  metadata: {
    datasettype: string
    nft: NftMetadata
    transferable: boolean
    type: 'dataset' | 'algorithm'
    name: string
    description: string
    author: string
    termsAndConditions: boolean
    geojson: string
    tags?: string[]
    dockerImage?: string
    dockerImageCustom?: string
    dockerImageCustomTag?: string
    dockerImageCustomEntrypoint?: string
    dockerImageCustomChecksum?: string
    usesConsumerParameters?: boolean
    consumerParameters?: FormConsumerParameter[]
    service?: {
      usesConsumerParameters?: boolean
      consumerParameters?: FormConsumerParameter[]
    }
    hdMapAccuracyLaneModel2D: number
    hdMapAccuracyLaneModelHeight: number
    hdMapAccuracyObjects: number
    hdMapAccuracySignals: number
    hdMapElevationRange: number
    hdMapGNSS: boolean
    hdMapHeightSystem: string
    hdMapLaneTypes: string
    hdMapLength: number
    hdMapLevelOfDetail: string
    hdMapLight: boolean
    hdMapMeasurementSystem: string
    hdMapNumberIntersections: number
    hdMapNumberObjects: number
    hdMapNumberOutlines: number
    hdMapNumberTrafficLights: number
    hdMapNumberTrafficSigns: number
    hdMapOrigin: string
    hdMapPrecision: number
    hdMapProjectionType: string
    hdMapRadar: boolean
    hdMapRangeOfModeling: number
    hdMapRecordingTime: Date
    hdMapRoadTypes: string
    hdMapSpeedLimit: number
    hdMapTrafficDirection: string
    hdMapUsedDataSources: string
    MapLevel: string
    osisize: number
    osicontractId: string
    osirecordingTime: string
    osidata: string
    osimedia: string
    osirequiredData: string
    format: string
    version: string
    roadTypes: string
    laneTypes: string
    levelOfDetail: string
    trafficDirection: string
    granularity: string
    startTime: string
    stopTime: string
    hostMovingObjectDescription: string
    hostMovingObjectIdentifier: string
    targetMovingObjectDescription: string
    targetMovingObjectIdentifier: string
    numberFrames: number
    usedDataSources: string
    measurementSystem: string
    georeferenceCountry: string
    georeferenceState: string
    georeferenceRegion: string
    georeferenceCity: string
    georeferenceRelationOrArea: string
    boundingBoxXMin: number
    boundingBoxYMin: number
    boundingBoxXMax: number
    boundingBoxYMax: number
    georeferenceCoordinateSystem: string
    originX: number
    originY: number
    heightSystem: string
  }
  services: FormPublishService[]
  pricing: PricePublishOptions
  feedback?: PublishFeedback
}

export interface StepContent {
  step: number
  title: string
  component: ReactElement
}

export interface PublishFeedback {
  [key: string]: {
    name: string
    description: string
    status: 'success' | 'error' | 'pending' | 'active' | string
    txCount: number
    errorMessage?: string
    txHash?: string
  }
}

export interface MetadataAlgorithmContainer {
  entrypoint: string
  image: string
  tag: string
  checksum: string
}

export interface FormConsumerParameter {
  name: string
  type: 'text' | 'number' | 'boolean' | 'select'
  label: string
  required: string
  description: string
  default: string | boolean | number
  options?: { key: string; value: string }[]
  value?: string | boolean | number
}
