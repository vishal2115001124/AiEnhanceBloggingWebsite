import BackgroundStyleFixed from "../_Components/backgroundStyle";
import Footer from "../_Components/footer";
import HomeNavbar from "../_Components/navbar";
import user from "./../../public/img/users/developer.png";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

export default function Page(){
    return(
        <main className="flex flex-col items-center">
            <BackgroundStyleFixed/>
            <HomeNavbar/>
            <section className="pt-10 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
                <div className="px-4 pb-8 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div>
                            <h2 className="text-3xl font-bold text-center pt-4 text-black dark:text-white sm:text-4xl lg:text-5xl">Hey 👋 we are
                                 Team Project IGI
                            </h2>
                            <OurTeam/>
                        </div>
                        <WhatWeDo/>
                </div>
            </section>
            <Footer/>
        </main>
    )
}


import React from 'react';

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Vanshaj Tiwari",
      role: "Founder CEO",
      image: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar1.png",
      socialLinks: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Vishal Singhal",
      role: "Managing Director",
      image: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar2.png",
      socialLinks: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      }
    },
      {
        name: "Shivam Goyal",
        role: "Sweeper",
        image: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar3.png",
        socialLinks: {
          twitter: "#",
          facebook: "#",
          instagram: "#",
          linkedin: "#",
        },
    },      
    {
        name: "Srajan Bansal",
        role: "Bagger",
        image: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar4.png",
        socialLinks: {
          twitter: "#",
          facebook: "#",
          instagram: "#",
          linkedin: "#",
        },
    },
  ];

  return (
    <div id="team" className="section relative bg-white dark:bg-gray-800">
      <div className="container xl:max-w-6xl mx-auto">
        <header className="pt-4 text-center mx-auto">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
            <span className="font-light">Our</span> Team
          </h2>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 60"
            style={{ margin: '0 auto', height: '35px' }}
            xmlSpace="preserve"
          >
            <circle cx="50.1" cy="30.4" r="5" className="stroke-primary" style={{ fill: 'transparent', strokeWidth: 2, strokeMiterlimit: 10 }}></circle>
            <line x1="55.1" y1="30.4" x2="100" y2="30.4" className="stroke-primary" style={{ strokeWidth: 2, strokeMiterlimit: 10 }}></line>
            <line x1="45.1" y1="30.4" x2="0" y2="30.4" className="stroke-primary" style={{ strokeWidth: 2, strokeMiterlimit: 10 }}></line>
          </svg>
        </header>

        <div className="flex flex-wrap flex-row justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6"
            >
              <div className="relative overflow-hidden bg-white dark:bg-gray-800 mb-12 hover:grayscale-0 wow fadeInUp">
                <div className="relative overflow-hidden px-6">
                  <img
                    src={member.image}
                    className="max-w-full h-auto mx-auto rounded-full bg-gray-50 grayscale"
                    alt={member.name}
                  />
                </div>
                <div className="pt-6 text-center text-white">
                  <p className="text-lg leading-normal font-bold mb-1">{member.name}</p>
                  <p className="text-gray-500 leading-relaxed font-light">{member.role}</p>
                  <div className="mt-2 mb-5 flex items-center justify-center space-x-2">
                    {Object.entries(member.socialLinks).map(([platform, link]) => (
                      <a
                        key={platform}
                        className="hover:text-blue-700"
                        aria-label={`${platform} link`}
                        href={link}
                      >
                       {platform=="twitter" && <FaXTwitter className=""/>}
                       {platform=="instagram" && <IoLogoInstagram className="hover:text-pink-400"/> }
                       {platform=="facebook" && <IoLogoFacebook className="hover:bg-white"/> }
                       {platform=="linkedin" && <FaLinkedin className="hover:bg-white"/>}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WhatWeDo = () => {
  const services = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      ),
      title: "SEO Services",
      description: "This is a wider card with supporting text below as a natural content."
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          fill="currentColor"
          className="bi bi-chat-square-dots"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      ),
      title: "Social Content",
      description: "This is a wider card with supporting text below as a natural content."
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          fill="currentColor"
          className="bi bi-badge-ad"
          viewBox="0 0 16 16"
        >
          <path d="M3.7 11l.47-1.542h2.004L6.644 11h1.261L5.901 5.001H4.513L2.5 11h1.2zm1.503-4.852l.734 2.426H4.416l.734-2.426h.053zm4.759.128c-1.059 0-1.753.765-1.753 2.043v.695c0 1.279.685 2.043 1.74 2.043.677 0 1.222-.33 1.367-.804h.057V11h1.138V4.685h-1.16v2.36h-.053c-.18-.475-.68-.77-1.336-.77zm.387.923c.58 0 1.002.44 1.002 1.138v.602c0 .76-.396 1.2-.984 1.2-.598 0-.972-.449-.972-1.248v-.453c0-.795.37-1.24.954-1.24z" />
          <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
        </svg>
      ),
      title: "Creative Ads",
      description: "This is a wider card with supporting text below as a natural content."
    }
  ];

  return (
    <div id="services" className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <header className="text-center mx-auto mb-12 lg:px-20">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-black">What We Do</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 60"
            className="mx-auto h-9"
          >
            <circle
              cx="50.1"
              cy="30.4"
              r="5"
              className="stroke-primary"
              style={{ fill: "transparent", strokeWidth: 2 }}
            ></circle>
            <line
              x1="55.1"
              y1="30.4"
              x2="100"
              y2="30.4"
              className="stroke-primary"
              style={{ strokeWidth: 2 }}
            ></line>
            <line
              x1="45.1"
              y1="30.4"
              x2="0"
              y2="30.4"
              className="stroke-primary"
              style={{ strokeWidth: 2 }}
            ></line>
          </svg>
          <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">
            Save time managing advertising & Content for your business.
          </p>
        </header>

        <div className="flex flex-wrap -mx-4 text-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 mb-8"
            >
              <div className="py-8 px-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 hover:-translate-y-2">
                <div className="inline-block text-gray-900 mb-4">{service.icon}</div>
                <h3 className="text-lg leading-normal mb-2 font-semibold text-black">
                  {service.title}
                </h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
