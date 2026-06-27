import { LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import DomainCard from "../components/DomainCard";
import { useDomains } from "../hooks/useSiteData";
import useScrollReveal from "../hooks/useScrollReveal";

export default function DomainsIndex() {
  const { t } = useTranslation();
  const { data: domains = [] } = useDomains();
  const sectionRef = useScrollReveal();

  return (
    <div className="font-body">
      <Navbar transparentOnTop={false} />
      <section className="pt-40 pb-24 px-6" ref={sectionRef}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <SectionHeading
              icon={LayoutGrid}
              eyebrow={t('domainsIndex.eyebrow')}
              variant="brand"
              title={t('domainsIndex.title')}
              description={t('domainsIndex.description')}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 stagger-children">
            {domains.map((d) => (
              <div key={d.slug} className="reveal">
                <DomainCard domain={d} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
