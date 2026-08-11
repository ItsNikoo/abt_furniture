import SiteContainer from "@/components/SiteContainer"
import AdvantagesContainer from "@/components/site/AdvantagesContainer"
import WardrobesMainContainer from "@/components/site/pages/Wardrobes/WardrobesMainContainer"
import WardrobesPortfolio from "@/components/site/pages/Wardrobes/WardrobesPortfolio"
import ServicesContainer from "@/components/site/ServicesContainer"

export default function WardrobesPage() {
  return (
    <>
      <WardrobesMainContainer/>
      <SiteContainer>
        <AdvantagesContainer/>
      </SiteContainer>
      <WardrobesPortfolio/>
      <SiteContainer>
        <ServicesContainer/>
      </SiteContainer>
    </>
  )
}