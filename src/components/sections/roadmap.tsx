'use client';

import { useState } from 'react';

import { ClockFading, Package } from 'lucide-react';
import { FaDiscord, FaGithub } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SITE_METADATA } from '@/consts';
import { cn } from '@/lib/utils';

type Status = 'All' | 'In Progress' | 'Planned' | 'Shipped';

type RoadmapItem = {
  status: Exclude<Status, 'All'>;
  title: string;
  description: string;
  date: string;
  team: {
    name: string;
    image: string;
  };
};

type Props = { roadmapItems: RoadmapItem[] };

const statuses: Status[] = ['All', 'In Progress', 'Planned', 'Shipped'];

export function RoadmapSection({ roadmapItems }: Props) {
  const [activeStatus, setActiveStatus] = useState<Status>('All');

  // Filter items based on active status
  const filteredItems =
    activeStatus === 'All'
      ? roadmapItems
      : roadmapItems.filter((item) => item.status === activeStatus);

  return (
    <section className="container">
      <div>
        <div className="bordered-div-padding border-x border-b border-[#30e2a3]">
          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            Roadmap
          </h1>
          <div className="container">
            <div className="flex items-center justify-center">
              <img
                src="/images/landing/roadmap.webp"
                alt="Hero Image"
                width='100%'
                height='auto'
                className="mask-b-from-80% mask-b-to-95% mask-r-from-80% mask-r-to-95% mask-t-from-80% mark-t-to-95% mask-l-from-80% mask-l-to-95%"
              />
            </div>
          </div>
          <div className="mt-6 block md:hidden">
            <Select
              value={activeStatus}
              onValueChange={(value) => setActiveStatus(value as Status)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{activeStatus}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bordered-div-padding hidden border-x border-b border-[#30d0b1] md:block">
          <Tabs
            value={activeStatus}
            onValueChange={(value) => setActiveStatus(value as Status)}
          >
            <TabsList className="flex gap-3">
              {statuses.map((status) => (
                <TabsTrigger key={status} value={status}>
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-x border-[#30bcc2]">
          {filteredItems.map((item, index) => {
            // Determine if this is in the last row
            const isLastRow =
              index >=
              filteredItems.length - (filteredItems.length % 2 === 0 ? 2 : 1);
            // Is it the last item?
            const isLastItem = index === filteredItems.length - 1;
            // Is it odd and in an odd position? (left column)
            const isLeftColumn = index % 2 === 0;
            // Is it the last item in an odd-length list?
            const isLastSingleItem =
              isLastItem && filteredItems.length % 2 !== 0;

            return (
              <Item
                key={index}
                item={item}
                className={cn({
                  'border-[#30bcc2]': true,
                  // No bottom border for last row items
                  'border-b-0': isLastRow,
                  // No right border for items in the right column
                  'md:border-r-0': !isLeftColumn,
                  // Full width and no borders for last item in odd-length list
                  'md:col-span-2': isLastSingleItem,
                  // Add right border only to left column items
                  'md:border-r': isLeftColumn && !isLastSingleItem,
                })}
              />
            );
          })}
        </div>

        <div className="bordered-div-padding space-y-6 border-[#31a2d8] border-x border-t">
          <h3 className="font-weight-display leading-snug tracking-tighter md:text-xl">
            Community engagement
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            We build in public. Want to request something or upvote a feature?
            Join the conversation on:
          </p>
          <div className="flex gap-3 md:gap-6">
            <a href={SITE_METADATA.github.discussions_link} className="">
              <Button size="sm" variant="default" className="">
                <FaGithub className="size-5" />
                Github Discussions
              </Button>
            </a>
            <a href={SITE_METADATA.discord.invitation_link} className="">
              <Button size="sm" variant="outline" className="">
                <FaDiscord className="size-5" />
                Discord
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ item, className }: { item: RoadmapItem; className?: string }) {
  const statusColors: Record<RoadmapItem['status'], string> = {
    'In Progress': 'bg-chart-1/10',
    Planned: 'bg-chart-2/10 ',
    Shipped: 'bg-chart-3/10',
  };

  return (
    <div
      className={cn(
        'bordered-div-padding hover:bg-muted/30 group dark:hover:bg-muted border-b',
        className,
      )}
    >
      <div className="">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="default"
            className={cn(
              'text-foreground w-[6.6875rem]',
              statusColors[item.status],
            )}
          >
            {item.status}
          </Badge>
          <div className="text-muted-foreground flex items-center gap-3">
            {item.status === 'Shipped' ? (
              <Package className="size-5" />
            ) : (
              <ClockFading className="size-5" />
            )}
            <span className="text-sm font-medium">{item.date} ago</span>
          </div>
        </div>
        <h2 className="font-weight-display mt-4 leading-snug tracking-tighter md:text-xl">
          {item.title}
        </h2>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed md:text-base">
          {item.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between md:mt-8 lg:mt-10">
        {item.team && (
          <div className="flex items-center gap-2">
            <img
              src={item.team.image}
              alt={item.team.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-muted-foreground text-sm font-medium">
              {item.team.name}
            </span>
          </div>
        )}
        <a href={SITE_METADATA.github.repository_link}>
          <FaGithub className="size-5" />
        </a>
      </div>
    </div>
  );
}
