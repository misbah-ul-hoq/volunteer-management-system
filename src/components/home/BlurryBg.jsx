const BlurryBg = () => {
  return (
    <div className="">
      <div className="relative w-full max-w-96 ">
        <div className="lg:-mb-20">
          <div className="absolute bg-purple-300 -top-12 right-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob dark:mix-blend-normal"></div>
          <div className="absolute bg-pink-300 -top-12 right-2 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000 dark:mix-blend-normal"></div>
          <div className="absolute bg-orange-200 -top-8 -right-16 -bottom-14 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        </div>
        <div className="content">
          <h2 className="text-4xl font-bold">
            There is a Great Value For Doing Good to Others
          </h2>
          <button className="btn btn-secondary mt-6">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default BlurryBg;
