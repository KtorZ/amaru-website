import { Verified } from 'lucide-react';

import { Marquee } from '@/components/magicui/marquee';
import { Meteors } from '@/components/magicui/meteors';

const companies = [
  {
    name: 'Cardano Foundation',
    logo: {
      src: '/images/testimonials/cardano-foundation.svg',
      width: 200,
      height: 54,
    },
    href: 'https://cardanofoundation.org',
  },
  {
    name: 'Sundae Labs',
    logo: {
      src: '/images/testimonials/sundae-labs.svg',
      width: 200,
      height: 35,
    },
    href: 'https://sundae.fi',
  },
  {
    name: 'TxPipe',
    logo: { src: '/images/testimonials/txpipe.svg', width: 200, height: 43 },
    href: 'https://txpipe.io',
    applyFilter: true,
  },
  {
    name: 'BlinkLabs',
    logo: { src: '/images/testimonials/blinklabs.svg', width: 200, height: 27 },
    href: 'https://blinklabs.io',
  },
  {
    name: 'dcSpark',
    logo: { src: '/images/testimonials/dcspark.svg', width: 200, height: 36 },
    href: 'https://dcspark.io',
    applyFilter: true,
  },
];

export function Testimonials() {
  return (
    <div className="relative overflow-hidden">
      <section className="container">
        <div className="bordered-div-padding relative border border-t-0 border-[#31a2d8]">
          {/* Trusted by text */}
          <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
            <Verified className="size-5" />
            Supported by Cardano Experts
          </h2>

          {/* Company logos */}
          <Marquee
            className="mt-6 invert [--gap:4rem] md:mt-8 lg:mt-10 xl:[&_div]:[animation-play-state:paused]"
            repeat={1}
          >
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.href}
                className="py-2.5 transition-opacity hover:opacity-80"
                target="_blank"
              >
                <img
                  src={company.logo.src}
                  alt={company.name}
                  width={company.logo.width}
                  height={company.logo.height}
                  style={
                    company.applyFilter
                      ? {
                          filter:
                            'brightness(0) invert(calc(1 - var(--logo-invert)))',
                        }
                      : { filter: 'invert(var(--logo-invert))' }
                  }
                />
              </a>
            ))}
          </Marquee>
        </div>
        {/* Testimonial */}
        {/*
      <blockquote className="bordered-div-padding flex flex-col justify-between gap-8 border border-t-0 md:flex-row">
        <p className="lg:text-4xxl font-weight-display flex-7 text-2xl leading-snug tracking-tighter md:text-3xl">
          Scalar CMS changed how we ship content. It&apos;s fast, intuitive, and
          plays perfectly with our stack.
        </p>

        <footer className="flex-6 self-end">
          <div className="flex items-center gap-4">
            <img
              src="/images/testimonials/robert-austin.webp"
              alt="Robert Austin"
              width={40}
              height={40}
              className="rounded-full"
            />
            <cite className="text-sm font-medium not-italic md:text-lg lg:text-xl">
              Robert Austin, Founder & Software Engineer at Zerostatic
            </cite>
          </div>
        </footer>
      </blockquote>
      */}
      </section>
    </div>
  );
}
