import { useQuery, useQueryClient } from '@tanstack/react-query'

export type Token = {
  chainId: number
  address: Address
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

type TokenList = {
  name: string
  timestamp: string
  version: {
    major: number
    minor: number
    patch: number
  }
  tags: Object
  logoURI: string
  keywords: string[]
  tokens: Token[]
}

const tokenListUrl = 'https://metadata.p.rainbow.me/token-list/rainbow-token-list.json'
const fetchTokenList = () => fetch(tokenListUrl).then((d) => d.json()).then(tk => tk.tokens)

export const useTokenList = (tokenListUrl: string) => {
  const queryClient = useQueryClient()
  return useQuery<TokenList>([tokenListUrl], () => , {
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess(data) {
      queryClient.setQueryData<Token[]>(allTokensQueryKey, (tokens = []) => [
        ...tokens,
        ...data.tokens,
      ])
    },
  })
}

