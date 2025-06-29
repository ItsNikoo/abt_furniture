export default function ContentWrapper({ children, Margin = true }: { children: React.ReactNode; Margin?: boolean }) {
  return <div className={!Margin ? '' : 'mx-4 md:mx-[50px] lg:mx-[100px]'}>{children}</div>
}
