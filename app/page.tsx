import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeCarousel from "@/components/features/home/carousel";

export default function Home() {
  return (
    <div className="space-y-8 pt-4">
      <section className="space-y-4">
        <HomeCarousel />
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Start Your Spiritual Journey</h2>
        <p className="text-center text-muted-foreground">
          Track your prayers, build good habits, and strengthen your connection with Allah
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <FeatureCard 
            title="Prayer Tracker" 
            description="Track your daily prayers and monitor your consistency"
            href="/prayer-tracker"
            imageUrl="\pngtree-muslim-praying-namaz-picture-image_15436955.jpg"
          />
          
          <FeatureCard 
            title="Habit Tracker" 
            description="Build and maintain beneficial Islamic habits"
            href="/habit-tracker"
            imageUrl="\habit.jpg"
          
          />
          
          <FeatureCard 
            title="Daily Ayat" 
            description="Receive daily wisdom from the Quran with translations"
            href="/daily-ayat"
            imageUrl="\daily-ayat.jpg"
          />
          
          <FeatureCard 
            title="Tasbeeh Counter" 
            description="Digital dhikr counter for your daily remembrance"
            href="/tasbeeh"
            imageUrl="\tasbeeh.jpg"
          />
          
          <FeatureCard 
            title="Intention Setter" 
            description="Set your daily intention for spiritual growth"
            href="/intention"
            imageUrl="\intention.jpg"
          />

            <FeatureCard 
            title="Virtue Points" 
            description="Gamify your spiritual journey with rewards"
            href="/virtue-points"
            imageUrl="\virtue.jpg"
          />
        </div>
      </section>
      
      <section className="bg-muted py-8 -mx-4 px-4 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Your Faith, Your Journey</h2>
          <p className="mb-6">
            Tadhkir helps you maintain your Islamic practices while respecting your privacy.
            All your data is stored locally on your device.
          </p>
          <Button asChild>
            <Link href="/prayer-tracker">
              Start Tracking Your Prayers <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ 
  title, 
  description, 
  href, 
  imageUrl 
}: { 
  title: string; 
  description: string; 
  href: string; 
  imageUrl: string;
}) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-48">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill 
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button asChild variant="outline" size="sm">
          <Link href={href}>
            Explore <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}