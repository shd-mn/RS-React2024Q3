import { Component } from 'react';
import styles from './Pagination.module.css';
interface Props {
  text: string | number;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

export default class PageBtn extends Component<Props> {
  render() {
    const { text, className, disabled, onClick } = this.props;
    return (
      <button type="button" className={`${styles.btn} ${className}`} disabled={disabled} onClick={onClick}>
        {text}
      </button>
    );
  }
}
