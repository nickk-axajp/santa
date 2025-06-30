import { ChangeEvent, FormEvent, useState } from 'react';
import { canAsk, sendWish } from '../../services/santaApi';
import { Confirmation } from '../Confirmation/Confirmation';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { WishForm } from '../WishForm/WishForm';

export function WishFormContainer() {
  const [error, setError] = useState<string | null>();
  const [username, setUsername] = useState('');
  const [wish, setWish] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  function onUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setUsername(value.trim());
    setError(null);
  }

  function onWishChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;

    setWish(value.slice(0, 100));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('userid') as string;
    const wish = formData.get('wish') as string;

    try {
      if (await canAsk(username)) {
        await sendWish(username, wish);

        setShowConfirmation(true);
      } else {
        setError('You need to be under 10 years old to ask for presents.');
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    }
  }

  function clearForm() {
    setShowConfirmation(false);
    setUsername('');
    setWish('');
  }

  if (error) {
    return <ErrorPage message={error} onClick={() => setError(null)} />;
  }

  if (showConfirmation) {
    return <Confirmation onClick={clearForm} />;
  }

  return (
    <WishForm
      onSubmit={onSubmit}
      onUsernameChange={onUsernameChange}
      onWishChange={onWishChange}
      username={username}
      wish={wish}
    />
  );
}
