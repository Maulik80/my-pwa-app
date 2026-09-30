import { cn } from '../../lib/utils';

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export default function Main({ children, className }: MainProps) {
  return (
    <main className={cn('flex-1 p-4 pb-20 md:pb-4 md:pl-4', className)}>
      {children}
    </main>
  );
}
