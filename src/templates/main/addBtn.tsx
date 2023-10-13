import Link from 'next/link';
import '@/styles/templates/main/addBtn.scss';

export default function AddBtn() {
  return (
    <button className="addbutton">
      <Link href="/write">+</Link>
    </button>
  );
}
