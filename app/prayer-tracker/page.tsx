"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTodayDateString, getPrayers, savePrayers } from "@/lib/localStorage";
import { DailyPrayers, PrayerName, PrayerStatus } from "@/lib/types";
import { Check, Clock, X, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PrayerTrackerPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [prayers, setPrayers] = useState<DailyPrayers[]>([]);
  const [selectedDayPrayers, setSelectedDayPrayers] = useState<DailyPrayers | null>(null);
  
  // Prayer names in order
  const prayerNames: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  useEffect(() => {
    const storedPrayers = getPrayers();
    setPrayers(storedPrayers);
    
    // Set selected day prayers for today initially
    const today = getTodayDateString();
    const todayPrayers = storedPrayers.find(p => p.date === today);
    if (todayPrayers) {
      setSelectedDayPrayers(todayPrayers);
    } else {
      // Create new entry for today
      const newTodayPrayers: DailyPrayers = {
        date: today,
        prayers: {
          Fajr: "missed",
          Dhuhr: "missed",
          Asr: "missed",
          Maghrib: "missed",
          Isha: "missed"
        }
      };
      setSelectedDayPrayers(newTodayPrayers);
    }
  }, []);
  
  useEffect(() => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      const dayPrayers = prayers.find(p => p.date === dateString);
      
      if (dayPrayers) {
        setSelectedDayPrayers(dayPrayers);
      } else {
        // Create new entry for selected date
        const newDayPrayers: DailyPrayers = {
          date: dateString,
          prayers: {
            Fajr: "missed",
            Dhuhr: "missed",
            Asr: "missed",
            Maghrib: "missed",
            Isha: "missed"
          }
        };
        setSelectedDayPrayers(newDayPrayers);
      }
    }
  }, [date, prayers]);
  
  const handlePrayerStatusToggle = (prayerName: PrayerName) => {
    if (!selectedDayPrayers) return;
    
    // Get current status
    const currentStatus = selectedDayPrayers.prayers[prayerName];
    
    // Cycle through statuses: missed -> performed -> qadha -> jamaat -> missed
    let newStatus: PrayerStatus;
    switch (currentStatus) {
      case "missed":
        newStatus = "performed";
        break;
      case "performed":
        newStatus = "qadha";
        break;
      case "qadha":
        newStatus = "jamaat";
        break;
      case "jamaat":
        newStatus = "missed";
        break;
      default:
        newStatus = "missed";
    }
    
    // Update selected day prayers
    const updatedSelectedDayPrayers = {
      ...selectedDayPrayers,
      prayers: {
        ...selectedDayPrayers.prayers,
        [prayerName]: newStatus
      }
    };
    
    setSelectedDayPrayers(updatedSelectedDayPrayers);
    
    // Update prayers array
    const updatedPrayers = prayers.filter(p => p.date !== selectedDayPrayers.date);
    updatedPrayers.push(updatedSelectedDayPrayers);
    setPrayers(updatedPrayers);
    
    // Save to localStorage
    savePrayers(updatedPrayers);
  };
  
  const getStatusIcon = (status: PrayerStatus) => {
    switch (status) {
      case "performed":
        return <Check className="h-5 w-5" />;
      case "qadha":
        return <div className="flex">
          <Check className="h-5 w-5" />
          <Check className="h-5 w-5 -ml-1" />
        </div>;
      case "missed":
        return <X className="h-5 w-5" />;
      case "jamaat":
        return <Users className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };
  
  const getStatusColor = (status: PrayerStatus) => {
    switch (status) {
      case "performed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "qadha":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "missed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "jamaat":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Prayer Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? new Date(date).toLocaleDateString("en-US", { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayPrayers && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">Performed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Qadha Done</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">Missed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Prayed in Jamaat</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {prayerNames.map((prayerName) => (
                    <Button
                      key={prayerName}
                      variant="outline"
                      className={cn(
                        "w-full justify-between h-auto py-3",
                        getStatusColor(selectedDayPrayers.prayers[prayerName])
                      )}
                      onClick={() => handlePrayerStatusToggle(prayerName)}
                    >
                      <span className="font-medium">{prayerName}</span>
                      <span>{getStatusIcon(selectedDayPrayers.prayers[prayerName])}</span>
                    </Button>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Tap on a prayer to cycle through different statuses
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}