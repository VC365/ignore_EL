import Iloading from "@/assets/img/Rocket.gif";

function Loading() {
    return (
        <div className="h-screen items-center flex justify-center">
            <div className="flex justify-between bg-zinc-600 px-6 py-2 rounded-2xl">
                <img src={Iloading} alt="Loading ..." /> <span className="pt-5 ml-3">Loading</span>
            </div>
        </div>
    );
}

export default Loading;
