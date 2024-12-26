"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, ListCollapse } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "group",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Group
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const group = row.getValue("group");

      return (
        <Badge className={cn(
          "bg-slate-500",
          // group && "bg-sky-700"
        )}>
          {group === 'A' ? "Sat, Mon, Wed" : group === 'B' ? "Sun, Tue, Thur" : 'Daily'}
        </Badge>
      )
    }
  },
  // {
  //   accessorKey: "startsBy",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Starts By
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const startsBy = row.getValue("startsBy") as Date;

  //     // Format the start time
  //     const startHours = startsBy.getHours();
  //     const startMinutes = startsBy.getMinutes() - 3;
  //     const formattedStartTime = `${startHours}:${startMinutes < 10 ? '0' + startMinutes : startMinutes}`;

  //     // Calculate the end time by adding 42 minutes
  //     const endTime = new Date(startsBy);
  //     endTime.setMinutes(startsBy.getMinutes() + 42);

  //     // Format the end time
  //     const endHours = endTime.getHours();
  //     const endMinutes = endTime.getMinutes();
  //     const formattedEndTime = `${endHours}:${endMinutes < 10 ? '0' + endMinutes : endMinutes}`;

  //     // Display the time range (from - to)
  //     return (
  //       <Badge className={cn("bg-slate-500", startsBy && "bg-sky-700")}>
  //         {formattedStartTime} - {formattedEndTime}
  //       </Badge>
  //     );
  //   }
  // },
  {
    accessorKey: "startsBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Starts By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startsBy = row.getValue("startsBy") as Date;
      const group = row.getValue("group") as "A" | "B" | "C"; // Ensure group is one of "A", "B", or "C"

      // Get current time and day
      const currentTime = new Date();
      const currentDay = currentTime.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

      // Group to days mapping
      const groupDays: { [key in "A" | "B" | "C"]: number[] } = {
        A: [6, 1, 3], // Saturday (6), Monday (1), Wednesday (3)
        B: [0, 2, 4], // Sunday (0), Tuesday (2), Thursday (4)
        C: [0, 1, 2, 3, 4, 5, 6] // Daily (All days)
      };

      // Check if today is one of the group's days
      const isTodayInGroup = groupDays[group]?.includes(currentDay);

      // Format the start time
      let startHours = startsBy.getHours();
      let startMinutes = startsBy.getMinutes() - 3;  // Subtract 3 minutes from the start time

      if (startMinutes < 0) {
        startMinutes += 60;  // Add 60 minutes to the minutes
        startHours -= 1;     // Subtract 1 hour from the hour
      }

      const formattedStartTime = `${startHours}:${startMinutes < 10 ? '0' + startMinutes : startMinutes}`;

      // Calculate the end time by adding 42 minutes
      const endTime = new Date(startsBy);
      endTime.setMinutes(startsBy.getMinutes() + 42);

      // Format the end time
      const endHours = endTime.getHours();
      const endMinutes = endTime.getMinutes();
      const formattedEndTime = `${endHours}:${endMinutes < 10 ? '0' + endMinutes : endMinutes}`;

      // Check if the current time is within the start and end time range
      const isInTimeRange = currentTime >= startsBy && currentTime <= endTime;

      // Conditional background color logic
      const backgroundColor = isTodayInGroup && isInTimeRange ? "bg-green-500" : "bg-slate-500";

      // Display the formatted time range with the conditional background color
      return (
        <Badge className={cn(backgroundColor)}>
          {formattedStartTime} - {formattedEndTime}
        </Badge>
      );
    }
  }
  ,
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "ILS"
      }).format(price);

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
  },

  {
    id: "startLive",  // Unique identifier for the column
    header: () => (
      <Button variant="ghost">
        Sart Live
      </Button>
    ),
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Link href={`/x/rooms/${id}`}>
          <Button variant="outline">
            Click Me
          </Button>
        </Link>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link href={`#`}>
              <DropdownMenuItem>
                <ListCollapse className="h-4 w-4 mr-2" />
                Details
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
