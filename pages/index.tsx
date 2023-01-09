import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Allocation</title>
        <meta name="description" content="Allocate Developer into Projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Allocation
        </h1>

        <p className={styles.description}>
          Here you can allocate your develop team into Projects
        </p>

        <div className={styles.grid}>
          <Link href="/developers" className={styles.card}>
            <h2>Developers &rarr;</h2>
            <p>Manage your developer team</p>
          </Link>

          <a href="/projects" className={styles.card}>
            <h2>Projects &rarr;</h2>
            <p>Manage the Projects</p>
          </a>

          <a
            href="/appointments"
            className={styles.card}
          >
            <h2>Appointments &rarr;</h2>
            <p>Add Developers into Projects.</p>
          </a>

          <a
            href="#"
            className={styles.card}
          >
            <h2>Report &rarr;</h2>
            <p>
              See the Report Appointments
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/nextly_horizontal-W.png" alt="Nextly Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
