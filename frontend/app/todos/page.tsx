import { fetchTodos } from '../actions';
import TodoPageClient from '../components/TodoPageClient';

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; search?: string }>;
}) {
  const { filter, search } = await searchParams;
  const todos = await fetchTodos(filter, search);

  return <TodoPageClient initialTodos={todos} />;
}
