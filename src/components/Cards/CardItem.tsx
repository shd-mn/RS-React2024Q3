import { Component } from 'react';
import styles from './ProfileCard.module.css';

interface Props {
  infoText: string;
  info: string;
}

export default class CardItem extends Component<Props> {
  render() {
    return (
      <p className={styles['card-item']}>
        <span>{this.props.infoText}</span>
        {this.props.info}
      </p>
    );
  }
}
