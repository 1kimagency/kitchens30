import { BadgeCheck, Truck, Wrench } from "lucide-react";

export function PricingTruth() {
  return (
    <section className="page-section pricing-section">
      <div className="pricing-card">
        <div className="pricing-copy">
          <p className="section-kicker">Честная смета</p>
          <h2>Дешевле кухня, а не обещания.</h2>
          <p>
            Мы не прячем платные работы внутри красивой фразы “под ключ”. Сначала снижать нужно цену мебели и комплектации,
            а доставку и монтаж показывать отдельно.
          </p>
        </div>
        <div className="pricing-columns">
          <div className="pricing-item pricing-item-free">
            <BadgeCheck aria-hidden="true" />
            <span>0 ₽</span>
            <strong>расчет, дизайн-проект, замер по Москве и МО</strong>
          </div>
          <div className="pricing-item">
            <Truck aria-hidden="true" />
            <span>Отдельно</span>
            <strong>доставка, подъем, занос</strong>
          </div>
          <div className="pricing-item">
            <Wrench aria-hidden="true" />
            <span>Отдельно</span>
            <strong>монтаж и подключение</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
