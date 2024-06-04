import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const NavList: QuartzComponent = ({}: QuartzComponentProps) => {
  return (
    <header class="text-center">
      <hgroup class="cursor-pointer transition-[padding,background] duration-800 ease-in-out">
        <a class="normal" href="/">
          <h3 class="text-5 font-extrabold font-serif"> Guoqi Sun </h3>
          <h1 class="text-8 font-extrabold font-serif tracking-[0.25em]"> 小孙同学 </h1>
        </a>
      </hgroup>
    </header>
  )
}

NavList.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
  background-color:orange !important;
}

header h1 {
  margin: 0;
  flex: auto;
}
`

export default (() => NavList) satisfies QuartzComponentConstructor
