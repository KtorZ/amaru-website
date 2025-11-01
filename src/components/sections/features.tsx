import { ShieldCheck, MemoryStick, BookOpenCheck, Telescope } from 'lucide-react';

import { PlusSigns } from '@/components/icons/plus-signs';
import { cn } from '@/lib/utils';
const features = [
  {
    icon: MemoryStick,
    title: 'Minimal Hardware Requirements',
    description: 'Compact by design.',
    subDescription:
      'Amaru uses very little resources (<1GiB RAM) and can run under constrained environments. In particular, Amaru runs on 86_64 or aarch_64 alike. Some parts such as the ledger can also run natively on RISC-V architectures.',
    className: '!pb-0',
    images: [
      {
        src: '/images/landing/feature-1.webp',
        alt: 'Schema Builder',
        width: 700,
        height: 320,
      },
    ],
  },
  {
    icon: Telescope,
    title: 'Industry-grade Observability',
    description: 'Embracing Open Telemetry.',
    subDescription:
      'With Open Telemetry as a first-class choice for observability, Amaru delivers traces, logs and metrics through one powerful framework that integrates with the industry giants (Grafana, Prometheus, ...).',
    className: '!pb-0',
    images: [
      {
        src: '/images/landing/feature-2-1.webp',
        alt: 'Real Time Collaboration',
        width: 620,
        height: 108,
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'High-Assurance & Robustness',
    description: 'No compromise on security.',
    subDescription:
      'Amaru\'s development includes a variety of testing techniques. From conformance tests with the Haskell node, to deterministic simulations and property-based testing. Alternative doesn\'t mean sloppy.',
  },
  {
    icon: BookOpenCheck,
    title: 'Unparalleled Transparency',
    description: 'Built in Open Source.',
    subDescription:
      'Not only is Amaru built fully in Open Source through the effort of multiple organizations; but it is also funded via the Cardano treasury using a transparent and auditable framework.',
  },
];

export function Features() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 border border-t-0 border-[#30bcc2] md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              'bordered-div-padding relative space-y-8',
              index == 0 && 'border-b md:border-e border-[#30bcc2]',
              index == 1 && 'border-b md:border-b-0 border-[#30bcc2]',
              index == 3 && 'border-t md:border-s border-[#30bcc2]',
              feature.className,
            )}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-4">
                <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
                  <feature.icon className="size-5" />
                  {feature.title}
                </h2>
                <h3 className="text-foreground font-weight-display leading-snug md:text-xl">
                  {feature.description}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {feature.subDescription}
              </p>
            </div>

            {feature.images && (
              <div className="flex flex-col gap-4 mask-b-from-30% mask-b-to-95%">
                {feature.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={''}
                    width={image.width}
                    height={image.height}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
