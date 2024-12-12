import { IconType } from "react-icons";

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  LeftIcon?: IconType;
  onClickLeftIcon?: () => void;
  RightIcon?: IconType;
  onClickRightIcon?: () => void;
}

const TextInput = ({
  label,
  LeftIcon,
  onClickLeftIcon,
  RightIcon,
  onClickRightIcon,
  ...inputProps
}: TextInputProps) => {
  return (
    <div>
      <p className="josefin-sans italic text-[#939393] font-light">{label}</p>
      <div className="flex flex-row items-center bg-[#F1F1F1] border-[1.5px] border-[#929292] rounded-lg p-2 gap-1 focus-within:bg-white focus-within:border-blue-500 transition-all duration-150">
        {LeftIcon && (
          <LeftIcon
            onClick={onClickLeftIcon}
            color="#888888"
            size="1.5em"
            className={`${onClickRightIcon && "cursor-pointer"}`}
          />
        )}
        <input
          {...inputProps}
          className="josefin-sans text-xl w-full bg-transparent outline-none focus:bg-white transition-all duration-150"
        />
        {RightIcon && (
          <RightIcon
            onClick={onClickRightIcon}
            color="#888888"
            size="1.5em"
            className={`${onClickRightIcon && "cursor-pointer"}`}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;
