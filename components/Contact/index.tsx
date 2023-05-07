import { useTheme } from "@/ThemeContext";
import { IconType } from "react-icons";
import { FaDiscord, FaEnvelope } from "react-icons/fa";

interface ContactLineProps {
  label: string;
  Icon: IconType;
  value: string;
  url?: string;
}

const ContactLine: React.FC<ContactLineProps> = ({
  label,
  Icon,
  value,
  url,
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex gap-2 items-center lg:text-2xl text-lg">
      <span style={{ color: theme.secondary }} className="flex items-center">
        <Icon size={30} />
      </span>
      <span className="" style={{ color: theme?.secondary }}>
        {label}:
      </span>
      {url ? (
        <a
          href={url}
          target="_blank"
          className="underline"
          style={{ color: theme?.accent }}
        >
          {value}
        </a>
      ) : (
        <span style={{ color: theme?.accent }}>{value}</span>
      )}
    </div>
  );
};

export const Contact = () => {
  const { theme } = useTheme();

  return (
    <div className="flex h-full flex-col justify-center gap-10 items-center">
      <span
        style={{ color: theme?.secondary }}
        className="lg:text-4xl text-2xl"
      >
        {"Let's Connect!"}
      </span>
      <div className="flex flex-col gap-5">
        <ContactLine label="Discord" Icon={FaDiscord} value="mawzy#9415" />
        <ContactLine
          url={"mailto:cdmossing@gmail.com"}
          label="Email"
          Icon={FaEnvelope}
          value="cdmossing@gmail.com"
        />
      </div>
    </div>
  );
};
