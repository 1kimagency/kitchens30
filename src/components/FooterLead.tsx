type FooterLeadProps = {
  onAudit: () => void;
  onNew: () => void;
};

export function FooterLead({ onAudit, onNew }: FooterLeadProps) {
  return (
    <section className="footer-lead">
      <p className="section-kicker">Следующий шаг</p>
      <h2>Проверьте смету до предоплаты</h2>
      <p>
        Пришлите расчет из салона или размеры кухни. Покажем, где можно сэкономить без потери внешнего вида, хранения и
        нормального монтажа.
      </p>
      <div className="footer-actions">
        <button className="button button-primary" type="button" onClick={onAudit}>
          Проверить смету
        </button>
        <button className="button button-ghost" type="button" onClick={onNew}>
          Рассчитать по размерам
        </button>
      </div>
    </section>
  );
}
