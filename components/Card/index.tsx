import { useRouter } from 'next/router';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { findId } from '../../utils/findId';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CardInfo from './CardInfo';
import { useDispatch } from 'react-redux';
import { selectPeople } from '../../redux/features/mainSlice';
import { findSelectedPerson } from '../../utils/findSelectedPerson';
import checkSvg from '/public/icons/square-check-solid.svg';
import uncheckSvg from '/public/icons/square-regular.svg';
import type { PersonType } from '../../types/peopleType';
import { getQueryParam } from '../../utils/getQueryParam';
import styles from './Card.module.css';

interface PropTyes {
  person: PersonType;
}

function Card({ person }: PropTyes) {
  const { selectedPeople } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();
  const router = useRouter();
  const { details } = router.query;
  const path = router.asPath;
  const { name, birth_year, gender, url } = person;
  const detailsParam = getQueryParam(details);
  const detail = findId(url);
  const isSelected = findSelectedPerson(selectedPeople, name);

  const toggleDetails = () => {
    const isSearchPath = path.includes('/search');
    const detailsQuery = `details=${detail}`;
    const querySeparator = isSearchPath ? '&' : '?';

    if (detailsParam === detail) {
      const pathWithoutDetail = path.replace(new RegExp(`[?&]${detailsQuery}`), '');
      router.push(pathWithoutDetail);
    } else {
      const newPath = path.includes('details=')
        ? path.replace(/details=[^&]*/, detailsQuery)
        : `${path}${querySeparator}${detailsQuery}`;
      router.push(newPath);
    }
  };

  const toggleSelected = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(selectPeople({ person, isSelected }));
  };

  return (
    <div className={styles.card} onClick={toggleDetails}>
      <header className={styles.header}>
        <h3>{name}</h3>
        <button type="button" className={styles.btn} onClick={toggleSelected}>
          {isSelected ? (
            <Image src={checkSvg} alt="select" width={18} height={18} />
          ) : (
            <Image src={uncheckSvg} alt="unselect" width={18} height={18} />
          )}
        </button>
      </header>
      <div className={styles['card-body']}>
        <CardInfo infoText="gender :" info={gender} />
        <CardInfo infoText="birth year :" info={birth_year} />
      </div>
    </div>
  );
}

export default Card;
