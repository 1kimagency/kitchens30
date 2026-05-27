import { ArrowRight, FileSearch, Ruler, Sparkles } from "lucide-react";
import { heroImages, proofPoints, type LeadMode } from "../data/site";

type HeroProps = {
  onLead: (mode: LeadMode) => void;
};

export function Hero({ onLead }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-noise" aria-hidden="true" />
      <nav className="top-nav" aria-label="Главная навигация">
        <a className="brand" href="#top" aria-label="Кухни 30">
          Кухни <span>30</span>
        </a>
        <div className="nav-links">
          <a href="#process">Проверить смету</a>
          <a href="#catalog">Кейсы</a>
          <a href="#sura">Как считаем</a>
          <a href="#lead">Москва и МО</a>
        </div>
        <button className="nav-button" type="button" onClick={() => onLead("audit")}>
          Получить расчет
        </button>
      </nav>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="pill">
            <Sparkles aria-hidden="true" />
            Аналитический разбор сметы без переплаты
          </p>
          <h1>
            <span>Кухня под ваш размер</span> без сетевой переплаты
          </h1>
          <p className="hero-lead">
            Пришлите салонную смету, размеры или фото кухни. Мы проверим комплектацию, уберем лишние позиции и покажем,
            где можно сэкономить без потери внешнего вида, хранения и нормального монтажа.
          </p>

          <div className="proof-grid">
            {proofPoints.map((point) => (
              <div className="proof-card" key={point.value}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions" id="lead">
            <button
              className="lead-choice lead-choice-primary"
              type="button"
              aria-label="Проверить салонную смету"
              onClick={() => onLead("audit")}
            >
              <FileSearch aria-hidden="true" />
              <span>
                <strong>Проверить смету</strong>
                <small>PDF, фото или скрин. Сравним состав заказа по строкам.</small>
              </span>
              <ArrowRight aria-hidden="true" />
            </button>
            <button className="lead-choice" type="button" aria-label="Рассчитать кухню по размерам" onClick={() => onLead("new")}>
              <Ruler aria-hidden="true" />
              <span>
                <strong>Рассчитать по размерам</strong>
                <small>Размер, стиль, бюджет. Покажем ориентир до замера.</small>
              </span>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="Примеры кухонь SURA">
          <div className="hero-photo-frame">
            <img className="hero-photo" src={heroImages[0].src} alt={heroImages[0].alt} />
            <div className="scan-line" aria-hidden="true" />
            <div className="photo-caption">
              <span>Реальные коллекции SURA</span>
              <strong>фасады, модули, проект</strong>
            </div>
          </div>

          <div className="audit-card">
            <div className="audit-head">
              <span>Потенциал снижения сметы</span>
              <strong>до 30%</strong>
            </div>
            <div className="audit-row">
              <span>Салонная смета</span>
              <i>
                <b />
              </i>
              <em>100%</em>
            </div>
            <div className="audit-row">
              <span>После пересчета</span>
              <i>
                <b className="accent" />
              </i>
              <em>до 70-95%</em>
            </div>
            <p className="audit-note">Итог зависит от размеров, материалов, фурнитуры и состава работ.</p>
          </div>

          <div className="image-marquee" aria-hidden="true">
            {[heroImages[1], heroImages[2], heroImages[3], heroImages[4], heroImages[1], heroImages[2]].map((image, index) => (
              <img src={image.src} alt="" key={`${image.src}-${index}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div>
          <span>Проверка салонной сметы</span>
          <span>Дизайн-проект 0 ₽</span>
          <span>Замер Москва и МО 0 ₽</span>
          <span>SURA открыто</span>
          <span>Доставка и монтаж отдельно</span>
          <span>Проверка салонной сметы</span>
          <span>Дизайн-проект 0 ₽</span>
          <span>Замер Москва и МО 0 ₽</span>
        </div>
      </div>
    </section>
  );
}
