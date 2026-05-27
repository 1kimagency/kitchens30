import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronLeft, ChevronRight, MessageSquareQuote, Ruler, WalletCards, X } from "lucide-react";
import type { CaseStudy, LeadMode } from "../data/site";
import { withBasePath } from "../lib/paths";

type CasePageProps = {
  caseStudy: CaseStudy;
  onLead: (mode: LeadMode) => void;
};

export function CasePage({ caseStudy, onLead }: CasePageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const activeImage = activeImageIndex === null ? null : caseStudy.gallery[activeImageIndex];
  const hasMultipleImages = caseStudy.gallery.length > 1;
  const pageTitle = caseStudy.caseTitle;

  function showPreviousImage() {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return (currentIndex - 1 + caseStudy.gallery.length) % caseStudy.gallery.length;
    });
  }

  function showNextImage() {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return (currentIndex + 1) % caseStudy.gallery.length;
    });
  }

  useEffect(() => {
    if (activeImageIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
      }
      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }
      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, caseStudy.gallery.length]);

  return (
    <main className="case-page">
      <nav className="case-nav" aria-label="Навигация по кейсу">
        <a href={withBasePath("/#catalog")}>
          <ArrowLeft aria-hidden="true" />
          Все кейсы
        </a>
        <button type="button" onClick={() => onLead("audit")}>
          Проверить смету
        </button>
      </nav>

      <section className="case-hero">
        <div className="case-hero-copy">
          <p className="section-kicker">{caseStudy.location}</p>
          <h1>{pageTitle}</h1>
          <p>{caseStudy.clientStory}</p>
          <div className="case-numbers" aria-label="Итоги пересчета">
            <div>
              <span>Смета салона</span>
              <strong>{caseStudy.oldPrice}</strong>
            </div>
            <div>
              <span>После пересчета</span>
              <strong>{caseStudy.newPrice}</strong>
            </div>
            <div>
              <span>Снижение</span>
              <strong>{caseStudy.saving}</strong>
            </div>
          </div>
        </div>
        <div className="case-hero-media">
          <img src={caseStudy.gallery[0]} alt={caseStudy.image.alt} />
        </div>
      </section>

      <section className="case-content">
        <div className="case-gallery">
          {caseStudy.gallery.map((image, index) => (
            <button
              className="case-gallery-button"
              type="button"
              aria-label={`Открыть фото ${index + 1}: ${pageTitle}`}
              onClick={() => setActiveImageIndex(index)}
              key={image}
            >
              <img src={image} alt={`${pageTitle}. Фото ${index + 1}`} />
            </button>
          ))}
        </div>

        <aside className="case-sidebar">
          <div className="case-fact">
            <Ruler aria-hidden="true" />
            <span>Площадь</span>
            <strong>{caseStudy.area}</strong>
          </div>
          <div className="case-fact">
            <WalletCards aria-hidden="true" />
            <span>Снижение сметы</span>
            <strong>{caseStudy.saving}</strong>
          </div>
        </aside>
      </section>

      <section className="case-story-grid">
        <article>
          <BadgeCheck aria-hidden="true" />
          <h2>Что входило в заказ</h2>
          <ul>
            {caseStudy.order.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <BadgeCheck aria-hidden="true" />
          <h2>Что изменили в смете</h2>
          <ul>
            {caseStudy.whatChanged.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="case-thanks">
          <MessageSquareQuote aria-hidden="true" />
          <h2>Что покупатель обычно отмечает</h2>
          <p>{caseStudy.thanks}</p>
        </article>
      </section>

      <section className="case-cta">
        <p className="section-kicker">Ваш расчет</p>
        <h2>Хотите такой же разбор своей сметы?</h2>
        <div className="footer-actions">
          <button className="button button-primary" type="button" onClick={() => onLead("audit")}>
            Проверить смету
          </button>
          <button className="button button-ghost" type="button" onClick={() => onLead("new")}>
            Рассчитать по размерам
          </button>
        </div>
      </section>

      {activeImage && activeImageIndex !== null ? (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фото кухни">
          <button className="case-lightbox-backdrop" type="button" aria-label="Закрыть просмотр" onClick={() => setActiveImageIndex(null)} />
          <div className="case-lightbox-frame">
            <button className="case-lightbox-close" type="button" aria-label="Закрыть просмотр" onClick={() => setActiveImageIndex(null)}>
              <X aria-hidden="true" />
            </button>
            {hasMultipleImages ? (
              <button className="case-lightbox-nav case-lightbox-prev" type="button" aria-label="Предыдущее фото" onClick={showPreviousImage}>
                <ChevronLeft aria-hidden="true" />
              </button>
            ) : null}
            <img src={activeImage} alt={`${pageTitle}. Фото ${activeImageIndex + 1} крупно`} />
            {hasMultipleImages ? (
              <button className="case-lightbox-nav case-lightbox-next" type="button" aria-label="Следующее фото" onClick={showNextImage}>
                <ChevronRight aria-hidden="true" />
              </button>
            ) : null}
            <div className="case-lightbox-caption">
              <span>{caseStudy.location}</span>
              <strong>
                Фото {activeImageIndex + 1} из {caseStudy.gallery.length}
              </strong>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
