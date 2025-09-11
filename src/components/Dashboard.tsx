import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp,
  Plus,
  MoreVertical,
  Calendar,
  Target
} from "lucide-react";

const stats = [
  {
    title: "Alunos Ativos",
    value: "24",
    change: "+3 este mês",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Receita Mensal",
    value: "R$ 8.400",
    change: "+12% vs mês anterior",
    icon: DollarSign,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Treinos Criados",
    value: "156",
    change: "+28 esta semana",
    icon: Activity,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Taxa de Retenção",
    value: "94%",
    change: "+2% vs mês anterior",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const recentStudents = [
  {
    name: "Ana Silva",
    status: "Pagamento em dia",
    lastWorkout: "2 dias atrás",
    avatar: "AS",
    color: "bg-primary"
  },
  {
    name: "Carlos Santos",
    status: "Vence em 3 dias",
    lastWorkout: "1 dia atrás",
    avatar: "CS",
    color: "bg-accent"
  },
  {
    name: "Marina Costa",
    status: "Pagamento pendente",
    lastWorkout: "5 dias atrás",
    avatar: "MC",
    color: "bg-warning"
  },
  {
    name: "Pedro Lima",
    status: "Pagamento em dia",
    lastWorkout: "Hoje",
    avatar: "PL",
    color: "bg-purple-600"
  }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo de volta! Aqui está um resumo do seu negócio.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar
          </Button>
          <Button className="btn-fitness">
            <Plus className="mr-2 h-4 w-4" />
            Novo Aluno
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="card-fitness animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Students */}
        <Card className="card-fitness lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Alunos Recentes</h3>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentStudents.map((student, index) => (
              <div
                key={student.name}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${student.color} flex items-center justify-center text-white font-medium`}>
                    {student.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Último treino: {student.lastWorkout}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    student.status.includes('pendente') ? 'text-warning' :
                    student.status.includes('Vence') ? 'text-orange-600' :
                    'text-accent'
                  }`}>
                    {student.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white">
            Ver Todos os Alunos
          </Button>
        </Card>

        {/* Quick Actions */}
        <Card className="card-fitness">
          <h3 className="text-lg font-semibold mb-6">Ações Rápidas</h3>
          
          <div className="space-y-3">
            <Button className="w-full btn-fitness justify-start">
              <Users className="mr-2 h-4 w-4" />
              Adicionar Aluno
            </Button>
            
            <Button className="w-full btn-accent justify-start">
              <Activity className="mr-2 h-4 w-4" />
              Criar Treino
            </Button>
            
            <Button variant="outline" className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-white">
              <Target className="mr-2 h-4 w-4" />
              Definir Meta
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Consulta
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-soft rounded-lg">
            <h4 className="font-medium mb-2 text-primary">💡 Dica do Dia</h4>
            <p className="text-sm text-muted-foreground">
              Alunos que recebem feedback regular têm 40% mais chances de atingir seus objetivos.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}