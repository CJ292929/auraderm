import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "text";

type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  href?: string;
  anchorProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "className" | "children">;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gold text-forest-deep",
  secondary: "border border-forest text-cream",
  text: "text-cream underline-offset-4 hover:underline",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-pill px-6 py-3 font-sans text-sm tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-[3px]";

export function Button({
  variant = "primary",
  children,
  className,
  href,
  anchorProps,
  buttonProps,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className ?? ""}`;

  if (href) {
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
