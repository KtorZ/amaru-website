'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Meteors } from '@/components/magicui/meteors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SITE_METADATA } from '@/consts';

type Category =
  | 'Developers & SPOs'
  | 'Cardano & Community'
  | 'Treasury & Funding';

const categories: Category[] = [
  'Developers & SPOs',
  'Cardano & Community',
  'Treasury & Funding',
];

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const faqs: Record<Category, FAQ[]> = {
  'Developers & SPOs': [
    {
      question: 'What is Amaru?',
      answer:
        'Amaru is a Cardano node implementation written in Rust, designed to be modular, resource-efficient, and fully compatible with the Cardano protocol. It re-implements the core components of the existing Haskell node — ledger, consensus, networking — with a focus on memory safety, observability, and maintainability.',
    },
    {
      question: 'How is Amaru architectured?',
      answer: (
        <>
          <p>
            Amaru follows a layered and modular architecture, with separate
            layers for:
          </p>
          <ul>
            <li>• Networking (P2P protocol, relay, gossip)</li>
            <li>• Consensus (Ouroboros implementation)</li>
            <li>• Ledger (Cardano ledger rules and state transitions)</li>
            <li>• Plutus (Smart contracts virtual machine)</li>
            <li>
              • Storage (RocksDB-backed, designed for incremental sync and
              efficient pruning)
            </li>
            <li>
              • Observability (structured JSON logs and OpenTelemetry tracing)
            </li>
          </ul>
          <p>
            Each subsystem comes also as a Rust library, providing clear
            interfaces and making Amaru a toolkit as much as a node.
          </p>
        </>
      ),
    },
    {
      question:
        'What makes Amaru different from the existing Haskell Cardano node?',
      answer: (
        <>
          <p>Key differences include:</p>
          <ul>
            <li>• Hardware requirements: Focuses on small resource usages.</li>
            <li>
              • User experience: Easier onboarding for developers and ops alike.
            </li>
            <li>
              • Observability: First-class tracing and JSON logging via
              OpenTelemetry.
            </li>
            <li>
              • Portability: Targets a variety of platforms and archs (e.g.,
              ARM, RISC-V, WASM).
            </li>
            <li>
              • Modularity: Components (e.g., ledger, consensus) can evolve
              independently.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'When will one be able to run Amaru?',
      answer:
        "While few parts are still in the making and we definitely don't recommend using Amaru as your sole block producer, we are *already* looking for pioneer willing to try out Amaru and help us iron out the edges.",
    },
  ],
  'Cardano & Community': [
    {
      question: 'Why does Cardano need another node implementation?',
      answer:
        'Having multiple node implementations increases resilience and decentralization. If one node (e.g., the Haskell one) has a critical bug, the network remains operational thanks to protocol diversity. It also prevents ecosystem dependence on a single vendor or codebase.',
    },
    {
      question: 'Who is building Amaru?',
      answer:
        'Amaru is developed by PRAGMA, a consortium of Cardano ecosystem builders that includes independent engineering teams and ecosystem contributors. The Cardano Foundation and Sundae Labs are the two primary contributors to Amaru.',
    },
    {
      question: 'How can I follow progress or get involved?',
      answer: (
        <>
          <p>You can:</p>
          <ul>
            <li>
              • Star and follow the{' '}
              <a href={SITE_METADATA.github.repository_link} target="_blank">
                GitHub repository
              </a>
            </li>
            <li>
              • Join discussions on{' '}
              <a href={SITE_METADATA.discord.invitation_link}>Discord</a>
            </li>
            <li>
              • Follow the project on{' '}
              <a href={SITE_METADATA.twitter.profile_link}>Twitter/X</a>
            </li>
            <li>• Attend the bi-monthly demo on Discord</li>
          </ul>
        </>
      ),
    },
  ],
  'Treasury & Funding': [
    {
      question: 'How is Amaru funded?',
      answer:
        "Amaru's funding comes from multiple sources. Either directly by specific organisations (..., Cardano Foundation, Sundae Labs). Via Catalyst, through specific missions. Amaru is also one of the first infrastructure projects to be funded through Cardano’s on-chain treasury mechanism. It has received community approval via governance actions to withdraw budget allocations aimed at core infrastructure development.",
    },
    {
      question: 'How are funds managed and reported?',
      answer: (
        <>
          <p>
            The project commits to transparent milestone-based reporting,
            including public budget recaps, code milestones, and development
            progress visible on-chain and via GitHub activity. Community updates
            are periodically published{' '}
            <a
              href="https://github.com/pragma-org/amaru-treasury.git"
              target="_blank"
            >
              on Github
            </a>
            .
          </p>
        </>
      ),
    },
  ],
};

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<Category>(categories[0]);

  return (
    <section className="overflow-hidden">
      <div className="container divide-y">
        <div className="bordered-div-padding border-x border-[#30e2a3]">
          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            FAQs
          </h1>
          <div className="mt-6 block md:hidden">
            <Select
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as Category)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{activeTab}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bordered-div-padding relative hidden border-x border-[#30d0b1] md:block">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Category)}
            className=""
          >
            <TabsList className="flex gap-3">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="border-x border-[#30bcc2]">
          <Accordion type="single" collapsible>
            {faqs[activeTab].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-[#30bcc2]"
              >
                <AccordionTrigger className="bordered-div-padding font-weight-display flex w-full items-center justify-between !pb-4 text-base hover:no-underline md:!pb-6 md:text-xl [&>svg]:hidden [&[data-state=open]_svg]:rotate-180">
                  <span>{faq.question}</span>
                  <div className="bg-card flex size-8 items-center justify-center rounded-sm border">
                    <ChevronDown className="size-5 shrink-0 tracking-tight transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground bordered-div-padding max-w-2xl !pt-0 leading-relaxed tracking-tight">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="hidden border-x border-[#31a2d8] p-10 md:block" />
      </div>
    </section>
  );
}
