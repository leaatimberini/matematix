// src/components/visualizers/ParabolaVisualizer.tsx
import React from 'react';

interface ParabolaVisualizerProps {
  a?: number;
  b?: number;
  c?: number;
  roots?: number[];
  vertex?: { x: number; y: number };
  yIntercept?: number;
  imageInterval?: string;
}

export const ParabolaVisualizer: React.FC<ParabolaVisualizerProps> = ({
  a = -2,
  b = -1,
  c = 6,
  roots = [-2, 1.5],
  vertex = { x: -0.25, y: 6.125 },
  yIntercept = 6,
  imageInterval = '(-∞; 49/8]'
}) => {
  const size = 360;
  const padding = 35;
  const xMin = -4;
  const xMax = 4;
  const yMin = -6;
  const yMax = 8;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (size - 2 * padding);
  const toPxY = (y: number) => size - padding - ((y - yMin) / (yMax - yMin)) * (size - 2 * padding);

  // Generate curve points
  const pointsList: string[] = [];
  const step = 0.1;
  for (let x = xMin; x <= xMax; x += step) {
    const y = a * x * x + b * x + c;
    if (y >= yMin - 2 && y <= yMax + 2) {
      pointsList.push(`${toPxX(x).toFixed(1)},${toPxY(y).toFixed(1)}`);
    }
  }
  const pathD = pointsList.length > 0 ? `M ${pointsList.join(' L ')}` : '';

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
          <span>🎯</span> Visualizador de Parábola y Conjunto Imagen
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Gráfica interactiva de f(x) = {a}x² {b >= 0 ? `+ ${b}x` : `${b}x`} {c >= 0 ? `+ ${c}` : `${c}`} destacando Vértice, Raíces y Rango.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[360px] select-none bg-slate-900/90 rounded-xl border border-slate-700">
          {/* Axes */}
          <line x1={toPxX(xMin)} y1={toPxY(0)} x2={toPxX(xMax)} y2={toPxY(0)} stroke="#64748b" strokeWidth="1.5" />
          <line x1={toPxX(0)} y1={toPxY(yMin)} x2={toPxX(0)} y2={toPxY(yMax)} stroke="#64748b" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x={toPxX(xMax) - 12} y={toPxY(0) - 8} fill="#94a3b8" fontSize="10" fontWeight="bold">x</text>
          <text x={toPxX(0) + 8} y={toPxY(yMax) + 12} fill="#94a3b8" fontSize="10" fontWeight="bold">y</text>

          {/* Image Range Highlighting on Y Axis */}
          {a < 0 ? (
            <line
              x1={toPxX(0)}
              y1={toPxY(vertex.y)}
              x2={toPxX(0)}
              y2={toPxY(yMin)}
              stroke="#10b981"
              strokeWidth="5"
              strokeOpacity="0.8"
            />
          ) : (
            <line
              x1={toPxX(0)}
              y1={toPxY(vertex.y)}
              x2={toPxX(0)}
              y2={toPxY(yMax)}
              stroke="#10b981"
              strokeWidth="5"
              strokeOpacity="0.8"
            />
          )}

          {/* Axis of Symmetry (Dashed Line) */}
          <line
            x1={toPxX(vertex.x)}
            y1={toPxY(yMin)}
            x2={toPxX(vertex.x)}
            y2={toPxY(yMax)}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.75"
          />

          {/* Parabola Curve */}
          <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

          {/* Vertex Point */}
          <circle cx={toPxX(vertex.x)} cy={toPxY(vertex.y)} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
          <text x={toPxX(vertex.x) + 10} y={toPxY(vertex.y) - 6} fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">
            V({vertex.x.toFixed(2)}; {vertex.y.toFixed(2)})
          </text>

          {/* Roots Points */}
          {roots.map((r, i) => (
            <g key={i}>
              <circle cx={toPxX(r)} cy={toPxY(0)} r="5" fill="#ec4899" stroke="#ffffff" strokeWidth="1.5" />
              <text x={toPxX(r)} y={toPxY(0) + 16} fill="#ec4899" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                x_{i + 1}={r}
              </text>
            </g>
          ))}

          {/* Y-Intercept Point */}
          <circle cx={toPxX(0)} cy={toPxY(yIntercept)} r="4" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
          <text x={toPxX(0) - 10} y={toPxY(yIntercept) + 4} fill="#a855f7" fontSize="10" textAnchor="end" fontWeight="bold">
            (0; {yIntercept})
          </text>
        </svg>

        {/* Info Cards */}
        <div className="flex flex-col gap-2.5 min-w-[220px] text-xs">
          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[11px]">Conjunto Imagen:</span>
            <span className="text-slate-100 font-mono text-sm font-bold">{imageInterval}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Acotada superiormente por y_v = 49/8 (6.125)</span>
          </div>

          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-amber-500/30">
            <span className="text-amber-400 font-bold block uppercase tracking-wider text-[11px]">Vértice (Máximo):</span>
            <span className="text-slate-100 font-mono font-bold">V(-1/4; 49/8) ≈ (-0.25; 6.125)</span>
          </div>

          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-pink-500/30">
            <span className="text-pink-400 font-bold block uppercase tracking-wider text-[11px]">Raíces Reales (Corte x):</span>
            <span className="text-slate-100 font-mono font-bold">x₁ = -2, x₂ = 3/2 (1.5)</span>
          </div>

          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-purple-500/30">
            <span className="text-purple-400 font-bold block uppercase tracking-wider text-[11px]">Ordenada al Origen (Corte y):</span>
            <span className="text-slate-100 font-mono font-bold">(0; 6)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
