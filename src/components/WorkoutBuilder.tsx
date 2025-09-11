import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Trash2,
  GripVertical,
  Timer,
  RotateCcw,
  Weight,
  Target
} from "lucide-react";
import { useState } from "react";

const exerciseLibrary = [
  {
    id: 1,
    name: "Supino Reto",
    category: "Peito",
    muscle: "Peitoral Maior",
    equipment: "Barra"
  },
  {
    id: 2,
    name: "Agachamento",
    category: "Pernas",
    muscle: "Quadríceps",
    equipment: "Barra"
  },
  {
    id: 3,
    name: "Remada Curvada",
    category: "Costas",
    muscle: "Latíssimo",
    equipment: "Barra"
  },
  {
    id: 4,
    name: "Desenvolvimento",
    category: "Ombros",
    muscle: "Deltóide",
    equipment: "Halteres"
  },
  {
    id: 5,
    name: "Rosca Direta",
    category: "Bíceps",
    muscle: "Bíceps",
    equipment: "Barra"
  },
  {
    id: 6,
    name: "Tríceps Testa",
    category: "Tríceps",
    muscle: "Tríceps",
    equipment: "Barra"
  }
];

const categories = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

interface WorkoutExercise {
  id: number;
  exerciseId: number;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
}

export default function WorkoutBuilder() {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);

  const filteredExercises = exerciseLibrary.filter(exercise => {
    const matchesCategory = selectedCategory === "Todos" || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addExercise = (exercise: typeof exerciseLibrary[0]) => {
    const newExercise: WorkoutExercise = {
      id: Date.now(),
      exerciseId: exercise.id,
      name: exercise.name,
      sets: 3,
      reps: "10-12",
      weight: "",
      rest: "60s",
      notes: ""
    };
    setWorkoutExercises([...workoutExercises, newExercise]);
  };

  const removeExercise = (id: number) => {
    setWorkoutExercises(workoutExercises.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: number, field: keyof WorkoutExercise, value: string | number) => {
    setWorkoutExercises(workoutExercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Criador de Treinos</h1>
          <p className="text-muted-foreground mt-2">
            Monte treinos personalizados para seus alunos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Salvar como Template
          </Button>
          <Button className="btn-fitness">
            Salvar Treino
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Exercise Library */}
        <div className="lg:col-span-1">
          <Card className="card-fitness">
            <h3 className="text-lg font-semibold mb-4">Biblioteca de Exercícios</h3>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar exercícios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "btn-fitness" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Exercise List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => addExercise(exercise)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {exercise.muscle} • {exercise.equipment}
                      </p>
                    </div>
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Workout Builder */}
        <div className="lg:col-span-2">
          <Card className="card-fitness">
            <div className="mb-6">
              <Input
                placeholder="Nome do treino (ex: Treino A - Peito e Tríceps)"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="text-lg font-semibold"
              />
            </div>

            {workoutExercises.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Comece criando seu treino</h3>
                <p className="text-muted-foreground">
                  Selecione exercícios da biblioteca ao lado para montar o treino.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {workoutExercises.map((exercise, index) => (
                  <Card key={exercise.id} className="p-4 border border-border">
                    <div className="flex items-start gap-4">
                      <div className="mt-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">{exercise.name}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExercise(exercise.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Séries</label>
                            <Input
                              type="number"
                              value={exercise.sets}
                              onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Repetições</label>
                            <Input
                              value={exercise.reps}
                              onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                              placeholder="ex: 10-12"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Carga</label>
                            <Input
                              value={exercise.weight}
                              onChange={(e) => updateExercise(exercise.id, 'weight', e.target.value)}
                              placeholder="ex: 40kg"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Descanso</label>
                            <Input
                              value={exercise.rest}
                              onChange={(e) => updateExercise(exercise.id, 'rest', e.target.value)}
                              placeholder="ex: 60s"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Observações</label>
                          <Input
                            value={exercise.notes}
                            onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                            placeholder="Observações sobre execução, progressão, etc."
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{workoutExercises.length} exercícios</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Timer className="h-4 w-4" />
                      <span>~{workoutExercises.length * 4}min estimado</span>
                    </div>
                  </div>
                  
                  <Button className="btn-fitness">
                    <Plus className="mr-2 h-4 w-4" />
                    Salvar Treino
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}