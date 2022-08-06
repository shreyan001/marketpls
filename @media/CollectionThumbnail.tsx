import { Box, Flex, Label, BoxProps } from '@zoralabs/zord'
import { nftThumbnail } from './NftMedia.css'
import { useNFT } from '@zoralabs/nft-hooks'
import { useRawImageTransform } from './hooks/useRawImageTransform'
import { ImageElement } from 'components'

export type SizeProps = '100%' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | undefined

export const returnThumbnailSize = (size: SizeProps) => {
  switch (size) {
    case '100%':
      return '100%'
    case 'xxs':
      return 'x8'
    case 'xs':
      return 'x10'
    case 'sm':
      return 'x14'
    case 'md':
      return 'x20'
    case 'lg':
      return 'x30'
    default:
      return '100%'
  }
}

export interface CollectionThumbnailProps extends BoxProps {
  collectionAddress: string | undefined
  tokenId?: string
  size?: SizeProps
  radius?: 'curved' | 'round' | 'phat' | undefined
  useTitle?: boolean
  thumbnailStyle?: any
}

export function CollectionThumbnail({
  collectionAddress,
  tokenId = '1',
  size = 'md',
  radius = undefined,
  useTitle = false,
  thumbnailStyle,
  ...props
}: CollectionThumbnailProps) {
  const { data } = useNFT(collectionAddress, tokenId)
  const { image } = useRawImageTransform(data?.media?.image?.uri)

  if (!collectionAddress) return null

  return (
    <Flex align="center" gap="x4" {...props}>
      <Box
        h={returnThumbnailSize(size)}
        position="relative"
        borderRadius={radius}
        className={['zora-media__nft-thumbnail', nftThumbnail]}
      >
        <ImageElement src={image} />
      </Box>
      {useTitle && <Label size="sm">{data?.nft?.contract?.name}</Label>}
    </Flex>
  )
}
