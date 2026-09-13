import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
  Legend,
} from "recharts";
import { useMemo } from "react";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      className="rounded-xl border border-[#1a2238] bg-[#0a0f1c]/95 shadow-2xl px-4 py-3 backdrop-blur-sm"
      style={{ boxShadow: "0 20px 40px -16px rgba(0,0,0,0.6)" }}
    >
      {label && (
        <div className="text-xs text-[#9aa6bd] font-medium mb-1">{label}</div>
      )}
      {payload.map((entry, index) => {
        const raw = entry.value ?? 0;
        const formattedValue = typeof raw === "number" ? raw : parseFloat(String(raw));
        const formatted =
          typeof raw === "number"
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(formattedValue)
            : String(raw);
        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color ?? "#d4a94f" }}
            />
            <span className="text-[#c7cedb]">{entry.name ?? ""}</span>
            <span className="ml-auto font-semibold text-white">{formatted}</span>
          </div>
        );
      })}
    </div>
  );
}

interface AreaChartProps {
  data: Array<{ date: string; balance?: number; profit?: number; [key: string]: unknown }>;
  dataKey?: string;
  color?: string;
  height?: number;
}

export function AreaChartWrapper({ data, dataKey = "balance", color = "#d4a94f", height = 280 }: AreaChartProps) {
  const gradientId = useMemo(() => `area-gradient-${dataKey}-${color}`, [dataKey, color]);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#2a3550", strokeWidth: 1, strokeDasharray: "4 4" }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{
            r: 5,
            stroke: "#0a0f1c",
            strokeWidth: 2,
            fill: color,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface PieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  height?: number;
  innerRadius?: number;
}

export function PieChartWrapper({ data, height = 240, innerRadius = 64 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={innerRadius + 36}
          paddingAngle={2}
          dataKey="value"
          stroke="#0a0f1c"
          strokeWidth={3}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          content={({ payload }) => {
            if (!payload || payload.length === 0) return null;
            return (
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {payload.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-[#c7cedb]">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: entry.color ?? "#d4a94f" }}
                    />
                    <span className="font-medium">{entry.value}</span>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface BarChartProps {
  data: Array<{ name?: string; value?: number | string; [key: string]: unknown }>;
  dataKey?: string;
  height?: number;
  color?: string;
}

export function BarChartWrapper({ data, dataKey = "value", height = 240, color = "#d4a94f" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212,169,79,0.06)" }} />
        <Bar
          dataKey={dataKey}
          radius={[6, 6, 0, 0]}
          fill={color}
          maxBarSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
