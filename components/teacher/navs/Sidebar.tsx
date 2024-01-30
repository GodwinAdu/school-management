
import { currentProfile } from '@/lib/hooks/current-profile';
import { currentUserRole } from '@/lib/hooks/getUserRole';
import { redirect } from 'next/navigation';
import { RoleColumn } from '@/lib/types';
import TeacherNav from './TeacherNav';

const TeacherSideNav = async () => {
  const user = await currentProfile();

  if(!user){
    redirect("/")
  }
  
  const userRole = await currentUserRole();
  
  return (
    <div className='hidden md:flex'>
      <TeacherNav userRole={userRole} />
    </div>
  )
}

export default TeacherSideNav
