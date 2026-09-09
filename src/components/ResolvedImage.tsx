import { useResolvedImage } from '../lib/resolveImages'

export default function ResolvedImage({
  src,
  alt = '',
  className,
  loading,
}: {
  src: string
  alt?: string
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const resolved = useResolvedImage(src)
  return <img src={resolved} alt={alt} className={className} loading={loading} />
}
