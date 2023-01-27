import { BsCheck2 } from 'react-icons/bs';
import { IPropsForCheck } from '../../interfaces/interface';
import styles from './check.module.css';

export default function Check(props: IPropsForCheck) {
  const { todo: { isCompleted } } = props;

  return (
    <div className = {styles.check}>
      {
        isCompleted && 
          <BsCheck2 size = {24} style = {{color: 'rgb (17 24 39)'}}/>
      }
    </div>
  )
}