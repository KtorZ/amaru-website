import { Heart, Users } from 'lucide-react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const teamMembers = [
  {
    name: 'Matthias Benkort',
    role: 'Lead Maintainer',
    company: 'Cardano Foundation',
    image: 'https://avatars.githubusercontent.com/u/5680256?v=4',
    github: 'KtorZ',
    twitter: '_KtorZ_',
    bio: 'Lead Maintainer @ Cardano Foundation'
  },
  {
    name: 'Arnaud Bailly',
    role: 'Core Maintainer',
    company: 'Cardano Foundation',
    image: 'https://avatars.githubusercontent.com/u/40221?v=4',
    github: 'abailly',
    twitter: 'dr_c0d3',
    bio: 'Core Maintainer @ Cardano Foundation'
  },
  {
    name: 'Pi Lanningham',
    role: 'Core Maintainer',
    company: 'Sundae Labs',
    image: 'https://avatars.githubusercontent.com/u/49870?v=4',
    github: 'Quantumplation',
    twitter: 'Quantumplation',
    bio: 'Core Maintainer @ Sundae Labs'
  },
  {
    name: 'Santiago Carmuega',
    role: 'Core Maintainer',
    company: 'TxPipe',
    image: 'https://avatars.githubusercontent.com/u/653886?v=4',
    github: 'scarmuega',
    twitter: 'santicarmuega',
    bio: 'Core Maintainer @ TxPipe'
  },
  {
    name: 'Damien Czapla',
    role: 'Project Manager',
    company: 'Open The Lead',
    image: 'https://avatars.githubusercontent.com/u/161828179?v=4',
    github: 'Dam-CZ',
    twitter: '',
    bio: 'Project Manager @ OpenTheLead'
  },
  {
    name: 'Julien Eluard',
    role: 'Core Contributor',
    company: 'Cardano Foundation',
    image: 'https://avatars.githubusercontent.com/u/359723?v=4',
    github: 'jeluard',
    twitter: '',
    bio: 'Core Contributor @ Cardano Foundation'
  },
  {
    name: 'Joshua Marchand',
    role: 'Core Contributor',
    company: 'Sundae Labs',
    image: 'https://avatars.githubusercontent.com/u/79121297?v=4',
    github: 'yHSJ',
    twitter: 'JSHyCS',
    bio: 'Core Contributor @ Sundae Labs'
  },
  {
    name: 'Roland Kuhn',
    role: 'Core Contributor',
    company: 'Actyx AG',
    image: 'https://avatars.githubusercontent.com/u/470469?v=4',
    github: 'rkuhn',
    twitter: '',
    bio: 'Core Contributor @ Actyx AG'
  },
  {
    name: 'Eric Torreborre',
    role: 'Core Contributor',
    company: 'Ockam',
    image: 'https://avatars.githubusercontent.com/u/10988?v=4',
    github: 'etorreborre',
    twitter: 'etorreborre',
    bio: 'Core Contributor @ Ockam'
  },
  {
    name: 'Pascal Grange',
    role: 'Core Contributor',
    company: 'Sundae Labs',
    image: 'https://avatars.githubusercontent.com/u/378506?v=4',
    github: 'pgrange',
    twitter: '',
    bio: 'Core Contributor @ Sundae Labs'
  },
  {
    name: 'Jonathan Slim',
    role: 'Core Contributor',
    company: 'Sundae Labs',
    image: 'https://avatars.githubusercontent.com/u/86131256?v=4',
    github: 'jonathanlim222',
    twitter: '',
    bio: 'Core Contributor @ Sundae Labs'
  },
  {
    name: 'Geoff Little',
    role: 'Core Contributor',
    company: '',
    image: 'https://avatars.githubusercontent.com/u/3976777?v=4',
    github: 'geofflittle',
    twitter: '',
    bio: 'Core Contributor'
  },
].sort((a, b) => a.name.localeCompare(b.name));

function displayTeamMember(member) {
  return (
    <div key={member.name} className="space-y-3">
      {/* Desktop: Hover Card */}
      <div className="hidden md:block">
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="flex cursor-pointer items-center gap-3">
              <img
                src={member.image}
                alt={member.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <p className="text-sm font-medium md:text-base">
                {member.name}
              </p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-94" align="start">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {member.bio}
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <a href={member.twitter} aria-label="Twitter">
                <FaXTwitter className="size-4" />
              </a>
              <a href={member.github} aria-label="GitHub">
                <FaGithub className="size-4" />
              </a>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Mobile: Normal Card */}
      <div className="space-y-2 md:hidden">
        <div className="flex items-center gap-3">
          <img
            src={member.image}
            alt={member.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <p className="text-sm font-medium">{member.name}</p>
        </div>
        <Card className="gap-2">
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            {member.bio}
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <a href={member.twitter} aria-label="Twitter">
              <FaXTwitter className="size-4" />
            </a>
            <a href={member.github} aria-label="GitHub">
              <FaGithub className="size-4" />
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export function AboutMissionTeam() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 divide-y border border-t-0 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Mission Section */}
        <div className="bordered-div-padding space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Heart className="size-5" />
              Mission
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              One of Cardano's key assets is its legendary robustness and stability, which is mainly attributed to the existing Haskell node, which has been working without significant disruption for about five years now (counting since the Byron reboot, circa February 2020). <span className="text-foreground">So why bother with another node?</span> The answer is, of course, plural:
            </p>
            <ul>
              <li>
                <details><summary>1. Better resource usage</summary>
                <p className="text-muted-foreground">Software is ultimately a collection of design decisions and trade-offs. Some of those trade-offs in the Haskell node have led to rather high resource usages (e.g., resident memory), thus leading to the creation of specific protocol parameters (e.g., min-utxo-value) as countermeasures to ensure resource usage remains somewhat bounded. Our analysis is that different (albeit acceptable) trade-offs would yield better resource usage.</p>
                </details>
              </li>
              <li>
                <details><summary>2. Industry-grade observability</summary>
                <p className="text-muted-foreground">Observability is challenging, and it is even more so when rolling your own solution. With Amaru, we intend to embrace industry standards for monitoring, tracing, and logging to drastically enhance the user experience for operators seeking insights into their node's behaviour.</p>
                </details>
              </li>
              <li>
                <details><summary>3. Enhanced interoperability</summary>
                <p className="text-muted-foreground">Amaru being primarily written in Rust means that we can more easily leverage an existing and thriving ecosystem of blockchain solutions and aim at multiple target platforms (e.g. web-assembly, RISC-V). This opens up not only to a wide variety of potential contributors but also to many new use cases that are much harder (not to say unrealistic) to achieve with a Haskell node.</p>
                </details>
              </li>
              <li>
                <details><summary>4. Higher-assurance & robustness</summary>
                <p className="text-muted-foreground">Developing a new implementation of existing software means dissecting every part of the original implementation. Along the way, bugs and discrepancies with the specification are commonly found through conformance testing. Gaps in the documentation can also be identified and addressed. The development of [Amaru](https://github.com/pragma-org/amaru) has already proven this on several occasions. In the long run, more node implementations can be a synonym for reduced development time by allowing all implementations to converge faster towards better designs and more robust implementations.</p>
                </details>
              </li>
              <li>
                <details><summary>5. Decentralization</summary>
                <p className="text-muted-foreground">In a world where Byzantine fault tolerance is at the centre and where decentralization is a paramount value, we believe that a single-node implementation presents a single point of failure and a central point of control. A new node not only increases the overall resilience of the network but also provides perspectives in terms of a roadmap and use cases.</p>
                </details>
              </li>
            </ul>
            <p className="text-muted-foreground"><span className="text-foreground">With Amaru, we believe that we can reconcile these goals while preserving Cardano's focus on security and robustness.</span> Like Haskell, Rust is a statically typed language that provides strong compile-time guarantees and fine-grained memory management. Its ecosystem is also well-equipped for high assurance, making it a sane choice for implementing blockchain solutions.</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bordered-div-padding relative space-y-8">
          {/*
          <div className="bg-secondary text-secondary-foreground absolute top-0 right-0 px-3 py-2.5 text-sm leading-none font-medium">
            We&apos;re hiring!
          </div>
          */}

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Users className="size-5" />
              Core Team
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              A diverse team of experts from all across the Cardano ecosystem.
            </p>

            {/* Team Members */}
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
              {teamMembers.slice(0, 3).map(displayTeamMember)}
            </div>
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
              {teamMembers.slice(3, 6).map(displayTeamMember)}
            </div>
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
              {teamMembers.slice(6, 9).map(displayTeamMember)}
            </div>
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
              {teamMembers.slice(9, 12).map(displayTeamMember)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
