import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X, LogOut, Home, Users, Activity, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">TrainerSync</span>
          </Link>

          {user ? (
            <>
              {/* Desktop Menu - Authenticated */}
              <div className="hidden md:flex items-center space-x-8">
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 text-sm ${
                    location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  } transition-colors`}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/students" 
                  className={`flex items-center space-x-2 text-sm ${
                    location.pathname === '/students' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  } transition-colors`}
                >
                  <Users className="h-4 w-4" />
                  <span>Alunos</span>
                </Link>
                <Link 
                  to="/workouts" 
                  className={`flex items-center space-x-2 text-sm ${
                    location.pathname === '/workouts' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  } transition-colors`}
                >
                  <Activity className="h-4 w-4" />
                  <span>Treinos</span>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={signOut}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Desktop Menu - Not Authenticated */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Recursos
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Preços
                </a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </a>
                <div className="flex items-center space-x-4">
                  <Link to="/auth">
                    <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-primary hover:bg-primary/90">
                      Começar Grátis
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center space-x-2 py-2 ${
                      location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    } transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/students" 
                    className={`flex items-center space-x-2 py-2 ${
                      location.pathname === '/students' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    } transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    <span>Alunos</span>
                  </Link>
                  <Link 
                    to="/workouts" 
                    className={`flex items-center space-x-2 py-2 ${
                      location.pathname === '/workouts' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    } transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Activity className="h-4 w-4" />
                    <span>Treinos</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="justify-start flex items-center space-x-2 text-muted-foreground hover:text-primary"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </Button>
                </>
              ) : (
                <>
                  <a href="#features" className="text-muted-foreground hover:text-primary transition-colors py-2">
                    Recursos
                  </a>
                  <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors py-2">
                    Preços
                  </a>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors py-2">
                    Sobre
                  </a>
                  <div className="flex flex-col space-y-2 pt-4">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="justify-start text-muted-foreground hover:text-primary w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="justify-start bg-primary hover:bg-primary/90 w-full">
                        Começar Grátis
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}