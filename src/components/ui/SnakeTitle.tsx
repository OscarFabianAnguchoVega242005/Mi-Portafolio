'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';

interface SnakeTitleProps {
  text: string;
  className?: string;
}

const BASE_Y = 88;
const LINE_GAP = 90;
const CHAR_W = 58;

/**
 * Título con letras blancas y una culebra de luz (verde → azul) que recorre
 * el contorno de cada letra, una tras otra. Cada palabra del texto va en su propia línea.
 * El texto accesible debe ir fuera (por ejemplo, en un <span className="sr-only">).
 */
export function SnakeTitle({ text, className }: SnakeTitleProps) {
  const gid = `st-grad-${useId().replace(/:/g, '')}`;
  const lines = text.trim().split(/\s+/);
  const W = Math.max(...lines.map((l) => l.length)) * CHAR_W + 24;
  const H = BASE_Y + (lines.length - 1) * LINE_GAP + 28;

  // Cada capa repite el texto; --i es el número de letra y sirve para escalonar la animación
  const layer = (cls: string, stroke?: string) => {
    let k = 0;
    return (
      <g className={cls}>
        {lines.map((line, li) => (
          <text key={li} x={4} y={BASE_Y + li * LINE_GAP} stroke={stroke}>
            {[...line].map((ch, ci) => {
              const i = k++;
              return (
                <tspan key={ci} className="st-ch" style={{ '--i': i } as CSSProperties}>
                  {ch}
                </tspan>
              );
            })}
          </text>
        ))}
      </g>
    );
  };

  return (
    <svg className={`st-svg ${className ?? ''}`} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" x2={W} y1="0" y2="0">
          <stop offset="0" stopColor="#39FF14" />
          <stop offset=".5" stopColor="#19E3FF" />
          <stop offset="1" stopColor="#2F6BFF" />
        </linearGradient>
      </defs>
      {layer('st-base')}
      {layer('st-ring', `url(#${gid})`)}
      <g className="st-fx">
        {layer('st-sn st-tail')}
        {layer('st-sn st-body', `url(#${gid})`)}
        {layer('st-sn st-head')}
      </g>
    </svg>
  );
}

export default SnakeTitle;