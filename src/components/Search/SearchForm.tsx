import { ChangeEvent, Component, FormEvent } from 'react';
import logo from '/logo.webp';
import styles from './SearchForm.module.css';
interface Props {
  query: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default class SearchForm extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className={styles.hero}>
          <div className={styles['img-box']}>
            <img className={styles.img} src={logo} alt="Star Wars Logo" />
          </div>
          <form className={styles.form} onSubmit={this.props.handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search Star Wars character"
              onChange={this.props.handleSearch}
              value={this.props.query}
            />
            <button type="submit" className={styles.btn}>
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}
