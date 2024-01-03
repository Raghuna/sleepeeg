
const Footer = () => {
    return (
        <footer className="w-4/5 mx-auto sticky top-[100vh]">
            <div className="relative flex py-5 items-center w-full mx-auto mt-5">
                <div className="flex-grow border-t border-gray-400"></div>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="grid grid-cols-3 p-5 gap-20 pb-10">
                <div>
                    © This project was made as a part of DFS course
                </div>
                <div>
                    <div className="grid grid-cols-2">
                        <div>
                            GTRU Jr.
                        </div>
                        <div>
                            SLEEP EDF
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3">
                        <div className="text-center">
                            <a href="">
                                Data Policy
                            </a>
                        </div>
                        <div className="text-center">
                            <a href="">
                                Copyrights Policy
                            </a>
                        </div>
                        <div className="text-center">
                            <a href="">
                                Disclaimer
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>);
};

export default Footer;
