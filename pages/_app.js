import '@/styles/globals.css'
import Layout from '@/komponenten/Layout'
import { useRouter } from 'next/router'


export default function App({ Component, pageProps }) {

  const router = useRouter();

  const pagesWithoutLayout = ['/']; // Fügen Sie die Seiten-URLs hinzu, auf denen die Layout-Komponente nicht gerendert werden soll

  // Überprüfen Sie, ob die aktuelle Seite in der Liste der Seiten ohne Layout enthalten ist
  const shouldRenderLayout = !pagesWithoutLayout.includes(router.pathname);


  return(
    <>
    {/* Bedingtes Rendern der Layout-Komponente */}
    {shouldRenderLayout ? (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    ) : (
      <Component {...pageProps} /> /* Wenn Layout nicht gerendert werden soll */
    )}
  </>
  ) 
}

