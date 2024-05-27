import { useAsset } from '@context/Asset'
import { Asset } from '@oceanprotocol/lib'
import AddToken from '@shared/AddToken'
import ExplorerLink from '@shared/ExplorerLink'
import Publisher from '@shared/Publisher'
import React, { ReactElement } from 'react'
import { useAccount } from 'wagmi'
import styles from './MetaAsset.module.css'
import accountNames from '../../../../../peproAdresses.json'

export default function MetaAsset({
  asset,
  isBlockscoutExplorer
}: {
  asset: AssetExtended
  isBlockscoutExplorer: boolean
}): ReactElement {
  const { isAssetNetwork } = useAsset()
  const { connector: activeConnector } = useAccount()

  const dataTokenSymbol = asset?.datatokens[0]?.symbol

  // This function attempts to find a user-friendly name for an account ID.
  // If a name is defined in `accountNames`, it's used. Otherwise, it tries to use `accountEns`.
  // If neither is found, it defaults to a truncated account ID.
  function getAccountName(address: string): string {
    return accountNames[address] || address
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.owner}>
        Owned by {getAccountName(asset?.nft?.owner)}
      </span>
      <span>
        <ExplorerLink
          className={styles.datatoken}
          networkId={asset?.chainId}
          path={
            isBlockscoutExplorer
              ? `tokens/${asset?.services?.[0]?.datatokenAddress}`
              : `token/${asset?.services?.[0]?.datatokenAddress}`
          }
        >
          {`Accessed with ${dataTokenSymbol}`}
        </ExplorerLink>
        {activeConnector?.name === 'MetaMask' && isAssetNetwork && (
          <span className={styles.addWrap}>
            <AddToken
              address={asset?.services[0].datatokenAddress}
              symbol={(asset as Asset)?.datatokens[0]?.symbol}
              text={`Add ${(asset as Asset)?.datatokens[0]?.symbol} to wallet`}
              className={styles.add}
              minimal
            />
          </span>
        )}
      </span>
    </div>
  )
}
