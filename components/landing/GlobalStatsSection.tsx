/**
 * ============================================================================
 * GLOBAL STATS SECTION
 * ============================================================================
 * "Connecting School, Universities, and Students worldwide" with stat counters
 * and a world map image with animated floating flag pins.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @updated     2026-04-01  — Real world-map.png, animated flags, stat counters
 * ============================================================================
 */
import { GLOBAL_STATS } from "@/lib/constants/landing";

const FLAG_PINS = [
  { code: "ca", alt: "Canada",    top: "18%", left: "22%",  delay: "0s"    },
  { code: "us", alt: "USA",       top: "35%", left: "12%",  delay: "0.3s"  },
  { code: "gb", alt: "UK",        top: "22%", right: "38%", delay: "0.6s"  },
  { code: "in", alt: "India",     bottom: "30%", right: "28%", delay: "0.9s" },
  { code: "au", alt: "Australia", bottom: "18%", right: "12%", delay: "1.2s" },
  { code: "np", alt: "Nepal",     top: "40%", right: "30%", delay: "1.5s"  },
] as const;

export default function GlobalStatsSection() {
  return (
    <section id="global-stats" aria-label="Global statistics" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text + Stats */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Connecting{" "}
              <span className="text-[#0070F0]">School, Universities,</span> and{" "}
              <span className="text-[#0070F0]">Students</span> worldwide
            </h2>
            <p className="text-slate-500 text-base md:text-lg mb-12 max-w-xl leading-relaxed">
              Our platform connects to the most popular universities worldwide. Your academic
              applications are validated by our expert team and sent directly to partner institutions.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8">
              {GLOBAL_STATS.map((stat, i) => (
                <div key={stat.label} className="animate-count-up" style={{ animationDelay: `${i * 120}ms` }}>
                  <p className="text-4xl md:text-5xl font-extrabold text-[#0070F0] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 font-medium mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: World Map with floating flag pins */}
          <div className="relative flex items-center justify-center min-h-[280px] md:min-h-[380px]">
            {/* Dotted world map SVG — matching Figma stippled design */}
            <img
              src="/images/world-map-dotted.svg"
              alt="World map showing Unifinders global presence"
              className="w-full h-auto opacity-70 object-contain select-none pointer-events-none"
              loading="lazy"
            />

            {/* Floating Country Flags with pulse animation */}
            {FLAG_PINS.map((pin) => {
              const posStyle: React.CSSProperties = {
                animationDelay: pin.delay,
              };
              if ("top" in pin && pin.top) posStyle.top = pin.top;
              if ("bottom" in pin && pin.bottom) posStyle.bottom = pin.bottom;
              if ("left" in pin && pin.left) posStyle.left = pin.left;
              if ("right" in pin && pin.right) posStyle.right = pin.right;

              return (
                <div
                  key={pin.code}
                  className="absolute bg-white p-2 rounded-full shadow-lg border-2 border-blue-100 animate-float hover:scale-110 transition-transform cursor-pointer"
                  style={posStyle}
                  title={pin.alt}
                >
                  <img
                    src={`https://flagcdn.com/w40/${pin.code}.png`}
                    alt={pin.alt}
                    className="w-8 h-5 rounded-sm object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
