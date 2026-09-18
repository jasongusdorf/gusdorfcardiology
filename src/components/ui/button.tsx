import { cloneElement, isValidElement, forwardRef, type ComponentProps } from 'preact/compat';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-700 text-white hover:bg-blue-800',
        outline: 'border border-clinical-300 bg-transparent text-clinical-900 hover:border-blue-700 hover:text-blue-700 dark:border-clinical-600 dark:text-white',
        ghost: 'hover:bg-clinical-100 dark:hover:bg-clinical-700',
      },
      size: { default: 'h-10 px-5 py-2', sm: 'h-9 px-4', lg: 'h-11 px-7', icon: 'h-10 w-10' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> { asChild?: boolean; }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, children, ...props }, ref) => {
  const mergedClassName = cn(buttonVariants({ variant, size, className }));
  if (asChild && isValidElement(children)) {
    return cloneElement(children as any, { ...props, className: mergedClassName });
  }
  return <button className={mergedClassName} ref={ref} {...props}>{children}</button>;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
