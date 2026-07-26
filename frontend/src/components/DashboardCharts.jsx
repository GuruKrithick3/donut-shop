import React, { useState } from 'react';

const DashboardCharts = () => {
  const [activeTooltipLine, setActiveTooltipLine] = useState(null);
  const [activeTooltipBar, setActiveTooltipBar] = useState(null);

  // Line Chart Data: Monthly Revenue
  const lineData = [
    { label: 'Jan', value: 1200 },
    { label: 'Feb', value: 1800 },
    { label: 'Mar', value: 1500 },
    { label: 'Apr', value: 2400 },
    { label: 'May', value: 2900 },
    { label: 'Jun', value: 3600 }
  ];

  // Bar Chart Data: Donuts Categories Sales Counts
  const barData = [
    { label: 'Classic', value: 380, color: '#FF69B4' }, // Pink
    { label: 'Premium', value: 520, color: '#FFD700' }, // Gold
    { label: 'Filled', value: 290, color: '#8B4513' },  // Brown
    { label: 'Mini', value: 190, color: '#FF85C2' },    // Light Pink
    { label: 'Drinks', value: 410, color: '#E04D95' }   // Dark Pink
  ];

  // LINE CHART CONFIG
  const lineChartWidth = 500;
  const lineChartHeight = 200;
  const linePadding = 40;
  const maxLineValue = 4000;

  const getLineCoordinates = () => {
    return lineData.map((d, i) => {
      const x = linePadding + (i * (lineChartWidth - 2 * linePadding) / (lineData.length - 1));
      const y = lineChartHeight - linePadding - (d.value * (lineChartHeight - 2 * linePadding) / maxLineValue);
      return { x, y, label: d.label, value: d.value };
    });
  };

  const lineCoords = getLineCoordinates();
  const linePathD = lineCoords.reduce((path, coord, i) => {
    return path + `${i === 0 ? 'M' : 'L'} ${coord.x} ${coord.y} `;
  }, '');

  // Closed path for filled area gradient under the line
  const areaPathD = lineCoords.length > 0
    ? `${linePathD} L ${lineCoords[lineCoords.length - 1].x} ${lineChartHeight - linePadding} L ${lineCoords[0].x} ${lineChartHeight - linePadding} Z`
    : '';

  // BAR CHART CONFIG
  const barChartWidth = 500;
  const barChartHeight = 200;
  const barPadding = 40;
  const maxBarValue = 60000; // Let's scale it to fit or use a relative percentage
  const maxVal = Math.max(...barData.map(b => b.value));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Sales Trend Line Chart */}
      <div className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-md relative">
        <h3 className="text-base font-bold text-textColor-light dark:text-textColor-dark mb-4">
          Sales Revenue Trend (Last 6 Months)
        </h3>
        
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${lineChartWidth} ${lineChartHeight}`}
            className="w-full h-auto overflow-visible"
          >
            {/* Gradients */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF69B4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 1000, 2000, 3000, 4000].map((val, idx) => {
              const y = lineChartHeight - linePadding - (val * (lineChartHeight - 2 * linePadding) / maxLineValue);
              return (
                <g key={idx}>
                  <line
                    x1={linePadding}
                    y1={y}
                    x2={lineChartWidth - linePadding}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="dark:stroke-neutral-800"
                  />
                  <text
                    x={linePadding - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    className="fill-textColor-light/60 dark:fill-textColor-dark/60 font-medium"
                  >
                    ${val}
                  </text>
                </g>
              );
            })}

            {/* Area Path */}
            <path d={areaPathD} fill="url(#areaGradient)" />

            {/* Line Path */}
            <path
              d={linePathD}
              fill="none"
              stroke="#FF69B4"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Dots & Interactive Tooltips */}
            {lineCoords.map((coord, idx) => (
              <g key={idx}>
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="5"
                  className="fill-primary stroke-white stroke-2 cursor-pointer hover:r-7 transition-all duration-150"
                  onMouseEnter={() => setActiveTooltipLine({ index: idx, x: coord.x, y: coord.y, value: coord.value })}
                  onMouseLeave={() => setActiveTooltipLine(null)}
                />
                <text
                  x={coord.x}
                  y={lineChartHeight - 10}
                  textAnchor="middle"
                  fontSize="10"
                  className="fill-textColor-light/75 dark:fill-textColor-dark/75 font-semibold"
                >
                  {coord.label}
                </text>
              </g>
            ))}

            {/* Tooltip Overlay */}
            {activeTooltipLine && (
              <g>
                <rect
                  x={activeTooltipLine.x - 45}
                  y={activeTooltipLine.y - 35}
                  width="90"
                  height="25"
                  rx="6"
                  className="fill-darkBg/95 dark:fill-cream/95 shadow-md"
                />
                <text
                  x={activeTooltipLine.x}
                  y={activeTooltipLine.y - 18}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  className="fill-white dark:fill-darkBg"
                >
                  Revenue: ${activeTooltipLine.value}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Category Performance Bar Chart */}
      <div className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-md relative">
        <h3 className="text-base font-bold text-textColor-light dark:text-textColor-dark mb-4">
          Units Sold By Donut Category
        </h3>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${barChartWidth} ${barChartHeight}`}
            className="w-full h-auto overflow-visible"
          >
            {/* Grid Lines */}
            {[0, 100, 200, 300, 400, 500].map((val, idx) => {
              const y = barChartHeight - barPadding - (val * (barChartHeight - 2 * barPadding) / maxVal);
              return (
                <g key={idx}>
                  <line
                    x1={barPadding}
                    y1={y}
                    x2={barChartWidth - barPadding}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="dark:stroke-neutral-800"
                  />
                  <text
                    x={barPadding - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    className="fill-textColor-light/60 dark:fill-textColor-dark/60 font-medium"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Bars */}
            {barData.map((d, i) => {
              const barWidth = 35;
              const spacing = (barChartWidth - 2 * barPadding) / barData.length;
              const x = barPadding + (i * spacing) + (spacing - barWidth) / 2;
              const height = d.value * (barChartHeight - 2 * barPadding) / maxVal;
              const y = barChartHeight - barPadding - height;

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={height}
                    rx="4"
                    fill={d.color}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={() => setActiveTooltipBar({ index: i, x: x + barWidth/2, y: y, value: d.value })}
                    onMouseLeave={() => setActiveTooltipBar(null)}
                  />
                  <text
                    x={x + barWidth / 2}
                    y={barChartHeight - 12}
                    textAnchor="middle"
                    fontSize="10"
                    className="fill-textColor-light/75 dark:fill-textColor-dark/75 font-semibold"
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}

            {/* Tooltip Overlay */}
            {activeTooltipBar && (
              <g>
                <rect
                  x={activeTooltipBar.x - 45}
                  y={activeTooltipBar.y - 35}
                  width="90"
                  height="25"
                  rx="6"
                  className="fill-darkBg/95 dark:fill-cream/95 shadow-md"
                />
                <text
                  x={activeTooltipBar.x}
                  y={activeTooltipBar.y - 18}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  className="fill-white dark:fill-darkBg"
                >
                  Qty: {activeTooltipBar.value} units
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

    </div>
  );
};

export default DashboardCharts;
