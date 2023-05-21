// import { Category } from '../components/Category'
import { Button } from '../components/Button'
import { NavBar } from '../components/NavBar'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { SlPaperPlane } from 'react-icons/sl'
export const Category = () => {
  return (
    <>
      {/* Main container */}
      <div className="bg-[#042631] h-full w-full">
        <div className="">
          <NavBar />
          <h1 className="font-extrabold text-zinc-200 text-[32px] mx-[140px] my-[20px]">
            WEB DEVELOPMENT
          </h1>
          <div className="flex gap-4 flex-col">
            <div className="bg-cyan-900 p-6 rounded-sm mx-[140px] flex flex-col gap-8 hover:bg-zinc-800 transition-all ease-in-out duration-300 cursor-pointer">
              <div className="flex gap-8">
                <div className="">
                  <h2 className="text-[22px] text-zinc-200">This is Problem Title</h2>
                  <p className="text-zinc-300 text-ellipsis line-clamp-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor expedita
                    quibusdam nobis animi ipsam eum possimus suscipit quisquam exercitationem
                    tempore, assumenda ut lol impedit deleniti dolorem sunt architecto, est nostrum
                    aperiam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                    expedita quibusdam nobis animi ipsam eum possimus suscipit quisquam
                    exercitationem tempore, assumenda ut lol impedit deleniti dolorem sunt
                    architecto, est nostrum aperiam. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Dolor expedita quibusdam nobis animi ipsam eum possimus
                    suscipit quisquam exercitationem tempore, assumenda ut lol impedit deleniti
                    dolorem sunt architecto, est nostrum aperiam.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button label="Show Discussion" size="lg" />
                <div className="h-[25px] w-[260px] bg-cyan-700 rounded-md flex gap-6 justify-center text-cyan-50 text-[12px] px-2">
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineHeart />
                    <span>Reacts</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <SlPaperPlane />
                    <span>Solutions</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineShareAlt />
                    <span>Shares</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyan-800 p-4 rounded-md mx-[140px] flex flex-col gap-4">
              <div className="flex gap-8">
                <div className="">
                  <h2 className="text-[22px] text-zinc-200">This is Problem Title</h2>
                  <p className="text-zinc-300 text-ellipsis line-clamp-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor expedita
                    quibusdam nobis animi ipsam eum possimus suscipit quisquam exercitationem
                    tempore, assumenda ut lol impedit deleniti dolorem sunt architecto, est nostrum
                    aperiam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                    expedita quibusdam nobis animi ipsam eum possimus suscipit quisquam
                    exercitationem tempore, assumenda ut lol impedit deleniti dolorem sunt
                    architecto, est nostrum aperiam. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Dolor expedita quibusdam nobis animi ipsam eum possimus
                    suscipit quisquam exercitationem tempore, assumenda ut lol impedit deleniti
                    dolorem sunt architecto, est nostrum aperiam.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button label="Show Discussion" size="xl" />
                <div className="stats h-[25px] w-[400px] bg-cyan-700 rounded-md flex gap-6 justify-center text-cyan-50 text-[12px] px-2">
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineHeart />
                    <span>Reacts</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <SlPaperPlane />
                    <span>Solutions</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineShareAlt />
                    <span>Shares</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyan-800 p-4 rounded-md mx-[140px] flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="">
                  <h2 className="text-[22px] text-zinc-200">This is Problem Title</h2>
                  <p className="text-zinc-300 text-ellipsis line-clamp-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor expedita
                    quibusdam nobis animi ipsam eum possimus suscipit quisquam exercitationem
                    tempore, assumenda ut lol impedit deleniti dolorem sunt architecto, est nostrum
                    aperiam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                    expedita quibusdam nobis animi ipsam eum possimus suscipit quisquam
                    exercitationem tempore, assumenda ut lol impedit deleniti dolorem sunt
                    architecto, est nostrum aperiam. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Dolor expedita quibusdam nobis animi ipsam eum possimus
                    suscipit quisquam exercitationem tempore, assumenda ut lol impedit deleniti
                    dolorem sunt architecto, est nostrum aperiam.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button label="Show Discussion" size="xl" />
                <div className="stats h-[25px] w-[400px] bg-cyan-700 rounded-md flex gap-6 justify-center text-cyan-50 text-[12px] px-2">
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineHeart />
                    <span>Reacts</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <SlPaperPlane />
                    <span>Solutions</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineShareAlt />
                    <span>Shares</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyan-800 p-4 rounded-md mx-[140px] flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="">
                  <h2 className="text-[22px] text-zinc-200">This is Problem Title</h2>
                  <p className="text-zinc-300 text-ellipsis line-clamp-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor expedita
                    quibusdam nobis animi ipsam eum possimus suscipit quisquam exercitationem
                    tempore, assumenda ut lol impedit deleniti dolorem sunt architecto, est nostrum
                    aperiam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                    expedita quibusdam nobis animi ipsam eum possimus suscipit quisquam
                    exercitationem tempore, assumenda ut lol impedit deleniti dolorem sunt
                    architecto, est nostrum aperiam. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Dolor expedita quibusdam nobis animi ipsam eum possimus
                    suscipit quisquam exercitationem tempore, assumenda ut lol impedit deleniti
                    dolorem sunt architecto, est nostrum aperiam.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button label="Show Discussion" size="xl" />
                <div className="stats h-[25px] w-[400px] bg-cyan-700 rounded-md flex gap-6 justify-center text-cyan-50 text-[12px] px-2">
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineHeart />
                    <span>Reacts</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <SlPaperPlane />
                    <span>Solutions</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineShareAlt />
                    <span>Shares</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyan-800 p-4 rounded-md mx-[140px] flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="">
                  <h2 className="text-[22px] text-zinc-200">This is Problem Title</h2>
                  <p className="text-zinc-300 text-ellipsis line-clamp-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor expedita
                    quibusdam nobis animi ipsam eum possimus suscipit quisquam exercitationem
                    tempore, assumenda ut lol impedit deleniti dolorem sunt architecto, est nostrum
                    aperiam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                    expedita quibusdam nobis animi ipsam eum possimus suscipit quisquam
                    exercitationem tempore, assumenda ut lol impedit deleniti dolorem sunt
                    architecto, est nostrum aperiam. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Dolor expedita quibusdam nobis animi ipsam eum possimus
                    suscipit quisquam exercitationem tempore, assumenda ut lol impedit deleniti
                    dolorem sunt architecto, est nostrum aperiam.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button label="Show Discussion" size="xl" />
                <div className="stats h-[25px] w-[400px] bg-cyan-700 rounded-md flex gap-6 justify-center text-cyan-50 text-[12px] px-2">
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineHeart />
                    <span>Reacts</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <SlPaperPlane />
                    <span>Solutions</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineShareAlt />
                    <span>Shares</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyan-800 p-4 rounded-md mx-[140px] flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="">
                  <h2 className="text-[22px] text-zinc-200">This is Problem Title</h2>
                  <p className="text-zinc-300 text-ellipsis line-clamp-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor expedita
                    quibusdam nobis animi ipsam eum possimus suscipit quisquam exercitationem
                    tempore, assumenda ut lol impedit deleniti dolorem sunt architecto, est nostrum
                    aperiam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
                    expedita quibusdam nobis animi ipsam eum possimus suscipit quisquam
                    exercitationem tempore, assumenda ut lol impedit deleniti dolorem sunt
                    architecto, est nostrum aperiam. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Dolor expedita quibusdam nobis animi ipsam eum possimus
                    suscipit quisquam exercitationem tempore, assumenda ut lol impedit deleniti
                    dolorem sunt architecto, est nostrum aperiam.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button label="Show Discussion" size="xl" />
                <div className="stats h-[25px] w-[400px] bg-cyan-700 rounded-md flex gap-6 justify-center text-cyan-50 text-[12px] px-2">
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineHeart />
                    <span>Reacts</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <SlPaperPlane />
                    <span>Solutions</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <AiOutlineShareAlt />
                    <span>Shares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
