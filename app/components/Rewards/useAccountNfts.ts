import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Address } from 'viem'

type ChainName = 'eth-mainnet' | 'zora-mainnet' | 'zora-testnet'
const COVALENT_KEY = 'cqt_rQ7FfcFKbTJ36vqHQQFXBGDFqbwp'

type NFTResponse = {
  data: {
    items: Array<{
      contract_name: string
      contract_ticker_symbol: string
      contract_address: Address
      is_spam: false
      balance: number
      balance_24h: number
      type: 'nft'
      nft_data: Array<{
        token_id: string
        token_url: string
        original_owner: Address
        external_data: {
          name: string
          description: string
          asset_url: string
          asset_file_extension: 'png'
          asset_mime_type: 'image/png'
          asset_size_bytes: string
          image: string
          image_256: string
          image_512: string
          image_1024: string
          animation_url: string | null
          external_url: string
        }
        asset_cached: true
        image_cached: true
      }>
    }>
  }
}

const headers = { Authorization: `Bearer ${COVALENT_KEY}` }

const fetchAccountNfts = async ({ chain, account }: { chain: ChainName; account: Address }) => {
  const nftResponse = await fetch(
    `https://api.covalenthq.com/v1/${chain}/address/${account}/balances_nft/`,
    { headers },
  )
    .then((d) => d.json() as Promise<NFTResponse>)
    .then((d) => d.data)

  const parsedResponse = nftResponse.items
    .map((nft, i) =>
      nft.nft_data.map((data) => ({
        contract_address: nft.contract_address,
        id: `${nft.contract_address} ${data.token_id} ${i}`,
        ...data,
        ...data.external_data,
      })),
    )
    .flat(2)

  const nftsWithPreloadedImages = await Promise.all(
    parsedResponse
      .filter((n) => !!n.image_256)
      .map(
        (nft): Promise<(typeof parsedResponse)[number] | null> =>
          new Promise((r) => {
            const image = new Image()
            image.src = nft.image_256
            image.onload = () => r(nft)
            image.onerror = () => r(null)
          }),
      ),
  )

  return nftsWithPreloadedImages.filter(Boolean)
}

type NFTs = Awaited<ReturnType<typeof fetchAccountNfts>>

export const useAccountNFTs = ({
  chain,
  account,
  ...options
}: { chain?: ChainName; account?: Address } & Omit<
  UseQueryOptions<NFTs>,
  'queryKey' | 'queryFn' | 'initialData'
>) => {
  return useQuery<NFTs>({
    queryKey: ['nfts', chain, account],
    queryFn: () => fetchAccountNfts({ chain: chain!, account: account! }),
    enabled: !!chain && !!account,
    ...options,
  })
}
