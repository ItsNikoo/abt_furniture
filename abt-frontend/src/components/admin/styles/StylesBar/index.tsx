'use client'

import {Style} from "@/types";
import {useQuery} from "@tanstack/react-query";
import {fetchStyles} from "@/lib/api/styles";
import styles from "./StylesBar.module.css"
import StyleCard from "@/components/admin/styles/StyleCard";

export default function StylesBar() {
    const {data, error, isLoading} = useQuery({
        queryFn: fetchStyles,
        queryKey: ['styles'],
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки стилей: {error.message}</div>;
    }

    return (
        <div className="styles-bar">
            <ul className={styles.Container}>
                {data?.map((style: Style) => (
                    <StyleCard key={style.id} style={style} />
                ))}
            </ul>
        </div>
    );
}