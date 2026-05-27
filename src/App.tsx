import { useState } from "react";
import { CasePage } from "./components/CasePage";
import { CatalogIntent } from "./components/CatalogIntent";
import { FooterLead } from "./components/FooterLead";
import { Hero } from "./components/Hero";
import { LeadPanel } from "./components/LeadPanel";
import { PricingTruth } from "./components/PricingTruth";
import { Process } from "./components/Process";
import { SuraBlock } from "./components/SuraBlock";
import { caseStudies, type LeadMode } from "./data/site";
import { getAppPath } from "./lib/paths";

export default function App() {
  const [leadMode, setLeadMode] = useState<LeadMode | null>(null);
  const caseSlug = getAppPath().match(/^\/cases\/([^/]+)\/?$/)?.[1];
  const activeCase = caseStudies.find((caseStudy) => caseStudy.slug === caseSlug);

  if (activeCase) {
    return (
      <>
        <CasePage caseStudy={activeCase} onLead={setLeadMode} />
        <LeadPanel mode={leadMode} onClose={() => setLeadMode(null)} />
      </>
    );
  }

  return (
    <main id="top">
      <Hero onLead={setLeadMode} />
      <Process />
      <CatalogIntent />
      <SuraBlock />
      <PricingTruth />
      <FooterLead onAudit={() => setLeadMode("audit")} onNew={() => setLeadMode("new")} />
      <LeadPanel mode={leadMode} onClose={() => setLeadMode(null)} />
    </main>
  );
}
