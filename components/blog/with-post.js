import Page from 'components/page'
import Author from './author'
import styles from './with-post.module.css'

export default (meta) => ({ children }) => {
  return (
    <Page
      title={meta.metaTitle || meta.title}
      description={meta.metaDescription}
      image={meta.metaImage}
    >
      <article className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>{meta.title}</h1>
          {meta.authors && (
            <div className={styles.authors}>
              {meta.authors.map((author) => (
                <Author key={author.name} {...author} />
              ))}
            </div>
          )}
        </header>
        <div className={styles.content}>{children}</div>
      </article>
    </Page>
  )
}
