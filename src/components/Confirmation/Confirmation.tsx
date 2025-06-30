import './Confirmation.styles.css';

interface ConfirmationProps {
  onClick: () => void;
}

export function Confirmation({ onClick }: ConfirmationProps) {
  return (
    <div className="confirmation">
      <h1 className="confirmation-title">Santa is on it!</h1>
      <span className="confirmation-message">
        Santa and his elves got your wish and are working very hard on to get
        your presents on Christmas!
      </span>
      <button className="confirmation-button" onClick={onClick}>
        Make another wish
      </button>
    </div>
  );
}
