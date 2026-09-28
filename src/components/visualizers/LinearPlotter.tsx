// src/components/visualizers/LinearPlotter.tsx
import React from 'react';

interface LineItem {
  m: number;
  b: number;
  label?: string;
  color?: string;
}

interface PointItem {
  x: number;
  y: number;
  label?: string;
}

interface LinearPlotterProps {
  lines?: LineItem[];
  points?: PointItem[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
}

export const LinearPlotter: React.FC<LinearPlotterProps> = ({
  lines = [
    { m: 1/3, b: 2, label: 'r₁: y = 1/3 x + 2', color: '#38bdf8' },
    { m: -3, b: 1, label: 'r₂: y = -3x + 1', color: '#f43f5e' }
  ],
  points = [{ x: 1, y: -2, label: 'P(1; -2)' }],
  xMin = -6,
  xMax = 6,
  yMin = -6,
  yMax = 6
}) => {
  const size = 340;
  const padding = 30;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (size - 2 * padding);
  const toPxY = (y: number) => size - padding - ((y - yMin) / (yMax - yMin)) * (size - 2 * padding);

  const gridTicks = [-4, -2, 2, 4];

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
          <span>📈</span> Gráfica en Plano Cartesiano
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Visualización analítica de rectas, ángulo recto de perpendicularidad y puntos de corte.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[340px] select-none bg-slate-900/90 rounded-xl border border-slate-700">
          {/* Grid lines */}
          {gridTicks.map(val => (
            <g key={val} opacity="0.15">
              <line x1={toPxX(val)} y1={padding} x2={toPxX(val)} y2={size - padding} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1={padding} y1={toPxY(val)} x2={size - padding} y2={toPxY(val)} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          ))}

          {/* Axes */}
          <line x1={toPxX(xMin)} y1={toPxY(0)} x2={toPxX(xMax)} y2={toPxY(0)} stroke="#64748b" strokeWidth="2" />
          <line x1={toPxX(0)} y1={toPxY(yMin)} x2={toPxX(0)} y2={toPxY(yMax)} stroke="#64748b" strokeWidth="2" />

          {/* Axis Labels */}
          <text x={toPxX(xMax) - 10} y={toPxY(0) - 8} fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
          <text x={toPxX(0) + 8} y={toPxY(yMax) + 12} fill="#94a3b8" fontSize="11" fontWeight="bold">y</text>

          {/* Tick values */}
          {gridTicks.map(val => (
            <g key={`lbl-${val}`}>
              <text x={toPxX(val)} y={toPxY(0) + 14} fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                {val}
              </text>
              <text x={toPxX(0) - 10} y={toPxY(val) + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                {val}
              </text>
            </g>
          ))}

          {/* Lines */}
          {lines.map((line, idx) => {
            const yStart = line.m * xMin + line.b;
            const yEnd = line.m * xMax + line.b;
            const color = line.color || '#38bdf8';

            return (
              <line
                key={idx}
                x1={toPxX(xMin)}
                y1={toPxY(yStart)}
                x2={toPxX(xMax)}
                y2={toPxY(yEnd)}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Points */}
          {points.map((pt, idx) => {
            const px = toPxX(pt.x);
            const py = toPxY(pt.y);
            return (
              <g key={idx}>
                <circle cx={px} cy={py} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                {pt.label && (
                  <text
                    x={px + 8}
                    y={py - 6}
                    fill="#f59e0b"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {pt.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Referencias</h5>
          {lines.map((l, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs bg-slate-900/60 p-2 rounded-lg border border-slate-700/60">
              <span className="w-3.5 h-1 rounded" style={{ backgroundColor: l.color || '#38bdf8' }}></span>
              <span className="font-mono text-slate-200">{l.label || `Recta ${i + 1}`}</span>
            </div>
          ))}
          {points.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs bg-slate-900/60 p-2 rounded-lg border border-slate-700/60">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span className="font-mono text-amber-200">{p.label || `P(${p.x}; ${p.y})`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
