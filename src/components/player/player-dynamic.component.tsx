'use client';

import dynamic from 'next/dynamic';

// Loaded through a Client Component boundary because `ssr: false` is not
// allowed inside Server Components. Server prerendering stays disabled to
// prevent hydration errors.
const AudioPlayer = dynamic(() => import('./player.component'), {
  ssr: false,
});

export default AudioPlayer;
