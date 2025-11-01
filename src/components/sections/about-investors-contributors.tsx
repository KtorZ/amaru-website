import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Handshake, HeartHandshake } from 'lucide-react';
import { Meteors } from '@/components/magicui/meteors';
import { SITE_METADATA } from '../../consts.ts';

// const investors = [
//   {
//     name: 'Cooper Torff',
//     role: 'CEO',
//     company: 'Snap',
//   },
// ];
type Props = { contributors: Array };

export function AboutInvestorsContributors({ contributors }: Props) {
  return (
    <>
      {/* Investors Section */}
      {/*
      <section className="container">
        <div className="bordered-div-padding relative border border-t-0">
          <div className="absolute top-0 right-full -mt-0.25 hidden h-[calc(100%+2px)] w-[50vw] overflow-hidden border-y md:block">
            <Meteors
              number={1000}
              angle={65}
              maxDuration={20}
              minDuration={5}
              className="opacity-10 [&>div]:opacity-10"
            />
          </div>
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Handshake className="size-5" />
              Investors
            </h2>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
              {investors.map((investor) => (
                <div
                  key={investor.name}
                  className="space-y-1 text-sm md:text-base"
                >
                  <h3 className="font-medium">{investor.name}</h3>
                  <p className="text-muted-foreground">
                    {investor.role}, {investor.company}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
     */}

      {/* Contributors Section */}
      <section className="container">
        <div className="bordered-div-padding border border-[#31a2d8] border-t-0">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <HeartHandshake className="size-5" />
              Contributors
            </h2>

            <div className="grid grid-cols-2 gap-6 mask-b-from-60% mask-b-to-100% md:grid-cols-3 md:gap-8 md:mask-b-to-95% lg:grid-cols-5">
              {contributors.map((contributor) => (
                <a
                  key={contributor.username}
                  href={contributor.url}
                  className="group flex flex-col gap-1"
                  target="_blank"
                >
                  <div className="group flex gap-2 items-center">
                    <Avatar className="size-6 md:size-8">
                      <AvatarImage
                        src={contributor.avatar}
                        alt={contributor.username}
                      />
                      <AvatarFallback>
                        {contributor.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="size-6">{contributor.username}</span>
                  </div>
                  <div className="text-muted-foreground text-sm md:text-base">
                    {contributor.isLink ? (
                      <p className="text-secondary font-medium">
                        {contributor.linkText}
                      </p>
                    ) : (
                      <p className="">{contributor.commits} contributions</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
