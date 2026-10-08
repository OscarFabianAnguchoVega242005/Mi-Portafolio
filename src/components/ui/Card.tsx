import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = true, children, ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-900 border-neutral-800 shadow-lg',
      outlined: 'bg-neutral-900 border-neutral-700',
      elevated: 'bg-neutral-900 border-neutral-800 shadow-xl',
    };

    const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
    const hoverStyles = hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : '';

    return (
      <div
        ref={ref}
        className={cn('rounded-xl overflow-hidden', variants[variant], paddings[padding], hoverStyles, className)}
        {...props}
      >
        {children}
        </div>
      )
    }
  );

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-bold text-white', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-neutral-400 mt-1', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-neutral-800', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';