interface ClicksProps {
  clicks: number;
}

const Clicks = ({ clicks }: ClicksProps) => {
  return (
    <span className='text-sm text-mauve-1100 dark:text-mauveDark-1100'>
      {clicks} clicks
    </span>
  );
};

export default Clicks;
