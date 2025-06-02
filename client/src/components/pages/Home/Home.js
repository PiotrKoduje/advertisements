import styles from './Home.module.scss';
import AdSummary from "../../common/AdSummary/AdSummary"
import { Container, Alert, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAds, getRequests, loadAdsRequest } from "../../../redux/adsRedux";
import { checkUser } from '../../../redux/users.Redux';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useEffect } from "react";

const Home = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadAdsRequest());
  //   dispatch(checkUser());

  //   const interval = setInterval(() => {
  //     dispatch(loadAdsRequest());
  //   }, 120000);
  //   return () => clearInterval(interval);
  // }, [dispatch]);
  
  const ads = useSelector(getAds);
  const requests = useSelector(getRequests);
 
  return(
    <Container>

      { (requests['LOAD_ADS'] && requests['LOAD_ADS'].pending) && 
      <Spinner 
        animation="border" 
        role="status" 
        className="d-block mx-auto"
      ><span className="visually-hidden" >Loading...</span>
      </Spinner>}

      { (requests['LOAD_ADS'] && requests['LOAD_ADS'].error) &&
      <Alert variant="danger">
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>Unexpected error... Try again later</p>
      </Alert>}

      { (requests['LOAD_ADS'] && requests['LOAD_ADS'].success) && (
        <>
          <SearchBar />
          <div className={styles.adsContainer}>
            {ads.map((ad) => <div key={ad.id} className={styles.ad}><AdSummary {...ad} /></div>)}
          </div>
        </>
      )}
    
  </Container>
  )
};

export default Home;


    