import { IPropsForCheck } from '../../interfaces/interface';
import styles from './check.module.css';

export default function Check(props: IPropsForCheck) {
  const { todo } = props;
  const { isCompleted } = todo;

  return (
    <div className={isCompleted ? styles.checkOff : styles.checkOn}></div>
  )
}
