"use client";

import dynamic from 'next/dynamic';

const TopicSidebar = dynamic(() => import('@/features/learning-path/components/TopicSidebar').then((mod: any) => mod.TopicSidebar || mod.default), { ssr: false });

export default function ClientSidebar() {
  return <TopicSidebar />;
}