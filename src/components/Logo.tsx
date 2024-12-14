import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: 'white' | 'dark';
}

const sizes = {
  sm: 40,
  md: 48,
  lg: 64
};

export default function Logo({ size = 'md', showText = true, textColor = 'dark' }: LogoProps) {
  const dimension = sizes[size];
  const textColorClasses = {
    dark: 'text-green-dark',
    white: 'text-white'
  };

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative">
        <Image
          src="/images/logo.png"
          alt="Baytul Mutun Logo"
          width={dimension}
          height={dimension}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`text-lg font-semibold ${textColorClasses[textColor]}`}>
            Baytul Mutun
          </span>
          <span className={`text-sm ${textColor === 'white' ? 'text-gray-200' : 'text-gray-600'}`}>
            Wal Manzumaat
          </span>
        </div>
      )}
    </Link>
  );
}
