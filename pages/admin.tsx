import Layout from '../components/layout'

export default function Admin() {
  return (
    
  )
}

Admin.getInitialProps = () => {
  return {
    data:{
          title :'Home Page'
    } 
  }
}

Index.getLayout = function getLayout(page:any) {
  const { props } = page
  return (
    <Layout data={props.data}>
      {page}
    </Layout>
  )
}