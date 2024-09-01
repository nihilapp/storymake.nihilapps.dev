import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  className?: ClassNameValue;
  children: React.ReactNode;
}

export function AppMain({ className, children, }: Props) {
  const style = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <main className={style.default}>{children}</main>
    </>
  );
}
