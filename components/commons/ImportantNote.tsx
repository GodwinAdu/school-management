
interface ImportantNoteProps{
    title:string;
    message:string;
}

const ImportantNote = ({ title, message }:ImportantNoteProps) => {
  return (
    <div className="bg-red-400 p-4 border-l-4 border-black">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* You can replace the exclamation icon with your preferred icon */}
          <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6-6h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"></path>
          </svg>
        </div>
        <div className="ml-3">
          {title && <p className="text-md font-semibold text-black underline">{title}</p>}
          <p className="text-sm leading-5 text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ImportantNote;

