// src/components/visualizers/PiecewisePlotter.tsx
import React from 'react';

interface PiecewisePlotterProps {
  branch1?: { expr: string; domain: string; openEnd: { x: number; y: number } };
  branch2?: { expr: string; domain: string; closedStart: { x: number; y: number } };
}

export const PiecewisePlotter: React.FC<PiecewisePlotterProps> = ({
  branch1 = { expr: '2 - x', domain: 'x < 1', openEnd: { x: 1, y: 1 } },
  branch2 = { expr: '3x - 1', domain: 'x >= 1', closedStart: { x: 1, y: 2 } }
}) => {
  const size = 340;
  const padding = 35;
  const xMin = -3;
  const xMax = 3;
  const yMin = -2;
  const yMax = 6;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (size - 2 * padding);
  const toPxY = (y: number) => size - padding - ((y - yMin) / (yMax - yMin)) * (size - 2 * padding);

  // Line 1: y = 2 - x for x in [-3, 1]
  const l1Start = { x: -3, y: 2 - (-3) }; // 5
  const l1End = { x: 1, y: 1 };

  // Line 2: y = 3x - 1 for x in [1, 2.3]
  const l2Start = { x: 1, y: 2 };
  const l2End = { x: 2.3, y: 3 * 2.3 - 1 }; // ~5.9

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
          <span>✂️</span> Gráfica de Función Definida a Tramos
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Comprueba la discontinuidad en x = 1: punto abierto en (1; 1) vs punto relleno en (1; 2).
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[340px] select-none bg-slate-900/90 rounded-xl border border-slate-700">
          {/* Axes */}
          <line x1={toPxX(xMin)} y1={toPxY(0)} x2={toPxX(xMax)} y2={toPxY(0)} stroke="#64748b" strokeWidth="1.5" />
          <line x1={toPxX(0)} y1={toPxY(yMin)} x2={toPxX(0)} y2={toPxY(yMax)} stroke="#64748b" strokeWidth="1.5" />

          {/* Jump vertical guide at x = 1 */}
          <line
            x1={toPxX(1)}
            y1={toPxY(yMin)}
            x2={toPxX(1)}
            y2={toPxY(yMax)}
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />

          {/* Axis Labels */}
          <text x={toPxX(xMax) - 10} y={toPxY(0) - 8} fill="#94a3b8" fontSize="10" fontWeight="bold">x</text>
          <text x={toPxX(0) + 8} y={toPxY(yMax) + 12} fill="#94a3b8" fontSize="10" fontWeight="bold">y</text>

          {/* Branch 1: 2 - x */}
          <line
            x1={toPxX(l1Start.x)}
            y1={toPxY(l1Start.y)}
            x2={toPxX(l1End.x)}
            y2={toPxY(l1End.y)}
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Open dot at (1, 1) */}
          <circle
            cx={toPxX(branch1.openEnd.x)}
            cy={toPxY(branch1.openEnd.y)}
            r="5"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="2.5"
          />

          {/* Branch 2: 3x - 1 */}
          <line
            x1={toPxX(l2Start.x)}
            y1={toPxY(l2Start.y)}
            x2={toPxX(l2End.x)}
            y2={toPxY(l2End.y)}
            stroke="#ec4899"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Closed dot at (1, 2) */}
          <circle
            cx={toPxX(branch2.closedStart.x)}
            cy={toPxY(branch2.closedStart.y)}
            r="5"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>

        <div className="flex flex-col gap-3 min-w-[220px] text-xs">
          <div className="bg-slate-900/70 p-3 rounded-xl border border-sky-500/30">
            <span className="text-sky-400 font-bold block uppercase tracking-wider text-[11px]">Tramo 1 (x &lt; 1):</span>
            <span className="font-mono text-slate-200 block text-sm font-semibold">y = 2 - x</span>
            <span className="text-slate-400 text-[11px] mt-1 block">Extremo abierto en (1; 1). Imagen: (1, ∞)</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-xl border border-pink-500/30">
            <span className="text-pink-400 font-bold block uppercase tracking-wider text-[11px]">Tramo 2 (x ≥ 1):</span>
            <span className="font-mono text-slate-200 block text-sm font-semibold">y = 3x - 1</span>
            <span className="text-slate-400 text-[11px] mt-1 block">Punto cerrado en (1; 2). Imagen: [2, ∞)</span>
          </div>

          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[11px]">Imagen Total de f(x):</span>
            <span className="font-mono text-emerald-300 font-bold text-sm">(1, ∞)</span>
            <span className="text-slate-400 text-[11px] block mt-0.5">Porque [2, ∞) ⊂ (1, ∞)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
