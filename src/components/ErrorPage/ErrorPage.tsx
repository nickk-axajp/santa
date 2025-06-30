import './ErrorPage.styles.css';

interface ErrorPageProps {
  message: string;
  onClick: () => void;
}

export function ErrorPage({ message, onClick }: ErrorPageProps) {
  return (
    <div className="error-page">
      <h1 className="error-title">Oops, something's not quite right</h1>
      <p className="error-message">{message}</p>
      <button className="error-retry" onClick={onClick}>
        Try again
      </button>
    </div>
  );
}
