-- Criar tabela de perfis para personal trainers
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  specialty TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de alunos
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  birth_date DATE,
  goals TEXT,
  restrictions TEXT,
  payment_status TEXT NOT NULL DEFAULT 'active' CHECK (payment_status IN ('active', 'pending', 'blocked')),
  payment_due_date DATE,
  monthly_fee DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de exercícios
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  instructions TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de treinos
CREATE TABLE public.workouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  student_id UUID NOT NULL,
  name TEXT NOT NULL,
  division TEXT NOT NULL, -- A, B, C, etc.
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de exercícios do treino
CREATE TABLE public.workout_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workout_id UUID NOT NULL,
  exercise_id UUID NOT NULL,
  sets INTEGER NOT NULL,
  reps TEXT NOT NULL, -- pode ser "12" ou "10-12" ou "até a falha"
  weight DECIMAL(5,2),
  rest_time INTEGER, -- em segundos
  order_index INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de pagamentos
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de progresso dos treinos
CREATE TABLE public.workout_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  workout_id UUID NOT NULL,
  workout_exercise_id UUID NOT NULL,
  completed_sets INTEGER NOT NULL DEFAULT 0,
  completed_reps TEXT,
  weight_used DECIMAL(5,2),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_progress ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policies para students (apenas trainers podem ver/gerenciar seus alunos)
CREATE POLICY "Trainers can view their students" 
ON public.students FOR SELECT 
USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can insert students" 
ON public.students FOR INSERT 
WITH CHECK (auth.uid() = trainer_id);

CREATE POLICY "Trainers can update their students" 
ON public.students FOR UPDATE 
USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can delete their students" 
ON public.students FOR DELETE 
USING (auth.uid() = trainer_id);

-- Policies para exercises (públicos para leitura)
CREATE POLICY "Everyone can view exercises" 
ON public.exercises FOR SELECT 
USING (true);

-- Policies para workouts
CREATE POLICY "Trainers can manage their workouts" 
ON public.workouts FOR ALL 
USING (auth.uid() = trainer_id);

CREATE POLICY "Students can view their workouts" 
ON public.workouts FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE id = workouts.student_id 
    AND students.email = auth.jwt() ->> 'email'
  )
);

-- Policies para workout_exercises
CREATE POLICY "Trainers can manage workout exercises" 
ON public.workout_exercises FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.workouts 
    WHERE id = workout_exercises.workout_id 
    AND trainer_id = auth.uid()
  )
);

CREATE POLICY "Students can view their workout exercises" 
ON public.workout_exercises FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.workouts w
    JOIN public.students s ON w.student_id = s.id
    WHERE w.id = workout_exercises.workout_id 
    AND s.email = auth.jwt() ->> 'email'
  )
);

-- Policies para payments
CREATE POLICY "Trainers can manage student payments" 
ON public.payments FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE id = payments.student_id 
    AND trainer_id = auth.uid()
  )
);

-- Policies para workout_progress
CREATE POLICY "Students can manage their progress" 
ON public.workout_progress FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE id = workout_progress.student_id 
    AND email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Trainers can view student progress" 
ON public.workout_progress FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE id = workout_progress.student_id 
    AND trainer_id = auth.uid()
  )
);

-- Inserir exercícios básicos
INSERT INTO public.exercises (name, category, muscle_group, instructions) VALUES
('Supino Reto', 'Peito', 'Pectorais', 'Deite no banco, pegue a barra com pegada pronada, desça até o peito e empurre para cima.'),
('Agachamento Livre', 'Pernas', 'Quadríceps/Glúteos', 'Pés na largura dos ombros, desça como se fosse sentar, mantenha o peso nos calcanhares.'),
('Remada Curvada', 'Costas', 'Dorsais', 'Incline o tronco, puxe a barra em direção ao abdômen, contraia as escápulas.'),
('Desenvolvimento', 'Ombros', 'Deltoides', 'Empurre os halteres acima da cabeça, mantenha o core contraído.'),
('Rosca Direta', 'Braços', 'Bíceps', 'Flexione os cotovelos mantendo-os fixos, contraia o bíceps no topo.'),
('Tríceps Testa', 'Braços', 'Tríceps', 'Deite no banco, flexione apenas os cotovelos, mantenha os braços fixos.'),
('Leg Press', 'Pernas', 'Quadríceps', 'Posicione os pés na plataforma, desça controladamente e empurre.'),
('Puxada Frontal', 'Costas', 'Dorsais', 'Puxe a barra em direção ao peito, contraia as escápulas.'),
('Elevação Lateral', 'Ombros', 'Deltoides', 'Eleve os halteres lateralmente até a altura dos ombros.'),
('Prancha', 'Core', 'Abdominais', 'Mantenha o corpo reto, contraindo abdômen e glúteos.');

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Criar triggers para updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at
  BEFORE UPDATE ON public.workouts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();