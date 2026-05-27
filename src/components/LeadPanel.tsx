import type { FormEvent } from "react";
import type { LeadMode } from "../data/site";

type LeadPanelProps = {
  mode: LeadMode | null;
  onClose: () => void;
};

const modeCopy = {
  audit: {
    title: "Проверьте смету до предоплаты",
    intro:
      "Оставьте телефон и удобный способ связи. Можно прислать салонную смету, планировку, фото кухни или размеры - мы покажем, где есть потенциал снижения и что лучше не трогать.",
    extraLabel: "Смета, фото или скрин",
    extraType: "file",
    button: "Проверить смету",
  },
  new: {
    title: "Получите предварительный расчет кухни",
    intro:
      "Оставьте телефон и удобный способ связи. Можно прислать салонную смету, планировку, фото кухни или размеры - мы покажем, где есть потенциал снижения и что лучше не трогать.",
    extraLabel: "Размеры, планировка или фото помещения",
    extraType: "text",
    button: "Получить расчет",
  },
} satisfies Record<
  LeadMode,
  {
    title: string;
    intro: string;
    extraLabel: string;
    extraType: "file" | "text";
    button: string;
  }
>;

export function LeadPanel({ mode, onClose }: LeadPanelProps) {
  if (!mode) return null;

  const copy = modeCopy[mode];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Без имени");
    const phone = String(form.get("phone") || "Без телефона");
    const channel = String(form.get("channel") || "Канал не выбран");
    alert(`Заявка подготовлена: ${copy.title}\n${name}\n${phone}\n${channel}`);
    onClose();
  }

  return (
    <div className="lead-overlay" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <button className="lead-backdrop" type="button" aria-label="Закрыть форму" onClick={onClose} />
      <form className="lead-panel" onSubmit={handleSubmit}>
        <div>
          <p className="section-kicker">Заявка</p>
          <h2 id="lead-title">{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        <label>
          Имя
          <input name="name" autoComplete="name" placeholder="Как к вам обращаться" />
        </label>
        <label>
          Телефон
          <input name="phone" autoComplete="tel" inputMode="tel" placeholder="+7" required />
        </label>
        <label>
          Удобный канал связи
          <select name="channel" defaultValue="telegram">
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Звонок</option>
          </select>
        </label>
        <label>
          Что уже есть
          <select name="source" defaultValue={mode === "audit" ? "estimate" : "sizes"}>
            <option value="estimate">Смета из салона</option>
            <option value="sizes">Размеры кухни</option>
            <option value="photo">Фото помещения</option>
            <option value="plan">Планировка</option>
          </select>
        </label>
        <label>
          {copy.extraLabel}
          {copy.extraType === "file" ? (
            <input name="estimate" type="file" accept=".pdf,image/*" />
          ) : (
            <textarea name="details" rows={4} placeholder="Например: угловая 2400x1800, бюджет до 250 тыс." />
          )}
        </label>
        <p className="lead-disclaimer">
          Предварительный расчет не является финальной стоимостью. Точная цена зависит от размеров, выбранных материалов,
          фурнитуры, доставки и сборки.
        </p>
        <div className="lead-actions">
          <button className="button button-primary" type="submit">
            {copy.button}
          </button>
          <button className="button button-ghost" type="button" aria-label="Закрыть форму заявки" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </form>
    </div>
  );
}
