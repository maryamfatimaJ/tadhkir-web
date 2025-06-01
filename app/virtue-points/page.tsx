"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { virtueActions } from "@/lib/data";
import { VirtueRecord } from "@/lib/types";
import { getVirtueRecords, saveVirtueRecords, getTodayDateString } from "@/lib/localStorage";
import { Award, Plus, Crown, TrendingUp, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VirtuePointsPage() {
  const [records, setRecords] = useState<VirtueRecord[]>([]);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [weeklyGoal] = useState(150); // Example weekly goal
  
  useEffect(() => {
    const storedRecords = getVirtueRecords();
    setRecords(storedRecords);
    
    // Calculate weekly and daily totals
    calculateTotals(storedRecords);
  }, []);
  
  const calculateTotals = (recs: VirtueRecord[]) => {
    const today = getTodayDateString();
    
    // Get dates for the past week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split("T")[0];
    
    // Filter records for this week and today
    const weeklyRecords = recs.filter(r => r.date >= weekAgoStr);
    const todayRecords = recs.filter(r => r.date === today);
    
    // Calculate totals
    const weeklySum = weeklyRecords.reduce((sum, r) => sum + r.points, 0);
    const todaySum = todayRecords.reduce((sum, r) => sum + r.points, 0);
    
    setWeeklyTotal(weeklySum);
    setTodayTotal(todaySum);
  };
  
  const addVirtuePoints = (actionId: string) => {
    const today = getTodayDateString();
    
    // Find the action to get points value
    const action = virtueActions.find(a => a.id === actionId);
    if (!action) return;
    
    // Create new record
    const newRecord: VirtueRecord = {
      id: Date.now().toString(),
      actionId,
      date: today,
      points: action.points
    };
    
    // Add to records
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    saveVirtueRecords(updatedRecords);
    
    // Recalculate totals
    calculateTotals(updatedRecords);
  };
  
  const getAchievementLevel = (points: number) => {
    if (points >= 500) return "Master";
    if (points >= 300) return "Expert";
    if (points >= 200) return "Intermediate";
    if (points >= 100) return "Beginner";
    return "Novice";
  };
  
  const getMotivationalMessage = (level: string) => {
    switch (level) {
      case "Master":
        return "MashaAllah! Your dedication is inspiring others!";
      case "Expert":
        return "Amazing progress! You're on a beautiful spiritual journey.";
      case "Intermediate":
        return "You're growing steadily in your practice. Keep going!";
      case "Beginner":
        return "A wonderful start to your journey. Stay consistent!";
      default:
        return "Every small step counts. Begin your journey today!";
    }
  };
  
  const getTotalPoints = () => {
    return records.reduce((sum, r) => sum + r.points, 0);
  };
  
  const level = getAchievementLevel(getTotalPoints());
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Virtue Points</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-amber-500" />
              <span>Your Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <Badge className="mb-2 text-lg py-1 px-3 bg-primary/10 text-primary border-primary hover:bg-primary/20">
                {level}
              </Badge>
              <p className="text-muted-foreground text-sm mb-3">
                {getMotivationalMessage(level)}
              </p>
              <p className="text-lg font-medium">
                Total Points: <span className="text-primary">{getTotalPoints()}</span>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
              <span>Weekly Progress</span>
            </CardTitle>
            <CardDescription>
              Goal: {weeklyGoal} points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={(weeklyTotal / weeklyGoal) * 100} className="h-3" />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-lg font-medium">{todayTotal} pts</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-lg font-medium">{weeklyTotal} pts</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Goal</p>
                  <p className="text-lg font-medium">{weeklyGoal} pts</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Virtue Points</CardTitle>
          <CardDescription>
            Track your good deeds and earn points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {virtueActions.map(action => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col"
                onClick={() => addVirtuePoints(action.id)}
              >
                <span className="font-medium mb-1">{action.name}</span>
                <Badge variant="secondary" className="mb-1">+{action.points} pts</Badge>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Reminder: Points are meant to motivate, not to show off. Keep your intentions pure.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}