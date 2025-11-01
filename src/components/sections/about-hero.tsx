import { Button } from '@/components/ui/button';
import { FaDiscord, FaGithub } from 'react-icons/fa6';
import { PlusSigns } from '@/components/icons/plus-signs';
import { SITE_METADATA } from '../../consts.ts';

export function AboutHero() {
  return (
    <section className="container">
      <div className="bordered-div-padding relative flex flex-col items-center gap-8 border-x border-b border-[#30e2a3] text-center md:gap-10 lg:gap-16 lg:!py-25">
        {/* Main Heading */}
        <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            The power of Cardano,{' '}
            <span className="block">for a fraction of the resources</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
            Amaru is an Open Source Cardano node client, entirely written in Rust. By making different design trade-offs, Amaru manages to provide full-node capabilities with a constrained set of resources without ever compromising on security and reliability.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Button asChild variant="outline">
            <a href={SITE_METADATA.github.stargazer_link}>
              <FaGithub className="size-5" />
              Star on GitHub
            </a>
          </Button>
          <Button asChild>
            <a href={SITE_METADATA.discord.invitation_link}>
              <FaDiscord className="size-5" />
              Join our Discord
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
