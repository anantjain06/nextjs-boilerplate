import NavBar from "./navbar";
import { NextSeo } from 'next-seo';
import Image from "next/image";
import { Stack} from "react-bootstrap";

const Header = (metaTags:any) => {
    return <>
        <NextSeo
            title={metaTags.data.title}
            description="A short description goes here."
        />
        <Stack direction="horizontal" className="">
            <div>
                <Image alt="Mountains"
                    src={'/drop.png'}
                    width={64}
                    height={64}
                />
            </div>
            <div className="ms-auto">
                <NavBar />
            </div>
        </Stack>
    </>
}

export default Header;