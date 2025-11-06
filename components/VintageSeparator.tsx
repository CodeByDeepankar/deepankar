interface VintageSeparatorProps {
  variant?: 'dark' | 'light';
}

export function VintageSeparator({ variant = 'dark' }: VintageSeparatorProps) {
  if (variant === 'light') {
    return (
      <div className="w-screen h-20 sm:h-24 md:h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />
    );
  }
  
  return (
    <div className="w-screen h-20 sm:h-24 md:h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />
  );
}
