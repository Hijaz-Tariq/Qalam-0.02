"use client";

import { useLiveUser } from "@/lib/auth";;
import { usePathname } from "next/navigation";
import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const user = useLiveUser();

  const routes = [
    {
      label: "Users",
      href: `/admin/users/`,
      icon: Fullscreen,
    },
    {
      label: "Courses",
      href: `/admin/courses/`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/admin/messages/`,
      icon: MessageSquare,
    },
    // {
    //   label: "Community",
    //   href: `/u/${user?.username}/community`,
    //   icon: Users,
    // },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
