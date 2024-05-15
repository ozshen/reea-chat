'use client';

import Error from 'next/error';
import { useLayoutEffect } from 'react';

import { type ErrorType } from '@/components/Error';

export default function GlobalError({ error }: { error: ErrorType; reset: () => void }) {
  useLayoutEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={undefined as any} />
      </body>
    </html>
  );
}
