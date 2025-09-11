import { Card } from "@/components/ui/card";
import { 
  Users, 
  Dumbbell, 
  CreditCard, 
  BarChart3, 
  Calendar,
  Shield,
  Smartphone,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Gestão de Alunos",
    description: "Cadastre e organize todos os seus alunos com informações completas, objetivos e histórico de progresso.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Dumbbell,
    title: "Criação de Treinos",
    description: "Monte treinos personalizados com nossa biblioteca de exercícios e templates prontos para usar.",
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: CreditCard,
    title: "Controle Financeiro",
    description: "Gerencie pagamentos, mensalidades e tenha controle total da sua receita em tempo real.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: BarChart3,
    title: "Relatórios e Analytics",
    description: "Acompanhe métricas importantes e o progresso dos seus alunos com relatórios detalhados.",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Calendar,
    title: "Agendamento",
    description: "Sistema de agendamento integrado para consultas e sessões de treinamento.",
    gradient: "from-teal-500 to-teal-600"
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Seus dados e dos seus alunos estão protegidos com criptografia de ponta a ponta.",
    gradient: "from-red-500 to-red-600"
  },
  {
    icon: Smartphone,
    title: "Acesso Mobile",
    description: "App mobile para seus alunos acessarem treinos e você gerenciar de qualquer lugar.",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Zap,
    title: "Automação",
    description: "Automatize lembretes de pagamento, notificações e comunicação com alunos.",
    gradient: "from-yellow-500 to-yellow-600"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Tudo que você precisa para{" "}
            <span className="text-gradient">crescer</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa com todas as ferramentas necessárias para 
            levar seu negócio de personal trainer ao próximo nível.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="card-fitness group hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}