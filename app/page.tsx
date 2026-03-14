import { Header } from "./components/common/Header";
import { Banner } from "./components/Home/Banner";
import { TextTicker } from "./components/Home/TextTicker";
import { Features } from "./components/Home/Features";
import { AboutUs } from "./components/Home/AboutUs";
import { FAQ } from "./components/Home/FAQ";
import Footer from "./components/common/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Features />
      <TextTicker />
      <AboutUs />
      <FAQ />
      <Footer />
    </>
  );
}
