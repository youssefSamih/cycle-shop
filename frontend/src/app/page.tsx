import Header from './components/header';
import Footer from './components/footer';
import AboutSection from './components/about';
import ContactForm from './components/contact';
import BannerSection from './components/banner';
import IntroductionSection from './components/introduction';

// ~~~~~~ Component

export default function Home() {
  // ~~~~~~ Render

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <BannerSection />

      <AboutSection />

      <IntroductionSection />

      <ContactForm />

      <Footer />
    </div>
  );
}
