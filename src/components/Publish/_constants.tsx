import React from 'react'
import { allowFixedPricing } from '../../../app.config'
import {
  FormPublishData,
  MetadataAlgorithmContainer,
  PublishFeedback,
  StepContent
} from './_types'
import content from '../../../content/publish/form.json'
import PricingFields from './Pricing'
import MetadataFields from './Metadata'
import ServicesFields from './Services'
import Preview from './Preview'
import Submission from './Submission'
import { ServiceComputeOptions } from '@oceanprotocol/lib'
import contentFeedback from '../../../content/publish/feedback.json'

export const wizardSteps: StepContent[] = [
  {
    step: 1,
    title: content.metadata.title,
    component: <MetadataFields />
  },
  {
    step: 2,
    title: content.services.title,
    component: <ServicesFields />
  },
  {
    step: 3,
    title: content.pricing.title,
    component: <PricingFields />
  },
  {
    step: 4,
    title: content.preview.title,
    component: <Preview />
  },
  {
    step: 5,
    title: content.submission.title,
    component: <Submission />
  }
]

const computeOptions: ServiceComputeOptions = {
  allowRawAlgorithm: false,
  allowNetworkAccess: true,
  publisherTrustedAlgorithmPublishers: [],
  publisherTrustedAlgorithms: []
}

export const initialValues: FormPublishData = {
  user: {
    stepCurrent: 1,
    chainId: 1,
    accountId: ''
  },
  metadata: {
    nft: { name: '', symbol: '', description: '', image_data: '' },
    transferable: true,
    type: 'dataset',
    name: '',
    author: '',
    description: '',
    tags: [],
    termsAndConditions: false,
    geojson: '',
    dockerImage: '',
    dockerImageCustom: '',
    dockerImageCustomTag: '',
    dockerImageCustomEntrypoint: '',
    usesConsumerParameters: false,
    consumerParameters: [],
    datasettype: 'scenario',
    hdMapAccuracyLaneModel2D: 0,
    hdMapAccuracyLaneModelHeight: 0,
    hdMapAccuracyObjects: 0,
    hdMapAccuracySignals: 0,
    hdMapElevationRange: 0,
    hdMapGNSS: false,
    hdMapHeightSystem: '',
    hdMapLaneTypes: '',
    hdMapLength: 0,
    hdMapLevelOfDetail: '',
    hdMapLight: false,
    hdMapMeasurementSystem: '',
    hdMapNumberIntersections: 0,
    hdMapNumberObjects: 0,
    hdMapNumberOutlines: 0,
    hdMapNumberTrafficLights: 0,
    hdMapNumberTrafficSigns: 0,
    hdMapOrigin: '',
    hdMapPrecision: 0,
    hdMapProjectionType: '',
    hdMapRadar: false,
    hdMapRangeOfModeling: 0,
    hdMapRecordingTime: undefined,
    hdMapRoadTypes: '',
    hdMapSpeedLimit: 0,
    hdMapTrafficDirection: '',
    hdMapUsedDataSources: '',
    MapLevel: '',
    osisize: 0,
    osicontractId: '',
    osirecordingTime: '',
    osidata: '',
    osimedia: '',
    osirequiredData: '',
    format: '',
    version: '',
    roadTypes: '',
    laneTypes: '',
    levelOfDetail: '',
    trafficDirection: '',
    granularity: '',
    startTime: '',
    stopTime: '',
    hostMovingObjectDescription: '',
    hostMovingObjectIdentifier: '',
    targetMovingObjectDescription: '',
    targetMovingObjectIdentifier: '',
    numberFrames: 0,
    usedDataSources: '',
    measurementSystem: '',
    georeferenceCountry: '',
    georeferenceState: '',
    georeferenceRegion: '',
    georeferenceCity: '',
    georeferenceRelationOrArea: '',
    boundingBoxXMin: 0,
    boundingBoxYMin: 0,
    boundingBoxXMax: 0,
    boundingBoxYMax: 0,
    georeferenceCoordinateSystem: '',
    originX: 0,
    originY: 0,
    heightSystem: ''
  },
  services: [
    {
      files: [{ url: '', type: 'ipfs' }],
      links: [{ url: '', type: 'url' }],
      dataTokenOptions: { name: '', symbol: '' },
      timeout: '',
      access: 'access',
      providerUrl: {
        url: 'https://provider.mainnet.oceanprotocol.com',
        valid: true,
        custom: false
      },
      computeOptions,
      usesConsumerParameters: false,
      consumerParameters: []
    }
  ],
  pricing: {
    baseToken: { address: '', name: '', symbol: 'OCEAN', decimals: 18 },
    price: 0,
    type: allowFixedPricing === 'true' ? 'fixed' : 'free',
    freeAgreement: false
  }
}

export const algorithmContainerPresets: MetadataAlgorithmContainer[] = [
  {
    image: 'node',
    tag: 'latest',
    entrypoint: 'node $ALGO',
    checksum: ''
  },
  {
    image: 'python',
    tag: 'latest',
    entrypoint: 'python $ALGO',
    checksum: ''
  }
]

export const initialPublishFeedback: PublishFeedback = contentFeedback
