import AboutSection from './components/about';
import ContactForm from './components/contact';
import BannerSection from './components/banner';
import IntroductionSection from './components/introduction';
import { PageWrapper } from './components/page-wrapper';

// ~~~~~~ Component

export default function Home() {
  // ~~~~~~ Render

  return (
    <PageWrapper>
      <BannerSection />

      <AboutSection />

      <IntroductionSection />

      <ContactForm />
    </PageWrapper>
  );
}
