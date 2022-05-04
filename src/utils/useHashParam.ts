import { useState, useEffect } from 'react';

export const useHashParam = () => {
  return typeof window !== 'undefined' ? window.location.hash : null;
};
