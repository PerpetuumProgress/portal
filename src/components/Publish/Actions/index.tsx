import React, { FormEvent, ReactElement, RefObject } from 'react'
import Button from '@shared/atoms/Button'
import styles from './index.module.css'
import { FormikContextType, useFormikContext } from 'formik'
import { FormPublishData } from '../_types'
import { wizardSteps } from '../_constants'
import SuccessConfetti from '@shared/SuccessConfetti'
import { useRouter } from 'next/router'
import Tooltip from '@shared/atoms/Tooltip'
import AvailableNetworks from '@components/Publish/AvailableNetworks'
import Info from '@images/info.svg'
import Loader from '@shared/atoms/Loader'
import useNetworkMetadata from '@hooks/useNetworkMetadata'
import IPFS from 'ipfs'

export default function Actions({
  scrollToRef,
  did
}: {
  scrollToRef: RefObject<any>
  did: string
}): ReactElement {
  const router = useRouter()
  const { isSupportedOceanNetwork } = useNetworkMetadata()
  const {
    values,
    errors,
    isValid,
    isSubmitting
  }: FormikContextType<FormPublishData> = useFormikContext()
  // async function handleActivation(e: FormEvent<HTMLButtonElement>) {
  //   // prevent accidentially submitting a form the button might be in
  //   e.preventDefault()

  //   await connect()
  // }

  function handleAction(action: string) {
    const currentStep: string = router.query.step as string
    router.push({
      pathname: `${router.pathname}`,
      query: { step: parseInt(currentStep) + (action === 'next' ? +1 : -1) }
    })
    scrollToRef.current.scrollIntoView()
  }

  function handleNext(e: FormEvent) {
    e.preventDefault()
    handleAction('next')
  }
  const generateClaim = async (e: FormEvent) => {
    e.preventDefault()

    const { metadata } = values

    const formattedJson = {
      '@context': {
        openlabel: 'https://openlabel.asam.net/V1-0-0/ontologies/',
        dct: 'http://purl.org/dc/terms/',
        plcgit: 'https://github.com/GAIA-X4PLC-AAD/map-and-scenario-data/',
        sh: 'http://www.w3.org/ns/shacl#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        gaxtrustframework: 'http://w3id.org/gaia-x/gax-trust-framework#',
        plc: 'https://www.msg.group/ontologies/gxplcaad/v1.0/',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        foaf: 'http://xmlns.com/foaf/0.1/'
      },
      '@id': 'did:example:map1', // This might be dynamically generated or entered by the user
      '@type': 'plcgit:HDMap'
    }

    // Loop through metadata and add new fields to formattedJson
    for (const key in metadata) {
      if (metadata[key] !== undefined) {
        formattedJson[`plcgit:${key}`] = {
          '@value': metadata[key].toString(),
          '@type': 'xsd:float' // Adjust this based on the actual type of metadata[key]
        }
      }
    }

    // Assuming `values` is the form state that you want to convert to JSON
    const jsonDocument = JSON.stringify(formattedJson, null, 2)
    const blob = new Blob([jsonDocument], { type: 'application/json' })
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.download = 'claimFile.json'

    const buffer = Buffer.from(jsonDocument)
    const ipfs = IPFS.create()
    const result = await (await ipfs).add(buffer)
    console.log('File stored on IPFS with CID:', result.path)
    window.alert('File stored on IPFS with content identifier: ' + result.path)

    // Append the link to the document body and simulate a click event to trigger the download
    document.body.appendChild(downloadLink)
    downloadLink.click()

    // Clean up the link
    document.body.removeChild(downloadLink)
  }

  function handlePrevious(e: FormEvent) {
    e.preventDefault()
    handleAction('prev')
  }

  const isContinueDisabled =
    (values.user.stepCurrent === 1 && errors.metadata !== undefined) ||
    (values.user.stepCurrent === 2 && errors.services !== undefined) ||
    (values.user.stepCurrent === 3 && errors.pricing !== undefined)

  const hasSubmitError =
    values.feedback?.[1].status === 'error' ||
    values.feedback?.[2].status === 'error' ||
    values.feedback?.[3].status === 'error'

  return (
    <footer className={styles.actions}>
      {did ? (
        <SuccessConfetti
          success="Successfully published!"
          action={
            <Button style="primary" to={`/asset/${did}`}>
              View Asset
            </Button>
          }
        />
      ) : (
        <>
          {values.user.stepCurrent > 1 && (
            <Button onClick={handlePrevious} disabled={isSubmitting}>
              Back
            </Button>
          )}

          {values.user.stepCurrent === 1 && (
            <Button
              style="primary"
              onClick={generateClaim}
              disabled={isContinueDisabled}
            >
              Generate Claims
            </Button>
          )}

          {values.user.stepCurrent < wizardSteps.length ? (
            <Button
              style="primary"
              onClick={handleNext}
              disabled={isContinueDisabled}
            >
              Continue
            </Button>
          ) : // !address ? (
          // <Button type="submit" style="primary" onClick={handleActivation}>
          //   Connect Wallet
          // </Button>
          // ) :
          !isSupportedOceanNetwork ? (
            <Tooltip content={<AvailableNetworks />}>
              <Button
                type="submit"
                style="primary"
                disabled
                className={styles.infoButton}
              >
                Unsupported Network <Info className={styles.infoIcon} />
              </Button>
            </Tooltip>
          ) : (
            <Button
              type="submit"
              style="primary"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <Loader white />
              ) : hasSubmitError ? (
                'Retry'
              ) : (
                'Submit'
              )}
            </Button>
          )}
        </>
      )}
    </footer>
  )
}
