import { useEffect, useState } from "react";
import loadingImage from "../../assets/images/loading-image.webp";

//to be continued....
export default function LoadingModal() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        document.documentElement.style="overflow:hidden";

        return  (() => {
            document.documentElement.style="overflow:visible";
        });
    },[]);

    useEffect(() => {
        const t = setTimeout(() => {
            if(dots.length > 2) setDots("");
            else setDots(dots + ".");
        },200);
        
        return(() => {
            clearTimeout(t);
        });
    }, [dots]);

    return (
        <div className="modal-background z-10 fixed h-screen w-screen bg-gray-400 bg-opacity-80 flex justify-center">
            <div className="modal flex flex-col justify-center items-center bg-white p-8 m-auto w-2/3 min-w-[300px]">
                <img src={loadingImage} width="600" alt="loading robot" className="rounded-xl max-w-[600px] w-2/5 min-w-[250px]"/>
                <caption className="mt-4 text-lg text-green md:text-xl xl:text-3xl">The Recipes are being generated<span id="loading-dots">
                    {dots}
                </span></caption>
            </div>
        </div>
    );
}