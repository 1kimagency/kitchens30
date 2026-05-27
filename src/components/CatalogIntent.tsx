import { ArrowRight } from "lucide-react";
import { caseStudies } from "../data/site";
import { withBasePath } from "../lib/paths";

export function CatalogIntent() {
  return (
    <section className="page-section catalog-section" id="catalog">
      <div className="section-heading section-heading-wide">
        <p className="section-kicker">Реальные разборы смет</p>
        <h2>Не набор похожих картинок. А понятные сценарии экономии.</h2>
        <p>
          Каждый кейс - отдельная задача: салонная смета, площадь, что изменили, сколько удалось снизить и почему кухня не
          стала выглядеть дешевле.
        </p>
      </div>
      <div className="intent-grid">
        {caseStudies.map((caseStudy) => (
          <a
            className={caseStudy.accent ? "intent-card intent-card-accent" : "intent-card"}
            href={withBasePath(`/cases/${caseStudy.slug}/`)}
            key={caseStudy.slug}
          >
            <img src={caseStudy.image.src} alt={caseStudy.image.alt} />
            <div>
              <span>
                {caseStudy.kicker} / снижение {caseStudy.saving}
              </span>
              <h3>{caseStudy.title}</h3>
              <p>{caseStudy.text}</p>
              <em>
                Смотреть кейс
                <ArrowRight aria-hidden="true" />
              </em>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
