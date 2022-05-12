import Footer from "./footer";
import Header from "./header";
import { Container } from 'react-bootstrap'

type LayoutProps = {
    children: React.ReactNode,
    data:any
};

export default function Layout({ children ,data}: LayoutProps) {
    return (
        <Container>
            <Header data = {data} />
            {children}
            <Footer />
        </Container>
    );
}