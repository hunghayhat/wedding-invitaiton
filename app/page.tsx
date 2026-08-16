import { Countdown } from "../components/Countdown";
import { Gallery } from "../components/Gallery";
import { Hero } from "../components/Hero";
import { Invitation } from "../components/Invitation";
import { Location } from "../components/Location";
import { RsvpPlaceholder } from "../components/RsvpPlaceholder";
import { WeddingInfo } from "../components/WeddingInfo";

export default function Home() {
  return (
    <main>
      <Hero />
      <Invitation />
      <WeddingInfo />
      <Countdown />
      <Gallery />
      <Location />
      <RsvpPlaceholder />
    </main>
  );
}
