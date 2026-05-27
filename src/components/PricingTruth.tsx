import { BadgeCheck, Truck, Wrench } from "lucide-react";

export function PricingTruth() {
  return (
    <section className="page-section pricing-section">
      <div className="pricing-card">
        <div className="pricing-copy">
          <p className="section-kicker">Честная смета</p>
          <h2>Дешевле должна стать кухня, а не ожидания клиента</h2>
          <p>
            Мы не обещаем волшебную цену без проверки. Сначала смотрим размеры, фасады, модули, фурнитуру, доставку и
            монтаж. Потом показываем, где есть потенциал снижения сметы, а где снижать нельзя без потери качества.
          </p>
        </div>
        <div className="pricing-columns">
          <div className="pricing-item pricing-item-free">
            <BadgeCheck aria-hidden="true" />
            <span>Расчет, проект и замер</span>
            <strong>Работаем с размерами, планировкой и задачей, а не только с красивой картинкой</strong>
          </div>
          <div className="pricing-item">
            <Truck aria-hidden="true" />
            <span>Сравнение состава</span>
            <strong>Сравниваем комплектацию, материалы, фурнитуру и работы, а не рекламные цены от</strong>
          </div>
          <div className="pricing-item">
            <Wrench aria-hidden="true" />
            <span>Смета по строкам</span>
            <strong>Показываем, что входит в заказ, а что считается отдельно</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
