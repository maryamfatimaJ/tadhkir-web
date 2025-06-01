"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dailyAyat } from "@/lib/data";
import { setLastSeenDate, shouldShowNewDaily, getFavoriteAyat, saveFavoriteAyat } from "@/lib/localStorage";
import { BookMarked, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DailyAyatPage() {
  const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
  const [favoriteAyatIds, setFavoriteAyatIds] = useState<number[]>([]);
  
  useEffect(() => {
    // Get favorite ayat
    const storedFavorites = getFavoriteAyat();
    setFavoriteAyatIds(storedFavorites);
    
    // Determine which ayat to show based on date
    const date = new Date();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
    const ayatIndex = dayOfYear % dailyAyat.length;
    setCurrentAyatIndex(ayatIndex);
    
    // Update last seen date
    if (shouldShowNewDaily()) {
      setLastSeenDate();
    }
  }, []);
  
  const toggleFavorite = (ayatId: number) => {
    setFavoriteAyatIds(prev => {
      if (prev.includes(ayatId)) {
        const updated = prev.filter(id => id !== ayatId);
        saveFavoriteAyat(updated);
        return updated;
      } else {
        const updated = [...prev, ayatId];
        saveFavoriteAyat(updated);
        return updated;
      }
    });
  };
  
  const favoriteAyat = dailyAyat.filter(ayat => favoriteAyatIds.includes(ayat.id));
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Daily Ayat</h1>
      
      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="daily">Today's Ayat</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favoriteAyat.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <Card className="mb-6 overflow-hidden">
            <div className="bg-muted p-6 text-center">
              <p className="text-2xl font-amiri leading-relaxed mb-2 text-primary">
                {dailyAyat[currentAyatIndex].arabicText}
              </p>
              <p className="text-lg font-medium italic">
                {dailyAyat[currentAyatIndex].translation}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Surah {dailyAyat[currentAyatIndex].surah} - Ayat {dailyAyat[currentAyatIndex].ayatNumber}
              </p>
            </div>
            
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
              <p>{dailyAyat[currentAyatIndex].explanation}</p>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => toggleFavorite(dailyAyat[currentAyatIndex].id)}
              >
                <Heart 
                  className={`mr-2 h-4 w-4 ${
                    favoriteAyatIds.includes(dailyAyat[currentAyatIndex].id) 
                      ? "fill-red-500 text-red-500" 
                      : ""
                  }`} 
                />
                {favoriteAyatIds.includes(dailyAyat[currentAyatIndex].id) 
                  ? "Favorited" 
                  : "Add to Favorites"}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Your daily ayat refreshes every day
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites">
          {favoriteAyat.length === 0 ? (
            <div className="text-center py-12">
              <BookMarked className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">
                Add ayat to your favorites to easily access them later
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {favoriteAyat.map(ayat => (
                <Card key={ayat.id} className="overflow-hidden">
                  <div className="bg-muted p-6 text-center">
                    <p className="text-xl font-amiri leading-relaxed mb-2 text-primary">
                      {ayat.arabicText}
                    </p>
                    <p className="text-base font-medium italic">
                      {ayat.translation}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Surah {ayat.surah} - Ayat {ayat.ayatNumber}
                    </p>
                  </div>
                  
                  <CardContent className="pt-6">
                    <p className="text-sm">{ayat.explanation}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                      onClick={() => toggleFavorite(ayat.id)}
                    >
                      <Heart className="mr-2 h-4 w-4 fill-red-500" />
                      Remove from Favorites
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}