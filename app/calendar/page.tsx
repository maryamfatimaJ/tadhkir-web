"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { islamicEvents } from "@/lib/data";
import { IslamicEvent } from "@/lib/types";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<IslamicEvent | null>(null);
  
  // Helper function to convert hijri date to a readable format
  const formatHijriDate = (hijriDate: string) => {
    return hijriDate; // Already formatted in the data
  };
  
  // Check if a date has an Islamic event
  const hasIslamicEvent = (date: Date): IslamicEvent | null => {
    const dateString = date.toISOString().split("T")[0];
    const event = islamicEvents.find(e => e.gregorianDate === dateString);
    return event || null;
  };
  
  // Handle date change
  const handleDateChange = (date?: Date) => {
    if (!date) return;
    
    setDate(date);
    const event = hasIslamicEvent(date);
    setSelectedEvent(event);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Islamic Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Calendar</CardTitle>
            <CardDescription>
              View Islamic events and important dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md border"
              modifiers={{
                event: (date) => hasIslamicEvent(date) !== null,
              }}
              modifiersStyles={{
                event: { 
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--primary) / 0.1)',
                  color: 'hsl(var(--primary))'
                }
              }}
            />
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-primary/30"></div>
                <span className="text-sm">Islamic Event</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? date.toLocaleDateString("en-US", { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "Select a date"}
            </CardTitle>
            <CardDescription>
              {selectedEvent ? (
                <Badge variant="outline" className="mt-1">
                  {selectedEvent.name}
                </Badge>
              ) : "No Islamic events on this date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">{selectedEvent.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatHijriDate(selectedEvent.hijriDate)}
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p>{selectedEvent.description}</p>
                </div>
                
                <Badge className={`${
                  selectedEvent.importance === "major" 
                    ? "bg-primary/20 text-primary border-primary hover:bg-primary/30" 
                    : "bg-muted"
                }`}>
                  {selectedEvent.importance === "major" ? "Major Event" : "Minor Event"}
                </Badge>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Select a date with an Islamic event to see details
                </p>
                
                <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
                <div className="space-y-2">
                  {islamicEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="flex justify-between">
                      <span>{event.name}</span>
                      <span className="text-muted-foreground">{event.gregorianDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}