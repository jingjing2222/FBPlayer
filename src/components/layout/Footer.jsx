export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-2">
            <div className="container mx-auto text-center">
                <p className="text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} jingjing2222. All rights
                    reserved.
                </p>
                <div className="flex justify-center mt-2 space-x-4"></div>
            </div>
        </footer>
    );
}
