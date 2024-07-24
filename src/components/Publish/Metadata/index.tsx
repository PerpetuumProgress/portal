import { BoxSelectionOption } from '@shared/FormInput/InputElement/BoxSelection'
import Input from '@shared/FormInput'
import { Field, useField, useFormikContext } from 'formik'
import React, { ReactElement, useEffect, useState } from 'react'
import content from '../../../../content/publish/form.json'
import consumerParametersContent from '../../../../content/publish/consumerParameters.json'
import { FormPublishData } from '../_types'
import IconDataset from '@images/dataset.svg'
import IconScenarioDataset from '@images/scenario.svg'
import IconTrackDataset from '@images/traffic.svg'
import IconEnvironmentDataset from '@images/Environment.svg'
import IconAlgorithm from '@images/algorithm.svg'
import IconSensorDataset from '@images/sensor.svg'
import styles from './index.module.css'
import { algorithmContainerPresets } from '../_constants'
import Alert from '@shared/atoms/Alert'
import { useMarketMetadata } from '@context/MarketMetadata'
import { getFieldContent } from '@utils/form'

const assetTypeOptionsTitles = getFieldContent(
  'type',
  content.metadata.fields
).options

const datasettypeOptionsTitles = getFieldContent(
  'datasettype',
  content.metadata.fields
).options

export default function MetadataFields(): ReactElement {
  const { siteContent } = useMarketMetadata()

  // connect with Form state, use for conditional field rendering
  const { values, setFieldValue } = useFormikContext<FormPublishData>()

  const [field, meta] = useField('metadata.dockerImageCustomChecksum')
  const [showOptionalFields, setShowOptionalFields] = useState(false)

  // BoxSelection component is not a Formik component
  // so we need to handle checked state manually.
  const assetTypeOptions: BoxSelectionOption[] = [
    {
      name: assetTypeOptionsTitles[0].toLowerCase(),
      title: assetTypeOptionsTitles[0],
      checked: values.metadata.type === assetTypeOptionsTitles[0].toLowerCase(),
      icon: <IconDataset />
    },
    {
      name: assetTypeOptionsTitles[1].toLowerCase(),
      title: assetTypeOptionsTitles[1],
      checked: values.metadata.type === assetTypeOptionsTitles[1].toLowerCase(),
      icon: <IconAlgorithm />
    }
  ]

  const datasettypeOptions: BoxSelectionOption[] = [
    {
      name: datasettypeOptionsTitles[0].toLowerCase(),
      title: datasettypeOptionsTitles[0],
      checked: values.metadata.datasettype === 'scenario',
      icon: <IconScenarioDataset />
    },
    {
      name: datasettypeOptionsTitles[1].toLowerCase(),
      title: datasettypeOptionsTitles[1],
      checked: values.metadata.datasettype === 'track',
      icon: <IconTrackDataset />
    },
    {
      name: datasettypeOptionsTitles[2].toLowerCase(),
      title: datasettypeOptionsTitles[2],
      checked: values.metadata.datasettype === 'environment',
      icon: <IconEnvironmentDataset />
    },
    {
      name: datasettypeOptionsTitles[3].toLowerCase(),
      title: datasettypeOptionsTitles[3],
      checked: values.metadata.datasettype === 'sensor',
      icon: <IconSensorDataset />
    },
    {
      name: datasettypeOptionsTitles[4].toLowerCase(),
      title: datasettypeOptionsTitles[4],
      checked: values.metadata.datasettype === 'custom shape',
      icon: <IconDataset />
    }
  ]

  // Populate the Docker image field with our presets in _constants,
  // transformPublishFormToDdo will do the rest.
  const dockerImageOptions: BoxSelectionOption[] =
    algorithmContainerPresets.map((preset) => ({
      name: `${preset.image}:${preset.tag}`,
      title: `${preset.image}:${preset.tag}`,
      checked: values.metadata.dockerImage === `${preset.image}:${preset.tag}`
    }))

  useEffect(() => {
    setFieldValue(
      'services[0].access',
      values.metadata.type === 'algorithm' ? 'compute' : 'access'
    )
    setFieldValue(
      'services[0].algorithmPrivacy',
      values.metadata.type === 'algorithm'
    )
  }, [values.metadata.type])

  dockerImageOptions.push({ name: 'custom', title: 'Custom', checked: false })

  return (
    <>
      <Field
        {...getFieldContent('nft', content.metadata.fields)}
        component={Input}
        name="metadata.nft"
      />
      <Field
        {...getFieldContent('type', content.metadata.fields)}
        component={Input}
        name="metadata.type"
        options={assetTypeOptions}
      />
      {values.metadata.type === 'dataset' && (
        <Field
          {...getFieldContent('datasettype', content.metadata.fields)}
          component={Input}
          name="metadata.datasettype"
          options={datasettypeOptions}
        />
      )}
      <Field
        {...getFieldContent('name', content.metadata.fields)}
        component={Input}
        name="metadata.name"
      />
      {values.metadata.type === 'dataset' &&
        values.metadata.datasettype === 'track' && (
          <>
            <Field
              {...getFieldContent(
                'hdMapTrafficDirection',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapTrafficDirection"
            />
            <Field
              {...getFieldContent(
                'hdMapAccuracyLaneModel2D',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapAccuracyLaneModel2D"
            />
            <Field
              {...getFieldContent(
                'hdMapAccuracyLaneModelHeight',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapAccuracyLaneModelHeight"
            />
            <Field
              {...getFieldContent(
                'hdMapAccuracyObjects',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapAccuracyObjects"
            />
            <Field
              {...getFieldContent(
                'hdMapAccuracySignals',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapAccuracySignals"
            />
            <Field
              {...getFieldContent(
                'hdMapElevationRange',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapElevationRange"
            />
            <Field
              {...getFieldContent('hdMapGNSS', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapGNSS"
            />
            <Field
              {...getFieldContent(
                'hdMapGeodeticDatum',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapGeodeticDatum"
            />
            <Field
              {...getFieldContent('hdMapHeightSystem', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapHeightSystem"
            />
            <Field
              {...getFieldContent('hdMapLaneTypes', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapLaneTypes"
            />
            <Field
              {...getFieldContent('hdMapLength', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapLength"
            />
            <Field
              {...getFieldContent(
                'hdMapLevelOfDetail',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapLevelOfDetail"
            />
            <Field
              {...getFieldContent('hdMapLight', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapLight"
            />
            <Field
              {...getFieldContent(
                'hdMapMeasurementSystem',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapMeasurementSystem"
            />
            <Field
              {...getFieldContent(
                'hdMapNumberIntersections',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapNumberIntersections"
            />
            <Field
              {...getFieldContent(
                'hdMapNumberObjects',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapNumberObjects"
            />
            <Field
              {...getFieldContent(
                'hdMapNumberOutlines',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapNumberOutlines"
            />
            <Field
              {...getFieldContent(
                'hdMapNumberTrafficLights',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapNumberTrafficLights"
            />
            <Field
              {...getFieldContent(
                'hdMapNumberTrafficSigns',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapNumberTrafficSigns"
            />
            <Field
              {...getFieldContent('hdMapOrigin', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapOrigin"
            />
            <Field
              {...getFieldContent('hdMapPrecision', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapPrecision"
            />
            <Field
              {...getFieldContent(
                'hdMapProjectionType',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapProjectionType"
            />

            <Field
              {...getFieldContent('hdMapRadar', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapRadar"
            />

            <Field
              {...getFieldContent(
                'hdMapRangeOfModeling',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapRangeOfModeling"
            />

            <Field
              {...getFieldContent(
                'hdMapRecordingTime',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapRecordingTime"
            />

            <Field
              {...getFieldContent('hdMapRoadTypes', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapRoadTypes"
            />

            <Field
              {...getFieldContent('hdMapSpeedLimit', content.metadata.fields)}
              component={Input}
              name="metadata.hdMapSpeedLimit"
            />

            <Field
              {...getFieldContent(
                'hdMapTrafficDirection',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapTrafficDirection"
            />

            <Field
              {...getFieldContent(
                'hdMapUsedDataSources',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.hdMapUsedDataSources"
            />

            <Field
              {...getFieldContent('MapLevel', content.metadata.fields)}
              component={Input}
              name="metadata.MapLevel"
            />
            <Field
              {...getFieldContent('geojson', content.metadata.fields)}
              component={Input}
              name="metadata.geojson"
            />
          </>
        )}
      {values.metadata.type === 'dataset' &&
        values.metadata.datasettype === 'environment' && (
          <>
            <Field
              {...getFieldContent(
                '3DEnvironmentSoftwareName',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentSoftwareName"
            />
            <Field
              {...getFieldContent(
                '3DEnvironmentSoftwareVendor',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentSoftwareVendor"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentSoftwareVersion',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentSoftwareVersion"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentFormat',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentFormat"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentFormatVersion',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentFormatVersion"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentDataSource',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentDataSource"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentTileCount',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentTileCount"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentTileSize',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentTileSize"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentTextureMaterialCount',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentTextureMaterialCount"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentTriangleCount',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentTriangleCount"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentDetailLevel',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentDetailLevel"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentTextureResolution',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentTextureResolution"
            />

            <Field
              {...getFieldContent(
                '3DEnvironmentPBRMaterials',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.3DEnvironmentPBRMaterials"
            />
            <Field
              {...getFieldContent('geojson', content.metadata.fields)}
              component={Input}
              name="metadata.geojson"
            />
          </>
        )}
      {values.metadata.type === 'dataset' &&
        values.metadata.datasettype === 'sensor' && (
          <>
            <Field
              {...getFieldContent(
                'authorOfSensorData',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.authorOfSensorData"
              label="Author of Sensor Data"
              example="prefix:AuthorIRI"
            />
            <Field
              {...getFieldContent('localization', content.metadata.fields)}
              component={Input}
              name="metadata.localization"
              label="SRMD Localization"
              example="prefix:LocalizationIRI"
            />
            <Field
              {...getFieldContent('environment', content.metadata.fields)}
              component={Input}
              name="metadata.environment"
              label="SRMD Environment"
              example="prefix:EnvironmentIRI"
            />
            <Field
              {...getFieldContent('producedBySensor', content.metadata.fields)}
              component={Input}
              name="metadata.producedBySensor"
              label="Sensor"
              example="prefix:SensorIRI"
            />
            <Field
              {...getFieldContent('authorContact', content.metadata.fields)}
              component={Input}
              name="metadata.authorContact"
              label="Author Contact"
              example="<+49 1234 456789> or <example@examplecompany.com>"
            />
            <Field
              {...getFieldContent(
                'sensorDataDocumentLink',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.sensorDataDocumentLink"
              label="Sensor Data Document Link"
              example="https://www.hierLiegtEinDocument.org/document..."
            />
            <Field
              {...getFieldContent('modelLink', content.metadata.fields)}
              component={Input}
              name="metadata.modelLink"
              label="Sensor Data Document"
              example="prefix:SensorDataFileIRI"
            />
            <Field
              {...getFieldContent('sensorName', content.metadata.fields)}
              component={Input}
              name="metadata.sensorName"
              label="Sensor Name"
              example="ARS548"
            />
            <Field
              {...getFieldContent(
                'showOptionalFields',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.showOptionalFields"
              type="checkbox"
              onChange={() => setShowOptionalFields(!showOptionalFields)}
            />

            {showOptionalFields && (
              <>
                <Field
                  {...getFieldContent(
                    'timeReferenceFrame',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.timeReferenceFrame"
                />
                <Field
                  {...getFieldContent('timeDuration', content.metadata.fields)}
                  component={Input}
                  name="metadata.timeDuration"
                />
                <Field
                  {...getFieldContent('timeStartTime', content.metadata.fields)}
                  component={Input}
                  name="metadata.timeStartTime"
                />
                <Field
                  {...getFieldContent('usedToolchain', content.metadata.fields)}
                  component={Input}
                  name="metadata.usedToolchain"
                />
                <Field
                  {...getFieldContent(
                    'sensorTestsetup',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorTestsetup"
                />
                <Field
                  {...getFieldContent(
                    'sensorDataContent',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorDataContent"
                />
                <Field
                  {...getFieldContent(
                    'gpsTraceDocumentLink',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.gpsTraceDocumentLink"
                />
                <Field
                  {...getFieldContent('modelLink', content.metadata.fields)}
                  component={Input}
                  name="metadata.modelLink"
                />
                <Field
                  {...getFieldContent(
                    'sensorTraceDocumentLink',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorTraceDocumentLink"
                />
                <Field
                  {...getFieldContent(
                    'sensorDataRawDocumentLink',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorDataRawDocumentLink"
                />
                <Field
                  {...getFieldContent(
                    'groundTruthDocumentLink',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.groundTruthDocumentLink"
                />
                <Field
                  {...getFieldContent(
                    'authorGivenName',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.authorGivenName"
                  label="Author Given Name"
                />
                <Field
                  {...getFieldContent(
                    'authorFamilyName',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.authorFamilyName"
                  label="Author Family Name"
                />
                <Field
                  {...getFieldContent('authorCompany', content.metadata.fields)}
                  component={Input}
                  name="metadata.authorCompany"
                  label="Author Company"
                />
                <Field
                  {...getFieldContent(
                    'sensorDataFileSize',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorDataFileSize"
                  label="Sensor Data File Size (in KB)"
                />
                <Field
                  {...getFieldContent(
                    'sensorDataFileChecksum',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorDataFileChecksum"
                  label="Sensor Data File Checksum"
                />
                <Field
                  {...getFieldContent(
                    'sensorDataFileMimetype',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorDataFileMimetype"
                  label="Sensor Data File Mimetype"
                />
                <Field
                  {...getFieldContent('sensorType', content.metadata.fields)}
                  component={Input}
                  name="metadata.sensorType"
                  label="Sensor Type"
                />
                <Field
                  {...getFieldContent(
                    'sensorHardwareVersion',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorHardwareVersion"
                  label="Sensor Hardware Version"
                />
                <Field
                  {...getFieldContent(
                    'sensorFirmwareVersion',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorFirmwareVersion"
                  label="Sensor Firmware Version"
                />
                <Field
                  {...getFieldContent(
                    'sensorManufacturerPartnumber',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorManufacturerPartnumber"
                  label="Sensor Manufacturer Partnumber"
                />
                <Field
                  {...getFieldContent(
                    'sensorTechnology',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorTechnology"
                  label="Sensor Technology"
                />
                <Field
                  {...getFieldContent(
                    'sensorTechnologyVariant',
                    content.metadata.fields
                  )}
                  component={Input}
                  name="metadata.sensorTechnologyVariant"
                  label="Sensor Technology Variant"
                />
                <Field
                  {...getFieldContent('sensorStatus', content.metadata.fields)}
                  component={Input}
                  name="metadata.sensorStatus"
                  label="Sensor Status"
                />
                <Field
                  {...getFieldContent('sensorPurpose', content.metadata.fields)}
                  component={Input}
                  name="metadata.sensorPurpose"
                  label="Sensor Purpose"
                />
              </>
            )}
          </>
        )}
      {values.metadata.type === 'dataset' &&
        values.metadata.datasettype === 'scenario' && (
          <>
            <Field
              {...getFieldContent(
                'SubjectVehicleSpeed',
                content.metadata.fields
              )}
              component={Input}
              name="metadata.SubjectVehicleSpeed"
            />

            <Field
              {...getFieldContent('TrafficAgentType', content.metadata.fields)}
              component={Input}
              name="metadata.TrafficAgentType"
            />

            <Field
              {...getFieldContent('BehaviourMotion', content.metadata.fields)}
              component={Input}
              name="metadata.BehaviourMotion"
            />

            <Field
              {...getFieldContent('Positioning', content.metadata.fields)}
              component={Input}
              name="metadata.Positioning"
            />
          </>
        )}
      {values.metadata.type === 'dataset' &&
        values.metadata.datasettype === 'custom shape' && (
          <>
            <Field
              {...getFieldContent('Positioning', content.metadata.fields)}
              component={Input}
              name="metadata.Positioning"
            />
          </>
        )}
      <Field
        {...getFieldContent('description', content.metadata.fields)}
        component={Input}
        name="metadata.description"
        rows={7}
      />
      <Field
        {...getFieldContent('author', content.metadata.fields)}
        component={Input}
        name="metadata.author"
      />
      <Field
        {...getFieldContent('tags', content.metadata.fields)}
        component={Input}
        name="metadata.tags"
      />

      {values.metadata.type === 'algorithm' && (
        <>
          <Field
            {...getFieldContent('dockerImage', content.metadata.fields)}
            component={Input}
            name="metadata.dockerImage"
            options={dockerImageOptions}
          />
          {values.metadata.dockerImage === 'custom' && (
            <>
              <Field
                {...getFieldContent(
                  'dockerImageCustom',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.dockerImageCustom"
              />
              <Field
                {...getFieldContent(
                  'dockerImageChecksum',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.dockerImageCustomChecksum"
                disabled={
                  values.metadata.dockerImageCustomChecksum && !meta.touched
                }
              />
              <Field
                {...getFieldContent(
                  'dockerImageCustomEntrypoint',
                  content.metadata.fields
                )}
                component={Input}
                name="metadata.dockerImageCustomEntrypoint"
              />
            </>
          )}
          <Field
            {...getFieldContent(
              'usesConsumerParameters',
              content.metadata.fields
            )}
            component={Input}
            name="metadata.usesConsumerParameters"
          />
          {values.metadata.usesConsumerParameters && (
            <Field
              {...getFieldContent(
                'consumerParameters',
                consumerParametersContent.consumerParameters.fields
              )}
              component={Input}
              name="metadata.consumerParameters"
            />
          )}
        </>
      )}
      <Field
        {...getFieldContent('termsAndConditions', content.metadata.fields)}
        component={Input}
        name="metadata.termsAndConditions"
      />
      <a
        className={styles.termsLink}
        href="/terms"
        rel="noopener noreferrer"
        target="_blank"
      >
        View Terms and Conditions
      </a>
    </>
  )
}
