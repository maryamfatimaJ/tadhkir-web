"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizQuestions } from "@/lib/data";
import { setLastSeenDate, shouldShowNewDaily } from "@/lib/localStorage";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  useEffect(() => {
    // Determine which question to show based on date
    const date = new Date();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
    const questionIndex = dayOfYear % quizQuestions.length;
    setCurrentQuestion(questionIndex);
    
    // Update last seen date
    if (shouldShowNewDaily()) {
      setLastSeenDate();
    }
  }, []);
  
  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };
  
  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
  };
  
  const resetQuiz = () => {
    // Get a different random question
    let newIndex = Math.floor(Math.random() * quizQuestions.length);
    while (newIndex === currentQuestion) {
      newIndex = Math.floor(Math.random() * quizQuestions.length);
    }
    
    setCurrentQuestion(newIndex);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Islamic Quiz</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Question of the Day</CardTitle>
          <CardDescription>
            Test your Islamic knowledge with today's question
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">
              {quizQuestions[currentQuestion].question}
            </h3>
            
            <RadioGroup value={selectedAnswer?.toString()}>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={
                      isAnswered && index === quizQuestions[currentQuestion].correctAnswer
                        ? "text-green-500 border-green-500"
                        : isAnswered && index === selectedAnswer && !isCorrect
                        ? "text-red-500 border-red-500"
                        : ""
                    }
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className={`cursor-pointer ${
                      isAnswered && index === quizQuestions[currentQuestion].correctAnswer
                        ? "text-green-600 dark:text-green-400 font-medium"
                        : isAnswered && index === selectedAnswer && !isCorrect
                        ? "text-red-600 dark:text-red-400"
                        : ""
                    }`}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {isAnswered && (
            <div className={`p-4 rounded-lg mb-4 ${
              isCorrect ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
            }`}>
              <div className="flex">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${
                    isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </p>
                  <p className="mt-1 text-sm">
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isAnswered ? (
            <Button onClick={checkAnswer} disabled={selectedAnswer === null}>
              Check Answer
            </Button>
          ) : (
            <Button onClick={resetQuiz}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Another Question
            </Button>
          )}
          
          <div className="text-sm text-muted-foreground">
            Difficulty: {quizQuestions[currentQuestion].difficulty}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}