"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getTodayDateString, getHabits, saveHabits } from "@/lib/localStorage";
import { Habit } from "@/lib/types";
import { Plus, CheckCircle2, Circle, Trash2, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ habitName: string }>();
  
  useEffect(() => {
    const storedHabits = getHabits();
    setHabits(storedHabits);
  }, []);
  
  const onSubmit = handleSubmit((data) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: data.habitName,
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
    
    reset();
    setOpenDialog(false);
  });
  
  const toggleHabitCompletion = (habitId: string) => {
    const today = getTodayDateString();
    
    setHabits(prevHabits => {
      const updatedHabits = prevHabits.map(habit => {
        if (habit.id === habitId) {
          const isAlreadyCompleted = habit.completedDates.includes(today);
          
          if (isAlreadyCompleted) {
            // Remove today from completed dates
            const updatedDates = habit.completedDates.filter(date => date !== today);
            
            // Update streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split("T")[0];
            
            const hasYesterday = habit.completedDates.includes(yesterdayString);
            
            return {
              ...habit,
              completedDates: updatedDates,
              streak: hasYesterday ? habit.streak : Math.max(0, habit.streak - 1)
            };
          } else {
            // Add today to completed dates
            const updatedDates = [...habit.completedDates, today];
            
            // Check if we need to update streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split("T")[0];
            
            const hasYesterday = habit.completedDates.includes(yesterdayString);
            
            return {
              ...habit,
              completedDates: updatedDates,
              streak: hasYesterday ? habit.streak + 1 : 1
            };
          }
        }
        return habit;
      });
      
      saveHabits(updatedHabits);
      return updatedHabits;
    });
  };
  
  const deleteHabit = (habitId: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };
  
  const isHabitCompletedToday = (habit: Habit) => {
    const today = getTodayDateString();
    return habit.completedDates.includes(today);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={onSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Habit</DialogTitle>
                <DialogDescription>
                  Create a new habit to track consistently
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="habitName">Habit Name</Label>
                  <Input
                    id="habitName"
                    placeholder="e.g., Read Quran daily"
                    {...register("habitName", { required: "Habit name is required" })}
                  />
                  {errors.habitName && (
                    <p className="text-sm text-red-500">{errors.habitName.message}</p>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Habit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {habits.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No habits added yet</p>
            <Button onClick={() => setOpenDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Habit
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map((habit) => (
            <Card key={habit.id} className={cn(
              "transition-all duration-300",
              isHabitCompletedToday(habit) ? "border-green-500 dark:border-green-700" : ""
            )}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{habit.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => deleteHabit(habit.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Created {new Date(habit.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">
                    {habit.streak} day{habit.streak !== 1 ? "s" : ""} streak
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={isHabitCompletedToday(habit) ? "default" : "outline"}
                  onClick={() => toggleHabitCompletion(habit.id)}
                >
                  {isHabitCompletedToday(habit) ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Completed Today
                    </>
                  ) : (
                    <>
                      <Circle className="mr-2 h-5 w-5" />
                      Mark as Completed
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}