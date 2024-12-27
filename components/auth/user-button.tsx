// "use client";

// import { FaUser } from "react-icons/fa";
// import { ExitIcon, PersonIcon } from "@radix-ui/react-icons"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Avatar,
//   AvatarImage,
//   AvatarFallback,
// } from "@/components/ui/avatar";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { LogoutButton } from "@/components/auth/logout-button";
// import { UserButtonRoutes } from "@/components/userButton-routes";
// import { NavbarRoutes } from "@/components/navbar-routes";
// import Link from "next/link";

// export const UserButton = () => {
//   const user = useCurrentUser();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <Avatar>
//           <AvatarImage src={user?.image || ""} />
//           <AvatarFallback className="bg-sky-500">
//             <FaUser className="text-white" />
//           </AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-40" align="end">
//         <NavbarRoutes />
//         <UserButtonRoutes />
//         <Link href="/profile" >
//           <DropdownMenuItem>
//             <PersonIcon className="h-4 w-4 mr-2" />
//             الاعدادات
//           </DropdownMenuItem>
//         </Link>
//         <Link href="/home/policy" >
//           <DropdownMenuItem>
//             <PersonIcon className="h-4 w-4 mr-2" />
//             سياسة الخصوصية          </DropdownMenuItem>
//         </Link>
//         <Link href="/home/terms/" >
//           <DropdownMenuItem>
//             <PersonIcon className="h-4 w-4 mr-2" />
//             شروط الاستخدام
//           </DropdownMenuItem>
//         </Link>
//         <LogoutButton>
//           <DropdownMenuItem>
//             <ExitIcon className="h-4 w-4 mr-2" />
//             تسجيل خروج
//           </DropdownMenuItem>
//         </LogoutButton>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

"use client"

import { FaUser } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { FaUserShield } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserButtonRoutes } from "@/components/userButton-routes";
import { NavbarRoutes } from "@/components/navbar-routes";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
import Link from "next/link"

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NavbarRoutes />
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserButtonRoutes />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem> */}
          <Link href="/profile" >
            <DropdownMenuItem>
              الاعدادات
              <DropdownMenuShortcut><PersonIcon className="h-4 w-4 mr-2" /></DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          {/* </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          <Link href="/broker/scan/" >
            <DropdownMenuItem>
              اضافة رصيد
              <DropdownMenuShortcut><GiCash className="h-4 w-4 mr-2" /></DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/tickets/" >
            <DropdownMenuItem >
              Tickets
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem disabled>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem disabled>Email</DropdownMenuItem>
                <DropdownMenuItem disabled>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem disabled>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem> */}
        <Link href="/home/policy" >
          <DropdownMenuItem>
            سياسة الخصوصية
            <DropdownMenuShortcut><FaUserShield className="h-4 w-4 mr-2" /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <Link href="/home/terms/" >
          <DropdownMenuItem>
            شروط الاستخدام
            <DropdownMenuShortcut><GoLaw className="h-4 w-4 mr-2" /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            تسجيل خروج
          </DropdownMenuItem>
        </LogoutButton>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
