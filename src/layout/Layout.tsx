import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <section>
            <Header />
            <Outlet />
            <Footer />
        </section>
    );
}
