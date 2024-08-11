import { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unselectPeople } from '../../../redux/features/mainSlice';
import { CSVLink } from 'react-csv';
import { csvHeaders } from '../../../constants';
import type { RootState } from '../../../redux/store';
import styles from './Flyout.module.css';

function Flyout() {
  const [size, setSize] = useState(false);
  const { selectedPeople } = useSelector((state: RootState) => state.main);
  const count = selectedPeople.length;
  const myRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const handleUnselect = () => {
    dispatch(unselectPeople());
  };

  const csvData = useMemo(() => selectedPeople, [selectedPeople]);

  useEffect(() => {
    setSize(true);
    setTimeout(() => {
      setSize(false);
    }, 300);
  }, [selectedPeople]);

  return (
    <div ref={myRef} className={`${styles.flyout} ${selectedPeople.length > 0 && styles.show} ${size && styles.size}`}>
      <h4>
        {count} {count === 1 ? 'item is' : 'items are'} selected
      </h4>
      <div className={styles['btn-group']}>
        {selectedPeople.length > 0 && (
          <CSVLink className={styles.link} filename={`${count}_people.csv`} headers={csvHeaders} data={csvData}>
            Download
          </CSVLink>
        )}
        <button className={styles.btn} type="button" onClick={handleUnselect}>
          Unselect All
        </button>
      </div>
    </div>
  );
}

export default Flyout;
