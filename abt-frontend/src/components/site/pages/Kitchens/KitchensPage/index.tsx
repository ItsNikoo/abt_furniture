import SiteContainer from "@/components/SiteContainer"
import AdvantagesContainer from "@/components/site/AdvantagesContainer"
import KitchenMainContainer from "@/components/site/pages/Kitchens/KitchenMainContainer"
import KitchensPortfolio from "@/components/site/pages/Kitchens/KitchensPortfolio"
import ServicesContainer from "@/components/site/ServicesContainer"

export default function KitchensPage() {
  return (
    <>
      <KitchenMainContainer/>
      <SiteContainer>
        <AdvantagesContainer/>
      </SiteContainer>
      <KitchensPortfolio/>
      <SiteContainer>
        <ServicesContainer/>
      </SiteContainer>
    </>
  )
}