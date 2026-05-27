import type { FormEvent } from "react";
import type { LeadMode } from "../data/site";

type LeadPanelProps = {
  mode: LeadMode | null;
  onClose: () => void;
};

const modeCopy = {
  audit: {
    title: "Проверим салонную смету",
    intro: "Загрузите PDF, фото или скрин. Разберем цену по строкам и покажем, где можно снять лишнее.",
    extraLabel: "Смета, фото или скрин",
    extraType: "file",
    button: "Отправить на разбор",
  },
  new: {
    title: "Посчитаем по размерам",
    intro: "Опишите помещение, стиль и бюджет. Соберем понятный вариант на базе SURA.",
    extraLabel: "Размер, планировка или фото помещения",
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
    alert(`Заявка подготовлена: ${copy.title}\n${name}\n${phone}`);
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
          {copy.extraLabel}
          {copy.extraType === "file" ? (
            <input name="estimate" type="file" accept=".pdf,image/*" />
          ) : (
            <textarea name="details" rows={4} placeholder="Например: угловая 2400×1800, бюджет до 250 тыс." />
          )}
        </label>
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
