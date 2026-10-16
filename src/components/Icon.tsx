const paths: Record<string, string> = {
  shield: "M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9-4.1-1.1-7-4.8-7-9V6l7-3zm-3 9l2 2 4-4.5",
  chat: "M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7a2.5 2.5 0 01-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 014 13.5v-7zM8.5 9.5h7M8.5 12.5h4",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  loop: "M4.5 12a7.5 7.5 0 0113-5.1M19.5 12a7.5 7.5 0 01-13 5.1M17.5 3.5v3.6h-3.6M6.5 20.5v-3.6h3.6",
  car: "M5 16.5V12l1.8-4.6A2 2 0 018.7 6h6.6a2 2 0 011.9 1.4L19 12v4.5M5 16.5h14M5 16.5V18a1 1 0 001 1h1.5a1 1 0 001-1v-1.5M19 16.5V18a1 1 0 01-1 1h-1.5a1 1 0 01-1-1v-1.5M5 12h14M8 14.2h.01M16 14.2h.01",
  instagram:
    "M7.5 3.5h9a4 4 0 014 4v9a4 4 0 01-4 4h-9a4 4 0 01-4-4v-9a4 4 0 014-4zM12 15.8a3.8 3.8 0 100-7.6 3.8 3.8 0 000 7.6zM17.2 6.8h.01",
  whatsapp:
    "M4.5 19.5l1.2-3.9A7.9 7.9 0 1112 20a8 8 0 01-3.6-.9l-3.9.4zM9.2 8.6c.2-.4.4-.5.7-.5h.5c.2 0 .3.1.4.3l.7 1.6c.1.2 0 .4-.1.5l-.5.6c.4.9 1.2 1.7 2.2 2.2l.6-.5c.1-.1.3-.2.5-.1l1.6.7c.2.1.3.2.3.4v.5c0 .3-.2.6-.5.7-.6.3-1.4.4-2.4 0a7.6 7.6 0 01-4.1-4.1c-.4-1-.3-1.8 0-2.3z",
  mail: "M4 6.5A1.5 1.5 0 015.5 5h13A1.5 1.5 0 0120 6.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5v-11zm.5.5l7.5 6 7.5-6",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-13.5V12l3 2",
  arrowUpRight: "M7 17L17 7M9 7h8v8",
};

export function Icon({ name, className = "size-6" }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
