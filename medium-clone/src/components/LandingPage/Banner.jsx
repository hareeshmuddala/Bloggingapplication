function Banner() {
  return (
    <>
      <div className="bg-yellow-500 h-auto relative">
        <div className="">
          <div className="flex flex-col w-7/12 p-[5rem] w-full sm:w-full">
            <h1 className="text-6xl md:text-8xl ">Stay Courious</h1>
            <p className="text-xl my-8">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>

            <button className="text-sm text-white  rounded-3xl bg-black w-56 py-2">
              Start reading
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Banner;
