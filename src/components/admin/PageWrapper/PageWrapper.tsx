import './PageWrapper.scss';

export interface PageWrapperProps extends React.PropsWithChildren {
  title: React.ReactNode;
}

export default function PageWrapper({ title, children }: PageWrapperProps) {
  return (
    <div className="page-wrapper">
      <div className="page-wrapper__title">{title}</div>
      <div className="page-wrapper__content">{children}</div>
    </div>
  );
}
