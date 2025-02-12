export function handleDataError(error: unknown, defaultMessage: string) {
  if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
    return { error: '既に存在します', status: 400 };
  }
  return { error: defaultMessage, status: 500 };
}
