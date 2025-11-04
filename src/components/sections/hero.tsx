'use client';

import { ArrowRight } from 'lucide-react';
import { FaDiscord, FaDownload } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { MovingBorder } from '@/components/ui/moving-border';
import { SITE_METADATA } from '@/consts';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[url(/images/landing/hero.webp)] bg-cover bg-fixed bg-top bg-no-repeat">
      <div className="container">
        <div className="bordered-div-padding relative flex flex-col items-center gap-8 border-x border-x-[#30e2a3] text-center md:gap-10 lg:gap-16 lg:!py-25">
          {/* Main Heading */}
          <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
            {/* Beta Banner */}
            <a
              href="https://summit.cardano.org/"
              target="_blank"
              className="relative inline-flex items-center overflow-hidden rounded-sm p-[1px]"
            >
              <MovingBorder duration={4000}>
                <div
                  className={cn(
                    'h-18 w-25 bg-[radial-gradient(#00A656_40%,transparent_60%)] opacity-[0.8]',
                  )}
                />
              </MovingBorder>
              <Button
                variant="outline"
                size="sm"
                className="relative border-none"
              >
                Meet us at the Cardano Summit :: Nov 12-13
                <ArrowRight className="ml-1" />
              </Button>
            </a>
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter drop-shadow-md md:text-3xl lg:text-5xl">
              An Open Source Cardano client{' '}
              <span className="block">written in Rust.</span>
            </h1>
            <p className="mx-auto max-w-[700px] p-4 text-sm leading-relaxed backdrop-blur-[1px] md:text-lg lg:text-xl">
              Amaru is an open-source project implementing a new fully
              interoperable block-producing node for Cardano. It aims to improve
              the network's overall accessibility and robustness without
              compromising its safety and security.
            </p>
            <p className="mx-auto max-w-[700px] p-4 text-sm leading-relaxed backdrop-blur-[1px] md:text-lg lg:text-xl">
              It provides another perspective and solution for stake pool
              operators and developers alike, prioritizing a modular approach, a
              seamless user experience, and low hardware requirements.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Button asChild>
              <a href="/docs/installation#installation">
                <FaDownload className="size-5" />
                Download
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={SITE_METADATA.discord.invitation_link} target="_blank">
                <FaDiscord className="size-5" />
                Community
              </a>
            </Button>
          </div>
          {/*
          <div
            className={cn(
              'pointer-events-none absolute top-0 left-full hidden h-[calc(100%+1px)] w-screen overflow-hidden border-b text-start select-none lg:block',
            )}
            aria-hidden="true"
            role="presentation"
          >
            <p className="p-4 whitespace-pre opacity-20">{``}</p>
          </div>
          */}
        </div>
      </div>
      <div className="container">
        <div className="bordered-div-padding flex items-center justify-center border border-x-[#30d0b1] border-t-[#30d0b1] border-b-[#30bcc2]">
          <img
            src="/images/landing/splash.webp"
            alt="Hero Image"
            width={1320}
            height={743}
            className="rounded-lg mask-b-from-50% mask-b-to-90%"
          />
        </div>
      </div>
    </section>
  );
}
