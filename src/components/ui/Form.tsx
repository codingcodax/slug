interface FormProps {
  onSubmit?: React.DOMAttributes<HTMLFormElement>['onSubmit'];
  children: React.ReactNode;
}

const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form className='grid gap-y-8' onSubmit={onSubmit}>
      {children}
    </form>
  );
};

interface FormItemsProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Form.Items = ({ children }: FormItemsProps) => {
  return <div className='space-y-4'>{children}</div>;
};

interface FormItemProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Form.Item = ({ children }: FormItemProps) => {
  return <div className='grid grid-flow-row gap-y-1'>{children}</div>;
};

interface FormButtonsProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Form.Buttons = ({ children }: FormButtonsProps) => {
  return <div className='grid grid-cols-2 gap-x-4'>{children}</div>;
};

export default Form;
