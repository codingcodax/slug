interface ExternalLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

const ExternalLink = ({ href, className, children }: ExternalLinkProps) => {
  return (
    <a
      className={className}
      href={href}
      rel='noopener noreferrer'
      target='_blank'
    >
      {children}
    </a>
  );
};

export default ExternalLink;
