import { MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { findId } from '../../utils/findId';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CardInfo from './CardInfo';
import type { PersonType } from '../../types/peopleType';
import styles from './Card.module.css';
import { useDispatch } from 'react-redux';
import { selectPeople } from '../../redux/features/mainSlice';
import { findSelectedPerson } from '../../utils/findSelectedPerson';
import checkSvg from '/icons/square-check-solid.svg';
import uncheckSvg from '/icons/square-regular.svg';

interface PropTyes {
  person: PersonType;
}

function Card({ person }: PropTyes) {
  const { name: search, selectedPeople } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();
  const { name, birth_year, gender, url } = person;
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsParam = searchParams.get('details');
  const page = searchParams.get('page') ?? '1';
  const detail = findId(url);
  const isSelected = findSelectedPerson(selectedPeople, name);

  const toggleDetails = () => {
    if (detailsParam == detail) {
      setSearchParams({ search: search, page: page });
    } else {
      setSearchParams({ search: search, page: page, details: detail });
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
        <button type="button" onClick={toggleSelected}>
          {isSelected ? <img src={checkSvg} alt="select" /> : <img src={uncheckSvg} alt="unselect" />}
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
