import './WishForm.styles.css';

import { ChangeEvent, FormEvent } from 'react';

interface WishFormProps {
  onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onWishChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  username: string;
  wish: string;
}

export function WishForm(props: WishFormProps) {
  const submitDisabled = !(props.username && props.wish);

  return (
    <form className="request-form" onSubmit={props.onSubmit}>
      <h1>A letter to Santa</h1>
      <p className="request-form-description">
        Ho ho ho, what you want for Christmas?
      </p>
      <hr className="request-form-line" />

      <label htmlFor="userid">Username</label>
      <input
        name="userid"
        id="userid"
        placeholder="charlie.brown"
        value={props.username}
        onChange={props.onUsernameChange}
      />
      <label htmlFor="wish">
        What do you want for christmas? (max 100 characters)
      </label>
      <textarea
        name="wish"
        id="wish"
        rows={10}
        cols={45}
        maxLength={100}
        placeholder="Gifts!"
        onChange={props.onWishChange}
        value={props.wish}
      ></textarea>
      <button type="submit" id="submit-letter" disabled={submitDisabled}>
        Send
      </button>
    </form>
  );
}
