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
import { cn } from '@/lib/utils';

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
  const [showSubmitSummary, setShowSubmitSummary] = useState(false);

  const { data: quizResponse, isLoading, error } = useModuleQuestions(params.moduleId, params.id);
  const submitTest = useSubmitModuleTest();

  const quizQuestions = quizResponse?.data || [];
  const progress = (Object.keys(answers).length / quizQuestions.length) * 100;

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
          {error && <p className="mt-2 text-red-500">{error.message}</p>}
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

  return (
    <div className="space-y-6">
      {/* Test Summary Dialog */}
      <AlertDialog open={showSubmitSummary} onOpenChange={setShowSubmitSummary}>
        <AlertDialogContent className="max-w-2xl bg-white dark:bg-slate-900 p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle className="text-xl font-bold text-black dark:text-white">Test Summary</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-800 dark:text-slate-200">
              <p className="mb-4">Please review your answers before final submission:</p>
              <div className="grid grid-cols-2 gap-2">
                {quizQuestions.map((question, index) => {
                  const isAnswered = !!answers[question.id]?.length;
                  return (
                    <div
                      key={question.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-md cursor-pointer",
                        isAnswered 
                          ? "bg-green-light text-green-dark hover:bg-green-light/80" 
                          : "bg-gold/20 text-gold hover:bg-gold/30"
                      )}
                      onClick={() => {
                        setShowSubmitSummary(false);
                        setCurrentQuestionIndex(index);
                      }}
                    >
                      <span className="font-medium">Question {index + 1}</span>
                      <span className={cn(
                        "text-sm",
                        isAnswered ? "text-green" : "text-gold"
                      )}>
                        {isAnswered ? "Answered" : "Not Answered"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                Click on any question to review your answer
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowSubmitSummary(false)}
              className="border-2 border-gold text-gold hover:bg-gold hover:text-white"
            >
              Review Answers
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={submitTest.isPending}
              className="bg-green text-white hover:bg-green-dark"
            >
              {submitTest.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Confirm Submission'
              )}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Warning Dialog */}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent className="bg-white dark:bg-slate-900 p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle className="text-xl font-bold text-black dark:text-white">
              Important Test Information
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-800 dark:text-slate-200">
              <p className="mb-4">Please note:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>You can only take this test once</li>
                <li>If you close or leave this page, your answers will be automatically submitted</li>
                <li>Make sure you have a stable internet connection</li>
                <li>Take your time and answer carefully</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end mt-8">
            <Button 
              onClick={() => setShowWarning(false)}
              className="bg-green text-white hover:bg-green-dark px-8"
            >
              I Understand
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="bg-background">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Module Test</CardTitle>
          </div>
          <Progress value={progress} className="mt-4" />
          <p className="text-sm text-muted-foreground mt-2">
            {Object.keys(answers).length} of {quizQuestions.length} questions answered
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="p-6 bg-accent/50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">
                  {index + 1}. {question.question}
                </h3>

                {question.type === QuestionType.SHORT_ANSWER && (
                  <Textarea
                    value={answers[question.id]?.[0] || ''}
                    onChange={(e) => 
                      setAnswers(prev => ({
                        ...prev,
                        [question.id]: [e.target.value]
                      }))
                    }
                    placeholder="Type your answer here..."
                    className="min-h-[100px] bg-background"
                  />
                )}

                {question.type === QuestionType.SINGLE_CHOICE && (
                  <RadioGroup
                    value={answers[question.id]?.[0] || ''}
                    onValueChange={(value) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: [value],
                      }))
                    }
                    className="space-y-2"
                  >
                    {question.options.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-background p-3 rounded-md">
                        <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
                        <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === QuestionType.MULTIPLE_CHOICE && (
                  <div className="space-y-2">
                    {question.options.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-background p-3 rounded-md">
                        <Checkbox
                          id={`${question.id}-${idx}`}
                          checked={answers[question.id]?.includes(option)}
                          onCheckedChange={(checked) => {
                            setAnswers((prev) => {
                              const currentAnswers = prev[question.id] || [];
                              if (checked) {
                                return {
                                  ...prev,
                                  [question.id]: [...currentAnswers, option]
                                };
                              } else {
                                return {
                                  ...prev,
                                  [question.id]: currentAnswers.filter(a => a !== option)
                                };
                              }
                            });
                          }}
                        />
                        <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === QuestionType.TRUE_FALSE && (
                  <RadioGroup
                    value={answers[question.id]?.[0] || ''}
                    onValueChange={(value) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: [value],
                      }))
                    }
                    className="space-y-2"
                  >
                    {['true', 'false'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 bg-background p-3 rounded-md">
                        <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                        <Label htmlFor={`${question.id}-${option}`} className="capitalize">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button at the bottom */}
          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              onClick={() => setShowSubmitSummary(true)}
              className="px-8"
            >
              Review & Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
