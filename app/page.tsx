import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/utils/actions/auth/actions';

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/signin')
  }

  return (
    <div className="">
      <main className="">
        <p>Hello {data.user.email}</p>
        <button onClick={signout}>logout</button>
      </main>
    </div>
  );
}
