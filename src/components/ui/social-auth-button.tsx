import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  provider: string;
}

export function SocialAuthButton({
  className,
  icon,
  provider,
  ...props
}: SocialAuthButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "relative w-full bg-background hover:bg-gray-50 border-gray-200",
        className
      )}
      {...props}
    >
      <div className="absolute left-4 flex items-center justify-center">
        {icon}
      </div>
      <span>Continue with {provider}</span>
    </Button>
  );
}
