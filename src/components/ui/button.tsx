import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom variants matching the existing design
        primary: "bg-blue-700 text-white shadow-[0_4px_0_0_#1e40af] hover:bg-blue-600 active:translate-y-1 active:shadow-none",
        green: "bg-green-600 text-white shadow-[0_4px_0_0_#15803d] hover:bg-green-500 active:translate-y-1 active:shadow-none",
        purple: "bg-purple-600 text-white shadow-[0_4px_0_0_#7e22ce] hover:bg-purple-500 active:translate-y-1 active:shadow-none",
        red: "bg-red-600 text-white shadow-[0_4px_0_0_#b91c1c] hover:bg-red-500 active:translate-y-1 active:shadow-none",
        yellow: "bg-yellow-500 text-white shadow-[0_4px_0_0_#a16207] hover:bg-yellow-400 active:translate-y-1 active:shadow-none",
        white: "bg-white text-gray-800 shadow-[0_4px_0_0_#cbd5e1] hover:bg-gray-50 active:translate-y-1 active:shadow-none",
        black: "bg-gray-900 text-white shadow-[0_4px_0_0_#1f2937] hover:bg-gray-800 active:translate-y-1 active:shadow-none",
        lightBlue: "bg-blue-500 text-white shadow-[0_4px_0_0_#2563eb] hover:bg-blue-400 active:translate-y-1 active:shadow-none",
      },
      size: {
        default: "min-h-11 px-4 py-2",
        sm: "min-h-10 px-3",
        lg: "min-h-12 px-8",
        icon: "h-11 w-12",
      },
      pressed: {
        true: "translate-y-1 shadow-none",
        false: "",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      pressed: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pressed, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, pressed, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
