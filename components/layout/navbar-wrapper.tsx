// components/layout/navbar-wrapper.tsx
import { createClient } from '@/utils/supabase/server';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import NavbarClient from '@/components/layout/navbar';


const NavbarWrapper = async () => {
  // Only run server-side logic if env vars are set
  if (!hasEnvVars) {
    return <NavbarClient hasEnvVars={false} />;
  }

  try {
    const supabase = await createClient();
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let profile = null;
    if (user) {
      const { data } = await supabase
        .from("profile")
        .select()
        .eq("id", user.id)
        .single();
        
      if (data) {
        profile = data;
      }
    }

    return <NavbarClient user={user} profile={profile} hasEnvVars={hasEnvVars} />;
  } catch (error) {
    console.error('Navbar server error:', error);
    // Fallback to client without user data
    return <NavbarClient hasEnvVars={hasEnvVars} />;
  }
};

export default NavbarWrapper;