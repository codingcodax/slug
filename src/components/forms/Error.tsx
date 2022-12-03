import { Icons } from '~/components/ui';

interface ErrorProps {
  children: React.ReactNode;
}

const Error = ({ children }: ErrorProps) => {
  return (
    <span className='flex items-center text-sm text-red-900'>
      <Icons.AlertCircle className='mr-2 h-4 w-4 stroke-red-900' />
      {children}
    </span>
  );
};

export default Error;
