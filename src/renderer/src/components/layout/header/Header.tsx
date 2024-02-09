import Logo from '@renderer/components/ui/logo'

export const Header = () => {
  return (
    <header
      className={
        'flex-grow-0 w-full h-[60px] py-2 bg-foreground flex items-center px-10 justify-between'
      }
    >
      <Logo isReturned={true} />
    </header>
  )
}
