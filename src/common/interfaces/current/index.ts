export interface IHeaderMobileProps {
  city: string;

  setValue: (value: string) => void;
  errorMessage: string;
  validateField: (value: string, confirmPassword?: string) => boolean;
  secondValue?: string;
}

export interface iWrapModalProps {
  children?: React.ReactNode;
}

export interface iModalProps {
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  isModalShow: boolean;
  children?: React.ReactNode;
}
