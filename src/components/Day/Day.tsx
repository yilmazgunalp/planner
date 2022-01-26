import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import styles from './Day.module.css';

type DayProps = {
  children?: ReactNode;
  title?: string;
};

export const Day = ({
  children,
  title = 'This is the default title',
}: DayProps) => <div className={styles.day}>{children}</div>;
