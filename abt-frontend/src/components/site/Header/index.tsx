import Image from "next/image";
import logo from "../../../../public/logo.png";
import {Button} from "../../ui/button";
import styles from "./Header.module.css"
import Link from "next/link";

export default function Header() {
    return (
        <div className="mt-8 flex flex-row w-full ">
            <div>
                <Image src={logo} alt="АБТ - мебель для кухни" width={350} height={100}/>
            </div>
            <div className="flex-1  flex flex-col justify-between my-3">
                <p>Балашиха, Железнодорожный, Керамическая, 2Б | +7 (926) 723-28-80</p>
                <div className="flex flex-row gap-8 ">
                    <Link href={"/catalog"} className="font-bold text-base">КАТАЛОГ</Link>
                    <Link href={"/reviews"} className="font-bold text-base">ОТЗЫВЫ</Link>
                    <Link href={"/contacts"} className="font-bold text-base">КОНТАКТЫ</Link>
                    <Link href={'/about'} className="font-bold text-base">О КОМПАНИИ</Link>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button className={styles.OrderButton}>
                    Заказать проект
                </Button>
            </div>
        </div>
    );
}