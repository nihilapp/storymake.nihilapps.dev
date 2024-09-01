import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  className?: ClassNameValue;
}

export function Footer({ className, }: Props) {
  const style = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <footer className={style.default}>Footer</footer>
    </>
  );
}
