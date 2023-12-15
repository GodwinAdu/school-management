
import { currentProfile } from '@/lib/hooks/current-profile';
import Nav from './Nav'
import { currentUserRole } from '@/lib/hooks/getUserRole';
import { redirect } from 'next/navigation';
import { RoleColumn } from '@/lib/types';

const SideNav = async () => {
  const user = await currentProfile();

  if(!user){
    redirect("/")
  }
  
  const userRole = await currentUserRole();
  
  return (
    <div className='hidden md:flex'>
      <Nav userRole={userRole} />
    </div>
  )
}

export default SideNav
