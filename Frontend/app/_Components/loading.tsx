import styles from './loading.module.scss'; // Assuming you're using CSS Modules
import loader from "../../public/img/loading/loader.gif";
export default function Loading() {
  return (
    <div className='p-4 rounded-full bg-white relative overflow-hidden swalling'>
        <img src={loader.src} alt="Loading" />
        <span className='absolute bottom-1 left-0 flex flex-nowrap'>----------</span>
    </div>
  )
}
