import { BadgeCheck, Factory, ScanSearch } from "lucide-react";
import { heroImages } from "../data/site";

export function SuraBlock() {
  return (
    <section className="page-section sura-section" id="sura">
      <div className="sura-copy">
        <p className="section-kicker">SURA</p>
        <h2>Прозрачность продает сильнее, чем сказка про “свою фабрику”.</h2>
        <p>
          Мы открыто работаем на базе SURA: показываем реальные фасады, модульный ряд и изображения производителя. Сила не в
          легенде, а в том, что покупатель понимает, за что платит.
        </p>
      </div>

      <div className="sura-board">
        <div className="sura-photo-stack" aria-hidden="true">
          {heroImages.slice(0, 4).map((image) => (
            <img src={image.src} alt="" key={image.src} />
          ))}
        </div>
        <div className="sura-points">
          <div>
            <Factory aria-hidden="true" />
            <span>Производитель</span>
            <strong>SURA без маскировки</strong>
          </div>
          <div>
            <ScanSearch aria-hidden="true" />
            <span>Наша работа</span>
            <strong>расчет, проект, замер, сборка сметы</strong>
          </div>
          <div>
            <BadgeCheck aria-hidden="true" />
            <span>Покупатель видит</span>
            <strong>где мебель, где работы, где доплаты</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
