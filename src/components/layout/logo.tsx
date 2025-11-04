import { cn } from '@/lib/utils';

interface LogoProps {
  iconClassName?: string;
  wordmarkClassName?: string;
  className?: string;
  href?: string;
}

export default function Logo({
  iconClassName,
  wordmarkClassName,
  className,
  href = '/',
}: LogoProps) {
  return (
    <a href={href} style={{position: "relative", top: "-5px", left: "10px"}} className={cn('flex items-center', className)}>
      <img
        src="/layout/logo-icon.svg"
        alt="Scalar Logo"
        width={40}
        height={40}
        className={cn('object-contain', iconClassName)}
      />
      <img
        src="/layout/logo-wordmark.svg"
        alt="Scalar"
        width={133}
        height={40}
        style={{marginLeft: "-8px"}}
        className={cn('object-contain', wordmarkClassName)}
      />
    </a>
  );
}
