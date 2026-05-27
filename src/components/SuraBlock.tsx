import { BadgeCheck, Factory, ScanSearch } from "lucide-react";
import { heroImages } from "../data/site";

export function SuraBlock() {
  return (
    <section className="page-section sura-section" id="sura">
      <div className="sura-copy">
        <p className="section-kicker">Прозрачность</p>
        <h2>Прозрачность сильнее обещаний про «свою фабрику»</h2>
        <p>
          Мы не просим поверить на слово. На каждом кейсе показываем исходную смету, что изменили, сколько удалось снизить и
          что осталось в проекте: фасады, модули, монтаж, доставка и сроки.
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
            <span>Понятная база производства</span>
            <strong>Видно, из каких материалов и модулей собирается кухня</strong>
          </div>
          <div>
            <ScanSearch aria-hidden="true" />
            <span>Наша работа</span>
            <strong>Проверяем смету, пересчитываем комплектацию и готовим понятный расчет</strong>
          </div>
          <div>
            <BadgeCheck aria-hidden="true" />
            <span>Покажем вашу экономию</span>
            <strong>Отделяем реальные обязательные позиции от того, за что можно не переплачивать</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
