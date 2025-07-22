import Header from '../header'
import SearchList from '../search-list'
import { useSearch } from 'lib/search-context'

export default ({
  children,
  title,
  description,
  image,
}) => {
  const { search } = useSearch()

  return (
    <>
      <Header />
      {search ? <SearchList /> : <main>{children}</main>}
    </>
  )
}
