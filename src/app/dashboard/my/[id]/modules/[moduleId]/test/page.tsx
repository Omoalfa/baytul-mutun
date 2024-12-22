'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useModuleQuestions, useSubmitModuleTest } from '@/hooks/useApi';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { QuestionType } from '@/types/index';

interface PageProps {
  params: {
    id: number;
    moduleId: number;
  };
}

export default function TestPage({ params }: PageProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showWarning, setShowWarning] = useState(true);

  const { data: { data: quizQuestions}, isLoading, error } = useModuleQuestions(params.moduleId, params.id);
  const submitTest = useSubmitModuleTest();

  useEffect(() => {
    // Add event listener for page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleSubmit();
      }
    };

    // Add event listener for beforeunload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      handleSubmit();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async () => {
    if (submitTest.isPending) return;

    try {
      await submitTest.mutateAsync({
        moduleId: params.moduleId,
        courseId: params.id,
        answers: Object.entries(answers).map(([questionId, answers]) => ({
          questionId: parseInt(questionId),
          answers
        }))
      });

      router.push(`/dashboard/courses/${params.id}/modules/${params.moduleId}`);
    } catch (error) {
      console.error('Failed to submit test:', error);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quizQuestions?.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !quizQuestions.length) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="mt-2 text-gray-600">Failed to load test questions</p>
          <Button
            onClick={() => router.push(`/dashboard/courses/${params.id}/modules/${params.moduleId}`)}
            className="mt-4"
          >
            Back to Module
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <>
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Important Test Information</AlertDialogTitle>
            <AlertDialogDescription>
              Please note:
              <ul className="list-disc pl-4 mt-2">
                <li>You can only take this test once</li>
                <li>If you close or leave this page, your answers will be automatically submitted</li>
                <li>Make sure you have a stable internet connection</li>
                <li>Take your time and answer carefully</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button onClick={() => setShowWarning(false)}>I Understand</Button>
        </AlertDialogContent>
      </AlertDialog>

      <div className="container max-w-3xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </CardTitle>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-lg">{currentQuestion.question}</p>

              {currentQuestion.type == QuestionType.SHORT_ANSWER && (
                <Textarea
                  value={answers[currentQuestion.id]?.[0] || ''}
                  onChange={(e) => 
                    setAnswers(prev => ({
                      ...prev,
                      [currentQuestion.id]: [e.target.value]
                    }))
                  }
                  placeholder="Type your answer here..."
                  className="min-h-[100px]"
                />
              )}

              {currentQuestion.type === QuestionType.SINGLE_CHOICE && (
                <RadioGroup
                  value={answers[currentQuestion.id]?.[0] || ''}
                  onValueChange={(value) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: [value],
                    }))
                  }
                >
                  {currentQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${currentQuestion.id}-${idx}`} />
                      <Label htmlFor={`${currentQuestion.id}-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === QuestionType.MULTIPLE_CHOICE && (
                <div className="space-y-2">
                  {currentQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${currentQuestion.id}-${idx}`}
                        checked={answers[currentQuestion.id]?.includes(option)}
                        onCheckedChange={(checked) => {
                          setAnswers((prev) => {
                            const currentAnswers = prev[currentQuestion.id] || [];
                            if (checked) {
                              return {
                                ...prev,
                                [currentQuestion.id]: [...currentAnswers, option]
                              };
                            } else {
                              return {
                                ...prev,
                                [currentQuestion.id]: currentAnswers.filter(a => a !== option)
                              };
                            }
                          });
                        }}
                      />
                      <Label htmlFor={`${currentQuestion.id}-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === QuestionType.TRUE_FALSE && (
                <RadioGroup
                  value={answers[currentQuestion.id]?.[0] || ''}
                  onValueChange={(value) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: [value],
                    }))
                  }
                >
                  {['true', 'false'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                      <Label htmlFor={`${currentQuestion.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {currentQuestionIndex === quizQuestions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={submitTest.isPending}>
                  {submitTest.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Test'
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
