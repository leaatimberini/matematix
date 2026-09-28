// src/components/visualizers/NumberLineVisualizer.tsx
import React, { useState } from 'react';

interface IntervalDef {
  left: number;
  right: number;
  leftOpen: boolean;
  rightOpen: boolean;
  color?: string;
  label?: string;
}

interface NumberLineVisualizerProps {
  intervals?: IntervalDef[];
  minVal?: number;
  maxVal?: number;
}

export const NumberLineVisualizer: React.FC<NumberLineVisualizerProps> = ({
  intervals = [{ left: -2, right: 6, leftOpen: true, rightOpen: false, label: '(-2; 6]' }],
  minVal = -8,
  maxVal = 8
}) => {
  const [testValue, setTestValue] = useState<number | null>(null);

  const width = 600;
  const height = 140;
  const padding = 40;
  const lineY = 70;

  const toPx = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return padding + ((clamped - minVal) / (maxVal - minVal)) * (width - 2 * padding);
  };

  const ticks: number[] = [];
  for (let i = minVal; i <= maxVal; i += 2) {
    ticks.push(i);
  }

  const isValueInIntervals = (val: number) => {
    return intervals.some(inv => {
      const leftOk = inv.leftOpen ? val > inv.left : val >= inv.left;
      const rightOk = inv.rightOpen ? val < inv.right : val <= inv.right;
      return leftOk && rightOk;
    });
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <span>📏</span> Visualizador Interactivo de Recta Numérica
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Comprueba cómo los extremos abiertos () y cerrados [] definen el conjunto solución.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-slate-400">Probar valor x:</span>
          <input
            type="number"
            step="0.5"
            placeholder="ej. 0"
            className="w-16 bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-center text-white text-xs font-mono"
            onChange={e => {
              const v = parseFloat(e.target.value);
              setTestValue(isNaN(v) ? null : v);
            }}
          />
          {testValue !== null && (
            <span className={`px-2 py-0.5 rounded font-bold ${isValueInIntervals(testValue) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'}`}>
              {isValueInIntervals(testValue) ? '✓ Pertenece' : '✗ No pertenece'}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[600px] mx-auto select-none">
          {/* Main Axis Line */}
          <line
            x1={padding - 20}
            y1={lineY}
            x2={width - padding + 20}
            y2={lineY}
            stroke="#64748b"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Arrows */}
          <polygon
            points={`${width - padding + 25},${lineY} ${width - padding + 15},${lineY - 5} ${width - padding + 15},${lineY + 5}`}
            fill="#64748b"
          />
          <polygon
            points={`${padding - 25},${lineY} ${padding - 15},${lineY - 5} ${padding - 15},${lineY + 5}`}
            fill="#64748b"
          />

          {/* Ticks and Numbers */}
          {ticks.map(tick => {
            const x = toPx(tick);
            return (
              <g key={tick}>
                <line x1={x} y1={lineY - 6} x2={x} y2={lineY + 6} stroke="#94a3b8" strokeWidth="1.5" />
                <text x={x} y={lineY + 22} fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Intervals */}
          {intervals.map((inv, idx) => {
            const xLeft = inv.left === -Infinity ? padding - 20 : toPx(inv.left);
            const xRight = inv.right === Infinity ? width - padding + 20 : toPx(inv.right);
            const color = inv.color || '#38bdf8';

            return (
              <g key={idx}>
                {/* Interval segment */}
                <line
                  x1={xLeft}
                  y1={lineY}
                  x2={xRight}
                  y2={lineY}
                  stroke={color}
                  strokeWidth="6"
                  strokeOpacity="0.85"
                />

                {/* Left endpoint marker */}
                {inv.left !== -Infinity && (
                  <circle
                    cx={xLeft}
                    cy={lineY}
                    r="6"
                    fill={inv.leftOpen ? '#0f172a' : color}
                    stroke={color}
                    strokeWidth="3"
                  />
                )}

                {/* Right endpoint marker */}
                {inv.right !== Infinity && (
                  <circle
                    cx={xRight}
                    cy={lineY}
                    r="6"
                    fill={inv.rightOpen ? '#0f172a' : color}
                    stroke={color}
                    strokeWidth="3"
                  />
                )}

                {/* Interval Label */}
                {inv.label && (
                  <text
                    x={(xLeft + xRight) / 2}
                    y={lineY - 16}
                    fill={color}
                    fontSize="13"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {inv.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Test Value Indicator */}
          {testValue !== null && testValue >= minVal && testValue <= maxVal && (
            <g>
              <circle cx={toPx(testValue)} cy={lineY} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text x={toPx(testValue)} y={lineY - 24} fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                x = {testValue}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-sky-400 bg-slate-900 inline-block"></span>
          <span>Paréntesis <code>(</code> o <code>)</code>: Extremo abierto (NO incluido)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-sky-400 inline-block"></span>
          <span>Corchete <code>[</code> o <code>]</code>: Extremo cerrado (SÍ incluido)</span>
        </div>
      </div>
    </div>
  );
};
