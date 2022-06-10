import Head from "components/Head";
import styles from "styles/Home.module.css";

export default function Protected() {
  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1>Pagina de Ruta Protegida</h1>
        <p>access granted</p>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      permissions: [
        ["test1", 1],
        ["test2", 1],
      ],
    },
  };
}
