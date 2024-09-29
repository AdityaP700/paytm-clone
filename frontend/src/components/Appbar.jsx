
function Appbar({ label,onClick}){
    return <div>
        <div className="h-[30px] flex items-center justify-between m-2 px-2">
            <span className="font-bold text-Black text-xl " >
                     Payments App
            </span>
      <div className=" bg-white py-1 px-2 inline rounded-md">
        <span className="font-mono text-base font-light">
            Hello,User
            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 m-2 ">
    <span class="font-medium text-gray-600 dark:text-gray-300 cursor-pointer">U</span>
</div>
          </span>
         </div>
        </div>
    </div>
}
export default Appbar;