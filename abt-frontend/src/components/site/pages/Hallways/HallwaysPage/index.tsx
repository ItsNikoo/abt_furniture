import SiteContainer from "@/components/SiteContainer"
import AdvantagesContainer from "@/components/site/pages/Main/AdvantagesContainer"
import HallwaysMainContainer from "@/components/site/pages/Hallways/HallwaysMainContainer"

export default function HallwaysPage() {
  return (
    <>
      <HallwaysMainContainer/>
      <SiteContainer>
        <AdvantagesContainer/>
      </SiteContainer>
    </>
  )
}