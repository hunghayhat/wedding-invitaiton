import { Countdown } from "../components/Countdown";
import { Gallery } from "../components/Gallery";
import { Gift } from "../components/Gift";
import { Hero } from "../components/Hero";
import { Invitation } from "../components/Invitation";
import { RsvpPlaceholder } from "../components/RsvpPlaceholder";
import { WeddingFlow } from "../components/WeddingFlow";

export default function Home() {
  return (
    <main>
      <Hero />
      <WeddingFlow />
      <Invitation />
      <Countdown />
      <Gallery />
      <Gift />
      <RsvpPlaceholder />
    </main>
  );
}
