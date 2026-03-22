import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Login by default
  // Once auth is added, this will redirect based on user role
  redirect('/login');
}
