interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = ({ title, ...buttonProps }: ButtonProps) => {
  return (
    <button
      {...buttonProps}
      className="bg-[#2F5DA8] hover:bg-[#709FEB] rounded-full px-12 py-2 josefin-sans text-white text-xl font-medium shadow-lg transition-all duration-150"
    >
      {title}
    </button>
  );
};

export default Button;
