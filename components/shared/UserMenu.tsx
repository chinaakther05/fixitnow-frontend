"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/app/(auth)/-actions/auth.action";


type UserMenuProps = {
  role: string;
};

const UserMenu = ({ role }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full cursor-pointer">
          <Avatar>
            <AvatarFallback>{role.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <form action={logoutAction} className="w-full">
            <button
              type="submit"
              className="flex items-center w-full text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;