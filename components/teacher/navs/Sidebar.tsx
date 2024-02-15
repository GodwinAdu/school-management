
import { currentProfile } from '@/lib/helpers/current-profile';
import { currentUserRole } from '@/lib/helpers/getUserRole';
import { redirect } from 'next/navigation';
import { RoleColumn } from '@/lib/types';
import TeacherNav from './TeacherNav';

const TeacherSideNav = async () => {

  return (
    <div className='hidden md:flex'>
      <TeacherNav />
    </div>
  )
}

export default TeacherSideNav
