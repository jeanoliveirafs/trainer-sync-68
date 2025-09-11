import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import StudentsManager from "@/components/StudentsManager";
import WorkoutBuilder from "@/components/WorkoutBuilder";
import { useState } from "react";

type Page = "home" | "dashboard" | "students" | "workouts";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <StudentsManager />;
      case "workouts":
        return <WorkoutBuilder />;
      default:
        return (
          <>
            <Hero />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Demo Navigation - In a real app this would be proper routing */}
      {currentPage !== "home" && (
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-1 py-4">
              <button 
                onClick={() => setCurrentPage("home")}
                className="text-primary hover:underline"
              >
                Home
              </button>
              <span className="text-muted-foreground">/</span>
              <button 
                onClick={() => setCurrentPage("dashboard")}
                className={`hover:underline ${currentPage === "dashboard" ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentPage("students")}
                className={`hover:underline ${currentPage === "students" ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                Alunos
              </button>
              <button 
                onClick={() => setCurrentPage("workouts")}
                className={`hover:underline ${currentPage === "workouts" ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                Treinos
              </button>
            </div>
          </div>
        </div>
      )}

      {renderPage()}

      {/* Demo Action Buttons */}
      {currentPage === "home" && (
        <div className="fixed bottom-6 right-6 space-y-2">
          <div className="bg-card border border-border rounded-lg p-4 shadow-medium animate-fade-in">
            <p className="text-sm text-muted-foreground mb-3">🚀 Demonstração:</p>
            <div className="space-y-2">
              <button 
                onClick={() => setCurrentPage("dashboard")}
                className="block w-full text-left px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Ver Dashboard
              </button>
              <button 
                onClick={() => setCurrentPage("students")}
                className="block w-full text-left px-3 py-2 text-sm bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
              >
                Gerenciar Alunos
              </button>
              <button 
                onClick={() => setCurrentPage("workouts")}
                className="block w-full text-left px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
              >
                Criar Treinos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
