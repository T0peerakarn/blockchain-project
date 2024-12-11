interface LeftMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  selected?: boolean;
}

const LeftMenuButton = ({ title, selected, ...buttonProps }: LeftMenuButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={`w-full px-12 py-2 josefin-sans text-white text-xl font-light text-left transition-all duration-150 ${
        selected ? "bg-[#94BBFC] font-medium" : "hover:bg-[#2F5DA8]"
      }`}
    >
      {title}
    </button>
  );
};

export default LeftMenuButton;