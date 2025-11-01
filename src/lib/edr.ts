// Types for edr that match Astro's content collection schema
export interface EdrData {
  id: string;
  body?: string;
  collection: 'edrs';
  description: string;
  data: {
    type: string;
    status: string;
  };
}
