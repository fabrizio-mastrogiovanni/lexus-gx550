"use client";

import { SplitText } from "@/components/SplitText";
import { FadeUp } from "@/components/FadeUp";
import { NumberCounter } from "@/components/NumberCounter";
import { Marquee } from "@/components/Marquee";

const specs = [
  { value: 349, suffix: "", label: "Horsepower · hp" },
  { value: 479, suffix: "", label: "Torque · lb-ft" },
  { value: 24, suffix: "", label: "MPG · combined" },
  { value: 8.0, suffix: "K", label: "Towing · lbs" },
  { value: 33, suffix: "°", label: "Approach angle" },
  { value: 26, suffix: "°", label: "Departure angle" },
];

export function Specs() {
  return (
    <section id="specs" className="relative bg-paper">
      {/* Brutal marquee divider */}
      <div className="border-y border-rule py-6">
        <Marquee
          items={["GX550", "OVERTRAIL", "TWIN-TURBO V6", "FULL-TIME 4WD", "ELECTRONIC KDSS"]}
          speed={50}
          itemClassName="font-bold"
        />
      </div>

      <div className="px-6 py-32 md:px-10 md:py-48">
        <div className="mb-20 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted">
              <FadeUp>02 · SPECIFICATION</FadeUp>
            </div>
          </div>
          <h2 className="col-span-12 display text-[12vw] leading-[0.88] md:col-span-9 md:text-[8vw]">
            <SplitText mode="word" variant="mask" duration={1.0} stagger={0.06}>
              {"Numbers don’t whisper.\nThey arrive."}
            </SplitText>
          </h2>
        </div>

        {/* Spec grid */}
        <div className="grid grid-cols-2 gap-px bg-rule md:grid-cols-3">
          {specs.map((s, i) => (
            <FadeUp
              key={i}
              delay={i * 0.06}
              className="group bg-paper p-8 transition-colors duration-500 hover:bg-ink hover:text-paper md:p-12"
            >
              <div className="flex items-baseline">
                <NumberCounter
                  to={s.value}
                  decimals={s.value % 1 !== 0 ? 1 : 0}
                  duration={1800}
                  className="display text-[16vw] leading-none md:text-[7vw]"
                />
                <span className="display text-[8vw] leading-none md:text-[3.5vw]">
                  {s.suffix}
                </span>
              </div>
              <div className="mt-4 font-mono text-[10px] tracking-[0.3em] text-muted group-hover:text-paper">
                {s.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
