import { nextSlide, prevSlide, dotSlide } from '../../features/slices/sliderSlice';
import { useSelector, useDispatch } from 'react-redux';
import { sliderData } from '../../assets/data/dummyData';

const Slider = () => {
  const sliderIndex = useSelector((state) => state.slider.value);
  const dispatch = useDispatch();
  return (
    <div className='relative pb-2'>
        <div className='flex p-4 bg-black justify-around w-full'>
            <div className='text-base font-medium tracking-normal leading-none text-center text-white'>
                Sale upto 50% off!!
            </div>
            <div className='text-base font-medium tracking-normal leading-none text-center text-white'>
                COD Available!!
            </div>
            <div className='text-base font-medium tracking-normal leading-none text-center text-white'>
                Free Shipping!!
            </div>
        </div>
        <div>
            {sliderData.map((item) => {
                return (
                    <div key={item.id} 
                    className={parseInt(item.id)===sliderIndex ? 
                        "opacity-100 duration-800 ease-in-out scale-100" : "opacity-0 duration-800 ease-in-out scale-95"
                    }
                    >
                        <div>
                            {parseInt(item.id)===sliderIndex && (
                                <img className='h-[600px] w-full' src={item.img} alt="shoes" />
                            )}   
                        </div>
                    </div>
                )
            })}
        </div>
        <div className='flex absolute bottom-6 left-[45%]'>
            {sliderData.map((dot, index) => {
                return (
                    <div className='mr-4' key={index}>
                        <div className={
                            index === sliderIndex ? "bg-green-300 rounded-full p-2 cursor-pointer" : 
                            "bg-white rounded-full p-2 cursor-pointer"
                        } onClick={() => dispatch(dotSlide(index))}>
                        </div>
                    </div>
                )
            })}
        </div>
        <div>
            <button className='absolute top-[43%] right-4 bg-white rounded-full p-2 hover:bg-yellow-300 cursor-pointer'
             onClick={() => dispatch(nextSlide(sliderIndex + 1))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </button>
            <button className='absolute top-[43%] left-4 bg-white rounded-full p-2 hover:bg-yellow-300 cursor-pointer'
             onClick={() => dispatch(prevSlide(sliderIndex - 1))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
             </button>
        </div>
    </div>
  )
}

export default Slider;