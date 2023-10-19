import '@/styles/templates/main/addBtn.scss';
import { useRouter } from 'next/navigation';

export default function AddBtn() {
  const router = useRouter();
  return (
    <button className="addbutton">
      <div onClick={() => router.push('/write')}>+</div>
    </button>
  );
}
