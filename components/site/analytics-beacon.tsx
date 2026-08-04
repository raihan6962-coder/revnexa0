'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { insertPageView } from '@/lib/data';

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const deviceType = getDeviceType();
    const sessionId = getSessionId();

    insertPageView({
      path: pathname,
      referrer: document.referrer || null,
      device_type: deviceType,
      session_id: sessionId,
    }).catch(() => {});
  }, [pathname]);

  return null;
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|windows phone/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getSessionId(): string {
  const key = 'revnexa_session';
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(key, id);
  return id;
}
