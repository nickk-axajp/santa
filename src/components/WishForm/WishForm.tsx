import './WishForm.styles.css';

import { ChangeEvent, FormEvent, useState } from 'react';

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
      <span>Ho ho ho, what you want for Christmas?</span>
      <hr className="request-form-line" />

      <label htmlFor="userid">Username</label>
      <input
        name="userid"
        id="userid"
        placeholder="charlie.brown"
        value={props.username}
        onChange={props.onUsernameChange}
      />
      <label htmlFor="wish">What do you want for christmas?</label>
      <textarea
        name="wish"
        id="wish"
        rows={10}
        cols={45}
        maxLength={120}
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
