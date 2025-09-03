import StylesBar from '@/components/admin/styles/StylesBar'
import AddStyleContainer from '@/components/admin/styles/AddStyleContainer'
import { fetchStyles } from '@/lib/api/styles'

export const dynamic = 'force-dynamic' // Отключает статическую генерацию
export const revalidate = 0 // Отключает кэширование

export default function StylesPage() {
  const stylesPromise = fetchStyles()
  return (
    <>
      <AddStyleContainer/>
      <StylesBar promise={stylesPromise}/>
    </>
  )
}
