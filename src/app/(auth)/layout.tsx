import FullpageLoader from '$/components/FullpageLoader/FullpageLoader';
import { Suspense } from 'react';

export default async function AuthLayout({ children }: React.PropsWithChildren) {
  return <Suspense fallback={<FullpageLoader />}>{children}</Suspense>;
}
