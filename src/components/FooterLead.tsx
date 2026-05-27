type FooterLeadProps = {
  onAudit: () => void;
  onNew: () => void;
};

export function FooterLead({ onAudit, onNew }: FooterLeadProps) {
  return (
    <section className="footer-lead">
      <p className="section-kicker">Следующий шаг</p>
      <h2>До предоплаты у вас еще есть рычаг. После - только сожаление.</h2>
      <p>
        Пришлите смету сегодня. Если там нечего резать, так и скажем. Если салон раздул чек - покажем, где именно.
      </p>
      <div className="footer-actions">
        <button className="button button-primary" type="button" onClick={onAudit}>
          Проверить мою смету
        </button>
        <button className="button button-ghost" type="button" onClick={onNew}>
          Смета по размерам
        </button>
      </div>
    </section>
  );
}
