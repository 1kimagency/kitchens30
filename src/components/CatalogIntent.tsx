import { ArrowRight } from "lucide-react";
import { caseStudies } from "../data/site";
import { withBasePath } from "../lib/paths";

export function CatalogIntent() {
  return (
    <section className="page-section catalog-section" id="catalog">
      <div className="section-heading section-heading-wide">
        <p className="section-kicker">Визуальные кейсы</p>
        <h2>Не россыпь похожих картинок. Один сценарий - одна серия фотографий.</h2>
        <p>
          Пока это не подтвержденные объекты с адресами и отзывами, а аккуратно собранные сценарии на базе материалов SURA.
          Дословные благодарности добавим только после согласования с реальными клиентами.
        </p>
      </div>
      <div className="intent-grid">
        {caseStudies.map((caseStudy) => (
          <a
            className={caseStudy.accent ? "intent-card intent-card-accent" : "intent-card"}
            href={withBasePath(`/cases/${caseStudy.slug}`)}
            key={caseStudy.slug}
          >
            <img src={caseStudy.image.src} alt={caseStudy.image.alt} />
            <div>
              <span>
                {caseStudy.kicker} / экономия {caseStudy.saving}
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
