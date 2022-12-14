import { useState, useEffect } from 'react';

const useHasMouted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  return hasMounted;
};

export default useHasMouted;
