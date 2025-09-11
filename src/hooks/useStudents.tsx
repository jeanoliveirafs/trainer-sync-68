import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birth_date?: string;
  goals?: string;
  restrictions?: string;
  payment_status: 'active' | 'pending' | 'blocked';
  payment_due_date?: string;
  monthly_fee?: number;
  status: 'active' | 'inactive';
  created_at: string;
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchStudents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('trainer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents((data || []) as Student[]);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Erro ao carregar alunos",
        description: "Não foi possível carregar a lista de alunos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at'>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('students')
        .insert({
          ...studentData,
          trainer_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Aluno adicionado!",
        description: "O aluno foi cadastrado com sucesso.",
      });

      fetchStudents();
      return true;
    } catch (error) {
      console.error('Error adding student:', error);
      toast({
        title: "Erro ao adicionar aluno",
        description: "Não foi possível cadastrar o aluno",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const { error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Aluno atualizado!",
        description: "As informações foram salvas com sucesso.",
      });

      fetchStudents();
      return true;
    } catch (error) {
      console.error('Error updating student:', error);
      toast({
        title: "Erro ao atualizar aluno",
        description: "Não foi possível salvar as alterações",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Aluno removido",
        description: "O aluno foi removido com sucesso.",
      });

      fetchStudents();
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Erro ao remover aluno",
        description: "Não foi possível remover o aluno",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [user]);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    fetchStudents,
  };
}