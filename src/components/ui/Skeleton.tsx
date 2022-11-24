import cn from '~/utils/cn';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'h-4 w-2/5 animate-pulse rounded-md bg-mauve-400 dark:bg-mauveDark-400',
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
