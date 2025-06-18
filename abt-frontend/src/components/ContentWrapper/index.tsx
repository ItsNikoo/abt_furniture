export default function ContentWrapper({children, Margin = true}: { children: React.ReactNode; Margin?: boolean }) {
    return <div className={!Margin ? "" : "mx-[100px]"}>{children}</div>;
}
