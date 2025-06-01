"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dailyIntentions } from "@/lib/data";
import { setLastSeenDate, shouldShowNewDaily } from "@/lib/localStorage";
import { RefreshCw, Plus } from "lucide-react";

export default function IntentionPage() {
  const [currentIntention, setCurrentIntention] = useState("");
  const [customIntention, setCustomIntention] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  
  useEffect(() => {
    // Get a random intention based on the day
    const date = new Date();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
    const intentionIndex = dayOfYear % dailyIntentions.length;
    setCurrentIntention(dailyIntentions[intentionIndex].text);
    
    // Check if we need a new intention
    if (shouldShowNewDaily()) {
      setLastSeenDate();
    }
    
    // Get saved custom intention if any
    const savedCustomIntention = localStorage.getItem("tadhkir-custom-intention");
    if (savedCustomIntention) {
      setCustomIntention(savedCustomIntention);
    }
  }, []);
  
  const getRandomIntention = () => {
    const randomIndex = Math.floor(Math.random() * dailyIntentions.length);
    setCurrentIntention(dailyIntentions[randomIndex].text);
  };
  
  const saveCustomIntention = (text: string) => {
    setCustomIntention(text);
    localStorage.setItem("tadhkir-custom-intention", text);
    setShowCustom(true);
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Today's Intention</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Today's Focus</span>
            <Button variant="ghost" size="icon" onClick={getRandomIntention}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-lg text-center">
            <p className="text-xl font-medium">
              {showCustom ? customIntention : currentIntention}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Intention
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Your Own Intention</DialogTitle>
                <DialogDescription>
                  Set a personal intention to focus on for today
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="customIntention">Your Intention</Label>
                <Input
                  id="customIntention"
                  value={customIntention}
                  onChange={(e) => setCustomIntention(e.target.value)}
                  placeholder="Today I will..."
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <Button 
                  onClick={() => saveCustomIntention(customIntention)}
                  disabled={!customIntention.trim()}
                >
                  Set Intention
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {customIntention && (
            <Button
              variant="ghost"
              onClick={() => setShowCustom(!showCustom)}
            >
              Show {showCustom ? "Suggested" : "Custom"} Intention
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">How to Use Your Intention</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Read your intention in the morning and set your mindset for the day</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Check back throughout the day to remind yourself of your focus</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>In the evening, reflect on how well you followed your intention</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Create your own custom intention or refresh for a new suggestion</span>
          </li>
        </ul>
      </div>
    </div>
  );
}