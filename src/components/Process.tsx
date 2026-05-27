import { ArrowDownRight, ReceiptText } from "lucide-react";
import { auditFindings, processSteps } from "../data/site";

export function Process() {
  return (
    <section className="page-section process-section reveal-band" id="process">
      <div className="section-heading section-heading-wide">
        <p className="section-kicker">Разбор сметы</p>
        <h2>Не просим “скидку”. Вскрываем, где салон положил деньги в цену.</h2>
        <p>
          Покупатель обычно видит красивую сумму и пару обещаний. Мы раскладываем расчет на детали: что реально нужно кухне,
          а что добавлено, чтобы чек выглядел солиднее.
        </p>
      </div>
      <div className="audit-layout">
        <div className="receipt-panel">
          <div className="receipt-top">
            <span>
              <ReceiptText aria-hidden="true" />
              салонная смета
            </span>
            <strong>100%</strong>
          </div>
          {auditFindings.map((finding) => (
            <div className="receipt-line" key={finding.label}>
              <div>
                <b>{finding.label}</b>
                <p>{finding.text}</p>
              </div>
              <strong>{finding.value}</strong>
            </div>
          ))}
          <div className="receipt-result">
            <span>После пересборки</span>
            <strong>≈70%</strong>
          </div>
        </div>

        <div className="step-grid">
          {processSteps.map((step, index) => (
            <article className="step-card magic-surface" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <ArrowDownRight aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
