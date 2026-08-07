import SiteContainer from "@/components/SiteContainer"
import AdvantagesContainer from "@/components/site/pages/Main/AdvantagesContainer"
import KitchenMainContainer from "@/components/site/pages/Kitchens/KitchenMainContainer"

export default function KitchensPage() {
  return (
    <>
      <KitchenMainContainer/>
      <SiteContainer>
        <AdvantagesContainer/>
      </SiteContainer></>
  )
}