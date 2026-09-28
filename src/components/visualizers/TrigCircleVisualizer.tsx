// src/components/visualizers/TrigCircleVisualizer.tsx
import React, { useState } from 'react';

export const TrigCircleVisualizer: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState<number>(30);

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 105;

  const angleRad = (angleDeg * Math.PI) / 180;
  const px = cx + radius * Math.cos(angleRad);
  const py = cy - radius * Math.sin(angleRad);

  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);

  const quadrant = angleDeg < 90 ? 'I' : angleDeg < 180 ? 'II' : angleDeg < 270 ? 'III' : 'IV';

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <span>🔄</span> Circunferencia Trigonométrica Unitaria
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Mueve el ángulo para observar la variación del Seno (vertical) y Coseno (horizontal).
          </p>
        </div>
        <div className="bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-700 font-mono text-xs text-amber-300 font-bold">
          Cuadrante: {quadrant}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] select-none bg-slate-900/90 rounded-xl border border-slate-700">
          {/* Main Unit Circle */}
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#475569" strokeWidth="2" />

          {/* Axes */}
          <line x1={cx - radius - 20} y1={cy} x2={cx + radius + 20} y2={cy} stroke="#64748b" strokeWidth="1.5" />
          <line x1={cx} y1={cy - radius - 20} x2={cx} y2={cy + radius + 20} stroke="#64748b" strokeWidth="1.5" />

          {/* Cosine projection (Horizontal segment on x axis) */}
          <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

          {/* Sine projection (Vertical segment) */}
          <line x1={px} y1={cy} x2={px} y2={py} stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />

          {/* Radius vector */}
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

          {/* Endpoint on circle */}
          <circle cx={px} cy={py} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* Labels */}
          <text x={cx + radius + 8} y={cy - 6} fill="#94a3b8" fontSize="10">1 (0°)</text>
          <text x={cx + 6} y={cy - radius - 8} fill="#94a3b8" fontSize="10">π/2 (90°)</text>
          <text x={cx - radius - 24} y={cy - 6} fill="#94a3b8" fontSize="10">π (180°)</text>
          <text x={cx + 6} y={cy + radius + 16} fill="#94a3b8" fontSize="10">3π/2 (270°)</text>
        </svg>

        <div className="flex flex-col gap-3 min-w-[220px] text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5 flex justify-between">
              <span>Ángulo θ:</span>
              <span className="font-mono text-amber-300 font-bold">{angleDeg}° ({((angleDeg / 180)).toFixed(2)}π rad)</span>
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={angleDeg}
              onChange={e => setAngleDeg(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-sky-500/30">
              <span className="text-sky-400 font-semibold block text-[10px] uppercase">Coseno (Eje X)</span>
              <span className="font-mono text-slate-100 font-bold text-sm">{cosVal.toFixed(3)}</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-pink-500/30">
              <span className="text-pink-400 font-semibold block text-[10px] uppercase">Seno (Eje Y)</span>
              <span className="font-mono text-slate-100 font-bold text-sm">{sinVal.toFixed(3)}</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700 text-slate-300 text-[11px] leading-relaxed">
            <span className="font-bold text-slate-200">Identidad Fundamental:</span><br />
            <code>cos²({angleDeg}°) + sen²({angleDeg}°) = 1.000</code>
          </div>
        </div>
      </div>
    </div>
  );
};
