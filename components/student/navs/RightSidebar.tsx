
async function RightSidebar() {
 

  return (
    <section className='custom-scrollbar  sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='font-bold text-black'>
          Suggested Communities
        </h3>

        <div className='mt-7 flex w-[350px] flex-col gap-9'>
        Student
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-md text-black'>Similar Minds</h3>
        <div className='mt-7 flex w-[350px] flex-col gap-10'>
         testing
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
