
import LeftSidebar from './LeftSidebar'

const MainLeftSidebar = async () => {

  const currentStudent = { id: "1 "}

  const id = currentStudent?.id;

  const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: `/student/${id}`,
      label: "Dashboard",
    },
    {
      imgURL: "/assets/search.svg",
      route: `/student/${id}/e-learning`,
      label: "E-Learning",
    },
    {
      imgURL: "/assets/heart.svg",
      route: `/student/${id}/exams`,
      label: "Exams",
    },
    {
      imgURL: "/assets/create.svg",
      route: `/student/${id}/playgrounds`,
      label: "Playgrounds",
    },
    {
      imgURL: "/assets/community.svg",
      route: `/student/${id}/transaction`,
      label: "Transaction",
    },
    {
      imgURL: "/assets/user.svg",
      route: `/student/${id}/transcript`,
      label: "Transcript",
    },
    {
      imgURL: "/assets/user.svg",
      route: `/student/${id}/result`,
      label: "Results",
    },
  ];


  return (
    <div>
      <LeftSidebar sidebarLinks={sidebarLinks}  id={currentStudent.id} />
    </div>
  )
}

export default MainLeftSidebar
