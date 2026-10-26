type AvatarProps = {
  nome: string;
  foto: string | null;
  cor: string;
  size?: number;
  className?: string;
};

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes.length > 1 ? partes[partes.length - 1][0] : "")).toUpperCase();
}

/** Caricatura do colaborador ou, enquanto ela não chega, as iniciais na cor do stand. */
export function Avatar({ nome, foto, cor, size = 48, className = "" }: AvatarProps) {
  const style = { width: size, height: size, boxShadow: `0 0 0 2px ${cor}` };
  if (foto) {
    return (
      <img
        src={`/trimestredossonhos/avatares/${foto}.webp`}
        alt={nome}
        width={size}
        height={size}
        loading="lazy"
        className={`shrink-0 rounded-full bg-white object-cover ${className}`}
        style={style}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={nome}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${className}`}
      style={{ ...style, background: `linear-gradient(145deg, ${cor}, #0b122b)`, fontSize: size * 0.36 }}
    >
      {iniciais(nome)}
    </span>
  );
}
