'use client';

import { AnnouncementBanner } from './AnnouncementBanner';
import Header from './Header';

export default function HeaderStack() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <AnnouncementBanner />
      <Header />
    </div>
  );
}
