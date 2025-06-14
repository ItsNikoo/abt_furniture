import StylesBar from "@/components/admin/styles/StylesBar";
import AddStyleContainer from "@/components/admin/styles/AddStyleContainer";
import {fetchStyles} from "@/lib/api/styles";

export default function StylesPage() {
    const stylesPromise = fetchStyles();
    return (
        <>
            <AddStyleContainer/>
            <StylesBar promise={stylesPromise}/>
        </>
    )
}