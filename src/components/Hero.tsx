import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fitness.jpg";

export default function Hero() {
  return (
    <section className="pt-20 pb-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Avaliado por +500 personal trainers
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Gerencie seus{" "}
              <span className="text-gradient">alunos</span>{" "}
              como um{" "}
              <span className="text-gradient">profissional</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A plataforma completa para personal trainers criarem treinos personalizados, 
              gerenciarem pagamentos e acompanharem o progresso dos alunos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/auth">
                <Button className="btn-hero text-lg px-8 py-4 w-full sm:w-auto">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-white">
                <Play className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Personal Trainers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-accent mr-2" />
                  <span className="text-2xl font-bold">15K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Alunos Ativos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-accent mr-2" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">Avaliação</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-3xl"></div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Personal trainer using FitnessPro dashboard"
                className="w-full h-auto rounded-3xl shadow-strong animate-float"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-medium animate-fade-in">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">15 novos alunos hoje</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-medium animate-fade-in">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">R$ 12.500 este mês</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}