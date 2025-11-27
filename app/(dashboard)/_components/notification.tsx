'use client'

import {Bell} from "lucide-react";

const styles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0) rotate(0); }
    25% { transform: rotate(-4deg); }
    75% { transform: rotate(4deg); }
  }
  .hover-shake:hover {
    animation: shake 0.2s ease-in-out;
  }
`;


export const NotificationBell = () => {
    const notificationCount = 3;
    return (
       <>
           <style jsx>{styles}</style>
           <button className="relative p-2 rounded-lg hover:cursor-pointer transition-colors hover-shake duration-500">
               <Bell className="w-6 h-6 text-gray-600" />
               {notificationCount > 0 && (
                   <span className="absolute -top-1 right-[2px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {notificationCount}
          </span>
               )}
           </button>
       </>
    );
}