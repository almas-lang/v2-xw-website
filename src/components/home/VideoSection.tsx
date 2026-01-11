'use client';

export default function VideoSection() {
  const handlePlay = () => {
    // TODO: Implement video modal or embed
    console.log('Play video clicked');
  };

  return (
    <div className="relative mx-0 md:mx-10 lg:mx-auto lg:max-w-[1000px] bg-alice rounded-lg overflow-hidden min-h-[280px] md:min-h-[360px] lg:min-h-[400px]">
      {/* Red corner frames */}
      <div className="absolute top-4 left-4 w-10 h-10 border-l-[3px] border-t-[3px] border-accent z-10 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-r-[3px] border-b-[3px] border-accent z-10 pointer-events-none" />

      {/* X watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          className="font-heading text-[300px] md:text-[450px] lg:text-[500px] font-extrabold text-black/[0.04] pointer-events-none select-none"
          aria-hidden="true"
        >
          X
        </span>
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center min-h-[280px] md:min-h-[360px] lg:min-h-[400px] p-6 md:p-10 text-center">
        <p className="font-heading text-xl md:text-2xl lg:text-[32px] font-semibold text-g400 mb-2">
          Tried Everything?
        </p>
        <h2 className="font-heading text-lg md:text-xl font-bold text-carbon mb-6">
          Watch This First
        </h2>
        <button
          onClick={handlePlay}
          className="w-14 h-14 md:w-16 md:h-16 border-2 border-g300 rounded-full flex items-center justify-center bg-white hover:border-accent hover:scale-105 transition-all mb-5 cursor-pointer"
          aria-label="Play video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 256 256"
            fill="none"
            className="text-carbon ml-0.5 hover:text-accent"
          >
            <path
              fill="currentColor"
              d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"
            />
          </svg>
        </button>
        <p className="text-sm text-g400">12 min watch</p>
      </div>
    </div>
  );
}
