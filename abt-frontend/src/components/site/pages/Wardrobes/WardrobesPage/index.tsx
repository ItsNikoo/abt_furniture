import SiteContainer from "@/components/SiteContainer"
import AdvantagesContainer from "@/components/site/pages/Main/AdvantagesContainer"
import WardrobesMainContainer from "@/components/site/pages/Wardrobes/WardrobesMainContainer"

export default function WardrobesPage() {
  return (
    <>
      <WardrobesMainContainer/>
      <SiteContainer>
        <AdvantagesContainer/>
      </SiteContainer>
    </>
  )
}