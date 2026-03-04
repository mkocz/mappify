const Hero = ({ heroImg }) => {

    return (
        <div className="m-auto" >
            <div className="relative  w-full h-1/2">
                <img
                    src={heroImg}
                    alt="Hero Background"
                    className=" object-cover w-full h-[70vh]"
                />
            </div>
        </div>
    );
}
export default Hero;