import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserNav() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Admin</span>
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatar.png" alt="Admin" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </div>
  );
}
