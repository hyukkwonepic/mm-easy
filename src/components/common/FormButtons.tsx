interface FormButtonProps {
  onClick?: () => void;
  text: string;
  width?: string;
  height?: string;
  border?: string;
}

export const CancelButton: React.FC<FormButtonProps> = ({ onClick, text, width, height, border }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white ${width} ${height} ${border}`}
    >
      {text}
    </button>
  );
};

export const SubmitButton: React.FC<FormButtonProps> = ({ onClick, text, width, height, border }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1 ${width} ${height} ${border}`}
    >
      {text}
    </button>
  );
};

export const BlueButton: React.FC<FormButtonProps> = ({ onClick, text, width, height }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`rounded-md text-white border-solid p-2 border border-white bg-pointColor1 ${width} ${height}`}
    >
      {text}
    </button>
  );
};

export const WhiteButton: React.FC<FormButtonProps> = ({ onClick, text, width }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white ${width}`}
    >
      {text}
    </button>
  );
};
