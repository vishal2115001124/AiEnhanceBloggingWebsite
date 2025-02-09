import BackgroundStyleFixed from '@/app/_Components/backgroundStyle';
import React from 'react';
import {Cards,FeatureList} from './cards';
import { auth } from '@/app/_lib/auth';
import { Session } from 'next-auth';
import { findUserById } from '@/app/_lib/action';

const ProfileCard =async () => {
  const Session=await auth();
  const User=await findUserById(Session?.user._id!);
  return (
    <>
    <BackgroundStyleFixed/>
    <div className="bg-gray-200 w-10/12 mx-auto mt-4 rounded shadow-xl overflow-hidden">
      <div className="h-[140px] bg-black "></div>
      <div className="px-5 py-2 flex flex-col gap-3 pb-6">
        <div className="min-h-[150px] min-w-[150px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-20 border-white">
          <img
            src={User?.profile_img}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl text-slate-900 relative font-bold leading-6">{Session?.user.name}</h3>
          <p className="text-sm text-gray-600">@{Session?.user.username}</p>
        </div>
        <div className='font-bold uppercase text-[12px] flex border border-gray-10'>
            <span className='border-r bg-white p-2 shadow-b'>12k+ Fellows</span>
            <span className='bg-black text-white p-2 shadow-b'>14k+ Follows</span> 
        </div>
        <div className="flex gap-3 flex-wrap">
          <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">Developer</span>
          <span className="rounded-sm bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Design</span>
          <span className="rounded-sm bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Managements</span>
          <span className="rounded-sm bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">Projects</span>
          <button className='rounded-sm bg-black text-white px-1 text-xs hover:scale-110 duration-200'>Edit</button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Send Message
          </button>
          <button
            type="button"
            className="bg-green-100 inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-green-200 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Follow
          </button>
          <button
            type="button"
            className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add to projects
          </button>
        </div>
        <h4 className="text-lg font-medium pt-4 uppercase leading-3">About</h4>
        <p className="text-sm text-stone-500">
            {User.bio}
        </p>
        <h4 className="text-lg font-medium pt-4 uppercase leading-3">Experiences</h4>
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="h-8 w-8 text-slate-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
              </svg>
              <div className="leading-3">
                <p className="text-sm font-bold text-slate-700">Ui Designer</p>
                <span className="text-xs text-slate-600">5 years</span>
              </div>
              <p className="text-sm text-slate-500 self-start ml-auto">As Ui Designer on Front Page</p>
            </div>
          ))}
          <h4 className="text-lg font-medium pt-4 uppercase leading-3">Trending Blogs</h4>
          <Cards/>
          <h4 className="text-xl font-medium pt-4 uppercase leading-3">Other Blogs</h4>
          <FeatureList/>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileCard;
