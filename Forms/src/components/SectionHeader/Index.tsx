import styles from './SectionHeader.module.css';

type PropTypes = {
  title: string;
  desc: string;
};

function SectionHeader({ title, desc }: PropTypes) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
    </header>
  );
}
export default SectionHeader;
