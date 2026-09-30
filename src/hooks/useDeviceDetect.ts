import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

function getDevice(width: number): DeviceInfo {
  if (width < 768) {
    return { device: 'mobile', isMobile: true, isTablet: false, isDesktop: false, width };
  }
  if (width < 1024) {
    return { device: 'tablet', isMobile: false, isTablet: true, isDesktop: false, width };
  }
  return { device: 'desktop', isMobile: false, isTablet: false, isDesktop: true, width };
}

export function useDeviceDetect(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>(() =>
    getDevice(typeof window !== 'undefined' ? window.innerWidth : 375)
  );

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}
