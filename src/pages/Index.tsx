import { ArrowRight, Sparkles, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 luxury-gradient opacity-95"></div>
        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm">
              <Crown className="h-4 w-4 gold-accent" />
              <span className="luxury-text text-sm">Luxury Experience</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-extralight mb-8 tracking-wider">
              MAISON
            </h1>
            
            <div className="w-24 h-px bg-white/40 mx-auto mb-8"></div>
            
            <p className="text-xl md:text-2xl font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover the art of elegance through our curated collection of exceptional experiences
            </p>
            
            <Button 
              variant="outline" 
              size="lg"
              className="luxury-text border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-500 px-8 py-6 text-sm"
            >
              Explore Collection
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-32 container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extralight mb-6 tracking-wider charcoal-text">
            SAVOIR-FAIRE
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Each creation embodies the perfect harmony between tradition and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Sparkles,
              title: "Exceptional Craftsmanship",
              description: "Every detail meticulously crafted with the finest materials and techniques passed down through generations."
            },
            {
              icon: Crown,
              title: "Timeless Elegance",
              description: "Designs that transcend trends, creating pieces that remain beautiful and relevant across decades."
            },
            {
              icon: Star,
              title: "Personalized Service",
              description: "Bespoke experiences tailored to your unique vision and refined taste."
            }
          ].map((feature, index) => (
            <Card key={index} className="dior-elegance minimal-border luxury-hover group">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-light mb-6 luxury-text text-sm tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extralight mb-8 tracking-wider charcoal-text">
            BEGIN YOUR JOURNEY
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the pinnacle of luxury and sophistication
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="luxury-text px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-500"
            >
              Discover More
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="luxury-text px-8 py-6 border-primary/20 hover:border-primary/40 transition-all duration-500"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="luxury-text text-2xl mb-4 tracking-[0.3em]">
            MAISON
          </div>
          <div className="w-8 h-px bg-accent mx-auto mb-6"></div>
          <p className="text-sm opacity-70 tracking-wide">
            © 2024 Maison. Crafted with excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;