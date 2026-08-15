export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

/** Native <details>/<summary> — accessible and keyboard-operable with no client JS. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-(--color-line) border-y border-(--color-line)">
      {items.map((item) => (
        <details key={item.title} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-(--color-ink) marker:content-none">
            {item.title}
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-(--color-signal) transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-3 text-(--color-steel) leading-relaxed">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
