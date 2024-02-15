import Heading from '@/components/heading/Header'
import { Separator } from '@/components/ui/separator'


const page = () => {
  return (
    <>
       <div className="flex justify-between items-center">
      <Heading title="Playgrounds" description="Make here your home to improve your intelligence." />
      {/* <Link href={`manage-admin/create`} className={cn(buttonVariants())} >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add 
      </Link> */}
      </div>
      <Separator />
    </>
  )
}

export default page
