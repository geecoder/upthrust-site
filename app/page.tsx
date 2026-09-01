import { HomeContent } from '@/components/proto/HomeContent';

// The home route is the prototype's `isHome` block. All of its markup,
// ordering, copy and interaction lives in HomeContent — this file exists only
// to keep the route a server component.
//
// Sections that used to be here but are not in the prototype's home route
// (live session band, "the problem", "how it works", the Capability Passport
// showcase, the premise pull-quote, "who it's for", the founder band) stay
// preserved and unwired under components/home/_unused/.

export default function HomePage() {
  return <HomeContent />;
}
