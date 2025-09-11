import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Activity,
  Filter
} from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 99999-1234",
    status: "active",
    paymentStatus: "paid",
    nextPayment: "2024-02-15",
    monthlyFee: 150,
    joinDate: "2023-08-15",
    lastWorkout: "2024-01-10",
    workoutsThisMonth: 12,
    goal: "Perda de peso",
    avatar: "AS"
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos.santos@email.com",
    phone: "(11) 99999-5678",
    status: "active",
    paymentStatus: "pending",
    nextPayment: "2024-01-18",
    monthlyFee: 200,
    joinDate: "2023-10-20",
    lastWorkout: "2024-01-12",
    workoutsThisMonth: 8,
    goal: "Ganho de massa",
    avatar: "CS"
  },
  {
    id: 3,
    name: "Marina Costa",
    email: "marina.costa@email.com",
    phone: "(11) 99999-9012",
    status: "active",
    paymentStatus: "overdue",
    nextPayment: "2024-01-05",
    monthlyFee: 180,
    joinDate: "2023-06-10",
    lastWorkout: "2024-01-08",
    workoutsThisMonth: 15,
    goal: "Condicionamento",
    avatar: "MC"
  },
  {
    id: 4,
    name: "Pedro Lima",
    email: "pedro.lima@email.com",
    phone: "(11) 99999-3456",
    status: "inactive",
    paymentStatus: "paid",
    nextPayment: "2024-02-20",
    monthlyFee: 150,
    joinDate: "2023-12-01",
    lastWorkout: "2024-01-13",
    workoutsThisMonth: 6,
    goal: "Reabilitação",
    avatar: "PL"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-accent text-accent-foreground";
    case "inactive": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid": return "bg-accent text-accent-foreground";
    case "pending": return "bg-warning text-warning-foreground";
    case "overdue": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function StudentsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Alunos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os seus alunos em um só lugar
          </p>
        </div>
        <Button className="btn-fitness">
          <Plus className="mr-2 h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-fitness">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar alunos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={filterStatus === "all" ? "btn-fitness" : ""}
            >
              Todos
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => setFilterStatus("active")}
              className={filterStatus === "active" ? "btn-fitness" : ""}
            >
              Ativos
            </Button>
            <Button
              variant={filterStatus === "inactive" ? "default" : "outline"}
              onClick={() => setFilterStatus("inactive")}
              className={filterStatus === "inactive" ? "btn-fitness" : ""}
            >
              Inativos
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Students Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <Card
            key={student.id}
            className="card-fitness hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  {student.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.goal}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Último treino: {new Date(student.lastWorkout).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Badge className={getStatusColor(student.status)}>
                {student.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
              <Badge className={getPaymentStatusColor(student.paymentStatus)}>
                {student.paymentStatus === "paid" ? "Pago" :
                 student.paymentStatus === "pending" ? "Pendente" : "Vencido"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Activity className="h-4 w-4 text-primary mr-1" />
                  <span className="text-lg font-bold">{student.workoutsThisMonth}</span>
                </div>
                <p className="text-xs text-muted-foreground">Treinos/mês</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <DollarSign className="h-4 w-4 text-accent mr-1" />
                  <span className="text-lg font-bold">R$ {student.monthlyFee}</span>
                </div>
                <p className="text-xs text-muted-foreground">Mensalidade</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                Ver Perfil
              </Button>
              <Button className="flex-1 btn-accent">
                Novo Treino
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="card-fitness text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhum aluno encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar seus filtros ou adicione um novo aluno.
          </p>
          <Button className="btn-fitness">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Primeiro Aluno
          </Button>
        </Card>
      )}
    </div>
  );
}