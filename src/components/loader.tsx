import { ClipLoader } from 'react-spinners';

export default function Loader({ loading, size=50 }: { loading: boolean, size?: number }) {
  return (
    <ClipLoader
      color="#4A90E2"
      loading={loading}
      size={size}

      aria-label="Loading Spinner"
    />
  );
}