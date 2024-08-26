import Image from "next/image";
import Carousel from "@/components/component/component";
import LandingPage from "@/components/component/LandingPage";
import Navbar from "@/components/component/Navbar";
import { Head } from "next/document";
import SecondPage from "@/components/component/secondpage";
import RegisterSteps from "@/components/component/registerSteps";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
        <LandingPage />
        <SecondPage />
        <RegisterSteps />
      </div>
    </div>
  );
}
