import { useSelector } from 'react-redux';

import { selectHasSetData } from '@/redux/sets/setsSelectors';

const useUnpackPage = () => {
  const hasSetData = useSelector(selectHasSetData);
  const hasAccess = hasSetData;

  return { hasAccess };
};

export default useUnpackPage;
