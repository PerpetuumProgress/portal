import { BoxSelectionOption } from '@shared/FormInput/InputElement/BoxSelection'
import Input from '@shared/FormInput'
import { Field, useField, useFormikContext } from 'formik'
import React, { ReactElement, useEffect } from 'react'
import content from '../../../../content/publish/form.json'
import consumerParametersContent from '../../../../content/publish/consumerParameters.json'
import { FormPublishData } from '../_types'
import IconDataset from '@images/dataset.svg'
import IconScenarioDataset from '@images/scenario.svg'
import IconTrackDataset from '@images/traffic.svg'
import IconEnvironmentDataset from '@images/Environment.svg'
import IconAlgorithm from '@images/algorithm.svg'
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
      checked: values.metadata.datasettype === 'environment model',
      icon: <IconEnvironmentDataset />
    },
    {
      name: datasettypeOptionsTitles[3].toLowerCase(),
      title: datasettypeOptionsTitles[3],
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
        values.metadata.datasettype === 'environment model' && (
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
