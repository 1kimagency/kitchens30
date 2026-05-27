import { useEffect, useState } from "react";
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

  useEffect(() => {
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (activeCase) {
      document.title = `${activeCase.caseTitle} | Разбор сметы кухни | Кухни 30`;
      description?.setAttribute(
        "content",
        "Разбор сметы кухни: что входило в заказ, что изменили в комплектации и сколько удалось снизить без потери внешнего вида.",
      );
      return;
    }

    document.title = "Кухни под размер без сетевой переплаты | Проверка сметы кухни";
    description?.setAttribute(
      "content",
      "Проверим салонную смету или рассчитаем кухню по размерам. Покажем, где можно сэкономить без потери внешнего вида, хранения и нормального монтажа. Москва и МО.",
    );
  }, [activeCase]);

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
