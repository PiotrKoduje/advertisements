import { useSelector } from 'react-redux';
import { getAd } from '../../../redux/adsRedux';
import { useParams } from 'react-router-dom';
import AdDetails from '../../features/Ad/AdDetails';

const Ad = () => {

  const { id } = useParams();
  const ad = useSelector(state => getAd(state, id));

  if (!ad) return <p>Ads not found</p>;

  return <AdDetails {...ad} />;
}

export default Ad;