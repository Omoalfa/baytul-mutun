'use client';

interface CoursePlaceholderProps {
  title: string;
}

const getInitials = (title: string) => {
  return title
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Generate a consistent color based on the title
const getColorFromTitle = (title: string) => {
  const colors = [
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-purple-100 text-purple-600',
    'bg-pink-100 text-pink-600',
    'bg-yellow-100 text-yellow-600',
    'bg-indigo-100 text-indigo-600',
  ];
  
  const index = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

export default function CoursePlaceholder({ title }: CoursePlaceholderProps) {
  const initials = getInitials(title);
  const colorClasses = getColorFromTitle(title);

  return (
    <div className={`w-full h-full ${colorClasses} flex items-center justify-center`}>
      <span className="text-4xl font-semibold">{initials}</span>
    </div>
  );
}
