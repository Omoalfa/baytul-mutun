'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useEnrollInCourse } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';

interface EnrollButtonProps {
  courseId: number;
}

export function EnrollButton({ courseId }: EnrollButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { mutate: enrollInCourse, isPending: enrolling } = useEnrollInCourse();

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    enrollInCourse(courseId, {
      onSuccess: () => {
        toast({
          title: 'Enrolled successfully!',
          description: 'You can now start learning.',
        });
        router.push(`/courses/my/${courseId}`);
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Button
      onClick={handleEnroll}
      className="w-full"
      disabled={enrolling}
    >
      {enrolling && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {user ? 'Enroll Now' : 'Login to Enroll'}
    </Button>
  );
}
