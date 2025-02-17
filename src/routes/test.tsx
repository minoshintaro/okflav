import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../app/components/Button';
import { TextField } from '../app/components/TextField';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

async function addUser(name: string): Promise<Turso.UserData> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  const result = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
}

function RouteComponent() {
  const [value, setValue] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const mutation = useMutation<Turso.UserData, Error, string>({
    mutationFn: addUser,
    onSuccess: (data, variables) => {
      setValue('');
      setFeedback(`${variables}を追加しました`);
      setErrorMessage('');
      setTimeout(() => setFeedback(''), 3000);
    },
    onError: (error) => {
      try {
        const errorData = JSON.parse(error.message); // API のエラーレスポンスを解析
        setErrorMessage(errorData.message);
      } catch {
        setErrorMessage('予期しないエラーが発生しました');
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      alert('ユーザー名を入力してください');
      return;
    }

    mutation.mutate(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h1>Add a user</h1>
      <TextField
        placeholder="Enter a username"
        value={value}
        onValueChange={setValue}
       />
      <Button type="submit">
        Send
      </Button>
      {feedback && <p className="text-green-500">{feedback}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
}
