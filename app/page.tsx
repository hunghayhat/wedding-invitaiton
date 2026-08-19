import { CardSparkles } from "../components/CardSparkles";
import { Countdown } from "../components/Countdown";
import { Gallery } from "../components/Gallery";
import { Gift } from "../components/Gift";
import { Hero } from "../components/Hero";
import { Invitation } from "../components/Invitation";
import { InvitationGate } from "../components/InvitationGate";
import { RsvpPlaceholder } from "../components/RsvpPlaceholder";
import { WeddingFlow } from "../components/WeddingFlow";

export default function Home() {
  return (
    <InvitationGate>
      <div className="min-h-screen bg-[#e9d8c2] sm:py-12">
        <main className="@container relative mx-auto w-full max-w-[30rem] overflow-hidden bg-[#fff7e6] shadow-[0_24px_70px_rgba(74,18,18,0.22)] sm:rounded-2xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <CardSparkles />
          <Hero />
          <WeddingFlow />
          <Invitation />
          <Countdown />
          <Gallery />
          <Gift />
          <RsvpPlaceholder />
        </main>
      </div>
    </InvitationGate>
  );
}
