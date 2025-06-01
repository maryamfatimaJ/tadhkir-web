"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveTasbeehCount, getTasbeehCount } from "@/lib/localStorage";
import { RotateCcw, PauseCircle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TasbeehPage() {
  const [counts, setCounts] = useState({
    subhanAllah: 0,
    alhamdulillah: 0,
    allahuAkbar: 0
  });
  
  const [currentTab, setCurrentTab] = useState("subhanAllah");
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Load saved counts
    const savedCounts = getTasbeehCount();
    setCounts(savedCounts);
  }, []);
  
  const incrementCount = (type: "subhanAllah" | "alhamdulillah" | "allahuAkbar") => {
    setCounts(prev => {
      const newCounts = {
        ...prev,
        [type]: prev[type] + 1
      };
      saveTasbeehCount(newCounts);
      return newCounts;
    });
  };
  
  const resetCount = (type: "subhanAllah" | "alhamdulillah" | "allahuAkbar") => {
    setCounts(prev => {
      const newCounts = {
        ...prev,
        [type]: 0
      };
      saveTasbeehCount(newCounts);
      return newCounts;
    });
  };
  
  const resetAllCounts = () => {
    const newCounts = {
      subhanAllah: 0,
      alhamdulillah: 0,
      allahuAkbar: 0
    };
    setCounts(newCounts);
    saveTasbeehCount(newCounts);
  };
  
  const getProgressPercentage = (count: number, target: number) => {
    return Math.min((count / target) * 100, 100);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Digital Tasbeeh</h1>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="subhanAllah">SubhanAllah</TabsTrigger>
          <TabsTrigger value="alhamdulillah">Alhamdulillah</TabsTrigger>
          <TabsTrigger value="allahuAkbar">Allahu Akbar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subhanAllah" className="focus-visible:outline-none focus-visible:ring-0">
          <TasbeehCounter
            title="SubhanAllah"
            description="Glory be to Allah"
            count={counts.subhanAllah}
            target={33}
            onIncrement={() => incrementCount("subhanAllah")}
            onReset={() => resetCount("subhanAllah")}
            isActive={isActive && currentTab === "subhanAllah"}
            setIsActive={setIsActive}
          />
        </TabsContent>
        
        <TabsContent value="alhamdulillah" className="focus-visible:outline-none focus-visible:ring-0">
          <TasbeehCounter
            title="Alhamdulillah"
            description="Praise be to Allah"
            count={counts.alhamdulillah}
            target={33}
            onIncrement={() => incrementCount("alhamdulillah")}
            onReset={() => resetCount("alhamdulillah")}
            isActive={isActive && currentTab === "alhamdulillah"}
            setIsActive={setIsActive}
          />
        </TabsContent>
        
        <TabsContent value="allahuAkbar" className="focus-visible:outline-none focus-visible:ring-0">
          <TasbeehCounter
            title="Allahu Akbar"
            description="Allah is the Greatest"
            count={counts.allahuAkbar}
            target={34}
            onIncrement={() => incrementCount("allahuAkbar")}
            onReset={() => resetCount("allahuAkbar")}
            isActive={isActive && currentTab === "allahuAkbar"}
            setIsActive={setIsActive}
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center">
        <Button variant="outline" onClick={resetAllCounts}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset All Counters
        </Button>
      </div>
    </div>
  );
}

interface TasbeehCounterProps {
  title: string;
  description: string;
  count: number;
  target: number;
  onIncrement: () => void;
  onReset: () => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

function TasbeehCounter({
  title,
  description,
  count,
  target,
  onIncrement,
  onReset,
  isActive,
  setIsActive
}: TasbeehCounterProps) {
  const progress = (count / target) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center">
        <div
          className="relative flex items-center justify-center w-60 h-60 rounded-full cursor-pointer mb-4"
          onClick={onIncrement}
        >
          {/* Progress Circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted"
            />
            
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transform="rotate(-90 50 50)"
              className="text-primary transition-all duration-300"
            />
          </svg>
          
          {/* Count Text */}
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-bold">{count}</span>
            <span className="text-sm text-muted-foreground">of {target}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? (
              <PauseCircle className="h-5 w-5" />
            ) : (
              <PlayCircle className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="outline" size="icon" onClick={onReset}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="justify-center">
        <p className={cn(
          "text-sm",
          count >= target ? "text-green-600 dark:text-green-400 font-medium" : "text-muted-foreground"
        )}>
          {count >= target 
            ? "Completed! You can continue or reset." 
            : `Tap the circle to increment the count`}
        </p>
      </CardFooter>
    </Card>
  );
}