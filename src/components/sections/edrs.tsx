'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { EdrData } from '@/lib/edr';
import { cn } from '@/lib/utils';

type Category = 'All' | 'Architecture' | 'Process';

const categories: Category[] = ['All', 'Architecture', 'Process'];

const types = {
  Architecture: 'architecture',
  Process: 'process',
};

const POSTS_PER_PAGE = 30;

export default function Edrs({ edrs }: { edrs: EdrData[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Filter EDR by type
  const filteredPosts =
    activeCategory === 'All'
      ? edrs
      : edrs.filter((edr) => edr.data.type == types[activeCategory]);

  // Get currently visible posts
  const visiblePostsList = filteredPosts.slice(0, visiblePosts);

  // Determine if there are more posts to show
  const hasMorePosts = visiblePosts < filteredPosts.length;

  // Function to load more posts
  const loadMorePosts = () => {
    setIsLoading(true);

    // Simulate network delay for loading effect
    setTimeout(() => {
      setVisiblePosts((prev) =>
        Math.min(prev + POSTS_PER_PAGE, filteredPosts.length),
      );
      setIsLoading(false);
    }, 200);
  };

  // Reset visible posts when changing category
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setVisiblePosts(POSTS_PER_PAGE);
  };

  return (
    <section className="container">
      <div>
        <div className="border-x border-b border-[#30e2a3] bg-[url(/images/landing/database_knowledge.webp)] bg-center bg-cover bg-no-repeat pb-35">
          <h1 className="bordered-div-padding font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl drop-shadow-lg">
            Engineering Decision Records
          </h1>
          <div className="mt-6 block md:hidden">
            <Select
              value={activeCategory}
              onValueChange={(value) => handleCategoryChange(value as Category)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{activeCategory}</SelectValue>
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

        <div className="bordered-div-padding hidden border-x border-b border-[#30d0b1] md:block">
          <Tabs
            value={activeCategory}
            onValueChange={(value) => handleCategoryChange(value as Category)}
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

        <div className="grid grid-cols-1 border-x border-[#30bcc2] md:grid-cols-2">
          {visiblePostsList.map((edr, index) => {
            // Determine if this is in the last row
            const isLastRow =
              index >=
              visiblePostsList.length -
                (visiblePostsList.length % 2 === 0 ? 2 : 1);
            // Is it the last item?
            const isLastItem = index === visiblePostsList.length - 1;
            // Is it odd and in an odd position? (left column)
            const isLeftColumn = index % 2 === 0;
            // Is it the last item in an odd-length list?
            const isLastSingleItem =
              isLastItem && visiblePostsList.length % 2 !== 0;

            return (
              <EdrItem
                key={index}
                edr={edr}
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

        {filteredPosts.length > 0 && (
          <div className="bordered-div-padding flex flex-col items-center justify-center gap-4 border border-[#31a2d8] text-center">
            {hasMorePosts && (
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                onClick={loadMorePosts}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Show More EDRs'
                )}
              </Button>
            )}
            <p className="text-muted-foreground text-sm">
              Showing {Math.min(visiblePosts, filteredPosts.length)} of{' '}
              {filteredPosts.length} EDRs
            </p>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="bordered-div-padding text-center">
            <p className="text-muted-foreground">
              No EDRs found for this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function EdrItem({ edr, className }: { edr: EdrData; className?: string }) {
  return (
    <a
      href={`/edrs/${edr.id}`}
      className={cn(
        'bordered-div-padding hover:bg-muted/30 dark:hover:bg-muted block border-b',
        className,
      )}
    >
      <div className="">
        <div className="flex items-center justify-between gap-2">
          <span className="text-secondary text-sm font-medium md:text-base">
            {edr.data.type}
          </span>
          <span
            className={`text-muted-foreground text-sm ${edr.data.status === 'rejected' ? 'text-red-200' : ''}`}
          >
            {edr.data.status}
          </span>
        </div>
        <h2 className="font-weight-display mt-4 text-base leading-snug tracking-tighter md:text-xl">
          {edr.id}
        </h2>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed md:text-base">
          {edr.description}
        </p>
      </div>
    </a>
  );
}
